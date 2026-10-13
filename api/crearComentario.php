<?php
declare(strict_types=1);

require_once __DIR__ . '/conexion.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    responder([], 204);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    responder(['error' => 'Método no permitido.'], 405);
}

$entrada = json_decode(file_get_contents('php://input'), true);

if (!is_array($entrada)) {
    responder(['error' => 'La solicitud no es válida.'], 400);
}

// Recibir y limpiar los datos
$nombre = limpiar((string)($entrada['nombre'] ?? ''));
$correo = trim((string)($entrada['correo'] ?? ''));
$comentario = limpiar((string)($entrada['comentario'] ?? ''));
$valoracion = filter_var(
    $entrada['valoracion'] ?? null,
    FILTER_VALIDATE_INT
);

// Validar nombre
if (mb_strlen($nombre) < 2 || mb_strlen($nombre) > 100) {
    responder(['error' => 'Ingresa un nombre válido.'], 422);
}

// Validar correo
if (
    mb_strlen($correo) > 254 ||
    !filter_var($correo, FILTER_VALIDATE_EMAIL)
) {
    responder(['error' => 'Ingresa un correo electrónico válido.'], 422);
}

// Validar comentario
if (mb_strlen($comentario) < 10 || mb_strlen($comentario) > 1000) {
    responder([
        'error' => 'El comentario debe tener entre 10 y 1000 caracteres.'
    ], 422);
}

// Validar valoración
if ($valoracion === false || $valoracion === null || $valoracion < 1 || $valoracion > 5) {
    responder([
        'error' => 'Selecciona una valoración entre 1 y 5 estrellas.'
    ], 422);
}

try {
    $pdo = conectar();

    $consulta = $pdo->prepare(
        'INSERT INTO comentarios
            (nombre, correo, comentario, valoracion, aprobado)
         VALUES
            (:nombre, :correo, :comentario, :valoracion, 0)'
    );

    $consulta->execute([
        'nombre' => $nombre,
        'correo' => $correo,
        'comentario' => $comentario,
        'valoracion' => $valoracion
    ]);

    responder([
        'mensaje' => 'Gracias. Tu comentario será revisado antes de publicarse.'
    ], 201);

} catch (Throwable $error) {
    error_log($error->getMessage());

    responder([
        'error' => 'No fue posible guardar tu comentario.'
    ], 503);
}
