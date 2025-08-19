<?php
$servername = "md409.wedos.net";
$username   = "w344678_itharia";
$password   = "RootDb123.";
$dbname     = "d344678_itharia";

$conn = new mysqli($servername, $username, $password, $dbname);

// nastavenie znakov
$conn->set_charset("utf8");

// kontrola
if ($conn->connect_error) {
    die("❌ Pripojenie zlyhalo: " . $conn->connect_error);
}
echo "✅ Úspešne pripojené k databáze!";
?>
