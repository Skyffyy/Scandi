<?php
    $pdo = new PDO('mysql:host=192.168.56.0;dbname=test', "root", "root");
   
    
    $query = $pdo->prepare("DELETE FROM products WHERE id=:id" );
    $query->bindParam(":id", $_POST["id"]);

    $query->execute();

    header("location:/admin/list-all.php");