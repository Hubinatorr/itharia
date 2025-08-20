<?php
function loadEnv(string $path): void {
    if (!file_exists($path)) {
        return;
    }

    $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        if (str_starts_with(trim($line), '#')) {
            continue; // preskočí komentáre
        }
        [$name, $value] = explode('=', $line, 2);
        $name = trim($name);
        $value = trim($value);

        // nastavíme premenné iba do $_ENV a $_SERVER
        $_ENV[$name] = $value;
        $_SERVER[$name] = $value;
    }
}
