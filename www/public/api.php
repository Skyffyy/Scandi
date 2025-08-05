<?php
$dbh = new PDO('mysql:host=192.168.56.0;dbname=test', "root", "root");
$products = $pdo->query("SELECT * FROM products");

echo json_encode($products->fetchAll(PDO::FETCH_ASSOC));
?>