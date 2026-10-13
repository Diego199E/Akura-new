<?php
declare(strict_types=1);

require_once __DIR__ . '/conexion.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    responder(['error' => 'Método no permitido.'], 405);
}

try {
    $pdo = conectar();

    $consulta = $pdo->prepare(
        'SELECT id, nombre, comentario, valoracion
         FROM comentarios
         WHERE aprobado = 1
         ORDER BY creado_en DESC
         LIMIT 30'
    );

    $consulta->execute();

    responder([
        'comentarios' => $consulta->fetchAll()
    ]);

} catch (Throwable $error) {
    error_log($error->getMessage());

    responder([
        'error' => 'No fue posible consultar los testimonios.'
    ], 503);
}
