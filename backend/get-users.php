<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");

// Database connection
$host = "localhost"; // Often 'localhost' on shared hosting
$user = "a344678_itharia";
$pass = "RootDb123.";
$db   = "d344678_itharia";

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    echo json_encode(["error" => "Database connection failed"]);
    exit();
}

// Query users
$sql = "SELECT email, role FROM user";
$result = $conn->query($sql);

$users = [];
if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $users[] = $row;
    }
}

$conn->close();

echo json_encode($users);
