<?php
header('Content-Type: application/json');

require_once __DIR__ . '/db.php';

// Report mysqli errors as exceptions (easier to debug)
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

try {
    // Ensure UTF-8 all the way
    $mysqli->set_charset('utf8mb4');

    $sql = "
        SELECT 
            c.id   AS category_id,
            c.name AS category_name,
            c.position AS category_position,
            p.id   AS post_id,
            p.title   AS post_title,
            p.slug    AS post_slug,
            p.content AS post_content,
            p.position AS post_position
        FROM categories c
        LEFT JOIN posts p ON p.category_id = c.id
        ORDER BY c.position ASC, p.position ASC
    ";
    $result = $mysqli->query($sql);

    $forceUtf8String = function ($value): string {
        if (is_array($value) || is_object($value)) {
            // Convert nested structures to JSON string, unescaped (still a string here)
            $value = json_encode($value, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        } elseif (is_null($value)) {
            $value = '';
        } else {
            $value = (string)$value;
        }

        // Fix invalid UTF-8 (if any)
        if (!mb_check_encoding($value, 'UTF-8')) {
            // remove invalid bytes
            $fixed = @iconv('UTF-8', 'UTF-8//IGNORE', $value);
            if ($fixed !== false) {
                $value = $fixed;
            }
        }
        return $value;
    };

    $categories = [];

    while ($row = $result->fetch_assoc()) {
        $catId = (int)$row['category_id'];
        if (!isset($categories[$catId])) {
            $categories[$catId] = [
                'id'       => $catId,
                'name'     => $forceUtf8String($row['category_name']),
                'position' => (int)$row['category_position'],
                'posts'    => []
            ];
        }

        if ($row['post_id'] !== null) {
            $categories[$catId]['posts'][] = [
                'id'       => (int)$row['post_id'],
                'title'    => $forceUtf8String($row['post_title']),    // special chars OK, JSON handles them
                'slug'     => $forceUtf8String($row['post_slug']),
                'content'  => $forceUtf8String($row['post_content']),  // raw HTML, kept as string
                'position' => (int)$row['post_position']
            ];
        }
    }

    // Reindex to a plain array
    $categories = array_values($categories);

    // Encode JSON (keep unicode & slashes readable)
    $json = json_encode(
        $categories,
        JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT | JSON_THROW_ON_ERROR
    );

    echo $json;
    $mysqli->close();

} catch (JsonException $e) {
    http_response_code(500);
    echo json_encode([
        'error' => 'JSON encoding failed',
        'message' => $e->getMessage()
    ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT);
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode([
        'error' => 'Server failure',
        'message' => $e->getMessage()
    ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT);
}
