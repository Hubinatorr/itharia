<?php

$client_id = "YOUR_GOOGLE_CLIENT_ID";
$redirect_uri = "https://yourdomain.com/auth/callback.php";

$params = [
    "client_id" => $client_id,
    "redirect_uri" => $redirect_uri,
    "response_type" => "code",
    "scope" => "openid email profile",
    "access_type" => "offline",
];

header("Location: https://accounts.google.com/o/oauth2/v2/auth?" . http_build_query($params));
exit;
