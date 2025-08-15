<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");

$host = "md409.wedos.net"; // Often 'localhost' if PHP and MySQL are on same hosting
$user = "a344678_itharia";
$pass = "RootDb123.";
$db   = "d344678_itharia";

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    echo json_encode(["error" => "Database connection failed"]);
    exit();
}

$data = json_decode(file_get_contents("php://input"), true);
$email = $data["email"] ?? null;
$role  = $data["role"] ?? null;

if (!$email || !$role) {
    echo json_encode(["error" => "Missing fields"]);
    exit();
}

$stmt = $conn->prepare("INSERT INTO user (email, role) VALUES (?, ?)");
$stmt->bind_param("ss", $email, $role);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "insertedId" => $stmt->insert_id]);
} else {
    echo json_encode(["error" => $stmt->error]);
}

$stmt->close();
$conn->close();
