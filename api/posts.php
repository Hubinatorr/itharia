<?php
header('Content-Type: application/json');

$host = 'md409.wedos.net';
$user = 'a344678_itharia';
$password = 'RootDb123.';
$dbname = 'd344678_itharia';

$mysqli = new mysqli($host, $user, $password, $dbname);

if ($mysqli->connect_errno) {
    http_response_code(500);
    echo json_encode(['error' => 'Nepodarilo sa pripojiť k databáze']);
    exit;
}

$sql = "
    SELECT 
        c.id AS category_id,
        c.name AS category_name,
        c.position AS category_position,
        p.id AS post_id,
        p.title AS post_title,
        p.slug AS post_slug,
        p.content AS post_content,
        p.position AS post_position
    FROM categories c
    LEFT JOIN posts p ON p.category_id = c.id
    ORDER BY c.position ASC, p.position ASC
";

$result = $mysqli->query($sql);

$categories = [];
$lastCategoryId = null;

while ($row = $result->fetch_assoc()) {
    $categoryId = $row['category_id'];

    if ($lastCategoryId !== $categoryId) {
        $categories[$categoryId] = [
            'id' => $categoryId,
            'name' => $row['category_name'],
            'position' => (int)$row['category_position'],
            'posts' => []
        ];
        $lastCategoryId = $categoryId;
    }
}

$categories = array_values($categories);

// hlavné opravenie: UNESCAPED_SLASHES aj UNESCAPED_UNICODE
echo json_encode($categories, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT);

$mysqli->close();
