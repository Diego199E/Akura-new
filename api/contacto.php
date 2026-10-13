<?php
declare(strict_types=1);
require_once __DIR__ . '/conexion.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') responder([], 204);
if ($_SERVER['REQUEST_METHOD'] !== 'POST') responder(['error' => 'Método no permitido.'], 405);

$entrada = json_decode(file_get_contents('php://input'), true);
if (!is_array($entrada)) responder(['error' => 'La solicitud no es válida.'], 400);

$nombre = limpiar((string)($entrada['nombre'] ?? ''));
$telefono = limpiar((string)($entrada['telefono'] ?? ''));
$correo = filter_var(trim((string)($entrada['correo'] ?? '')), FILTER_VALIDATE_EMAIL);
$experiencia = limpiar((string)($entrada['experiencia'] ?? ''));
$mensaje = limpiar((string)($entrada['mensaje'] ?? ''));

if (mb_strlen($nombre) < 2 || !$correo || mb_strlen($telefono) < 7 || mb_strlen($mensaje) < 10) {
    responder(['error' => 'Revisa los datos del formulario e intenta nuevamente.'], 422);
}

try {
    $pdo = conectar();
    $consulta = $pdo->prepare('INSERT INTO contactos (nombre, telefono, correo, experiencia, mensaje) VALUES (:nombre, :telefono, :correo, :experiencia, :mensaje)');
    $consulta->execute(['nombre' => $nombre, 'telefono' => $telefono, 'correo' => $correo, 'experiencia' => $experiencia, 'mensaje' => $mensaje]);
    responder(['mensaje' => 'Recibimos tu mensaje. Te contactaremos muy pronto.'], 201);
} catch (Throwable $error) {
    error_log($error->getMessage());
    responder(['error' => 'No fue posible enviar tu mensaje.'], 503);
}