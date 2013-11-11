<?php

// Try to connect to the database
@ $db = new mysqli('localhost', 'team10', 'pear', 'team10');
if (mysqli_connect_errno()) {
	echo 'Error: Could not connect to database. Please try again later.';
	exit;
}

// Get field information from Create Account page
$username = $_POST('username');
$password = $_POST('password');
$email = $_POST('email');

// Prepare query statement and execute it
$create_user_query = "INSERT INTO user (id, username, password, email, score, currency, quality_count, new_count) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
$stmt = $db->prepare($create_user_query);
$stmt->bind_param(NULL, $username, $password, $email, 0, 20, 0, 0);
$stmt->bind_result($result);
$stmt->execute();

//Fetches result and puts it in $result
$stmt->fetch();

// Free the result and close database
$stmt->free_result();
$db->close();

if (!$result) {
	// Result was false (error inserting)
	echo "Error: Could not insert user into the database. Please try again later.";
	exit
} else {
	echo "Yay! Thanks for joining";
}

?>