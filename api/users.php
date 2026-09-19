<?php
declare(strict_types=1);
header('Content-Type: application/json; charset=utf-8');

require_once __DIR__ . '/db.php';

mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

try {
    $mysqli->set_charset('utf8mb4');

    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        http_response_code(405);
        echo json_encode(['error' => 'Only POST allowed']);
        exit;
    }

    $data = json_decode(file_get_contents('php://input'), true);
    if (!$data) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid JSON']);
        exit;
    }

    $email    = trim($data['email'] ?? '');
    $role     = $data['role'] ?? 'user';
    $password = $data['password'] ?? null;
    $provider = $data['oauth_provider'] ?? null;
    $oauthId  = $data['oauth_id'] ?? null;
    $faction  = $data['faction'] ?? null;

    if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(['error' => 'Valid email is required']);
        exit;
    }

    if (!in_array($role, ['user', 'admin'], true)) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid role']);
        exit;
    }

    $validFactions = ['dwarfs', 'humans', 'avians', 'minotaurs'];
    if ($faction !== null && !in_array($faction, $validFactions, true)) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid faction']);
        exit;
    }

    // Hash password if provided
    $passwordHash = null;
    if ($password !== null && $password !== '') {
        $passwordHash = password_hash($password, PASSWORD_DEFAULT);
    }

    $stmt = $mysqli->prepare(
        "INSERT INTO users (email, password, role, faction, oauth_provider, oauth_id) 
         VALUES (?, ?, ?, ?, ?, ?)"
    );
    $stmt->bind_param("ssssss", $email, $passwordHash, $role, $faction, $provider, $oauthId);
    $stmt->execute();

    $newId = $stmt->insert_id;
    http_response_code(201);
    echo json_encode(['message' => 'User created', 'id' => $newId]);

    $mysqli->close();

} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode([
        'error' => 'Server failure',
        'message' => $e->getMessage()
    ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT);
}
