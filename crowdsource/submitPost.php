<?php

// Try to connect to the database
@ $db = new mysqli('localhost', 'team10', 'pear', 'team10');
if (mysqli_connect_errno()) {
	echo 'Error: Could not connect to database. Please try again later.';
	exit;
}

// Get the information from the post page
$content = $_POST('content');
$username = $_POST('username');
$category = $_POST('category');

$get_user_id_query = "select * from user where username =".$username.";";
$user_id = $db->query($get_user_id_query)->fetch_assoc()['username']; /* This may be a problem */

// Prepare query statement and execute it
$create_user_query = "INSERT INTO post (id, content, upvotes, downvotes, user_id, category, flagged) VALUES (?, ?, ?, ?, ?, ?, ?)"
$stmt = $db->prepare($create_user_query);
$stmt->bind_param(NULL, $content, 0, 0, 0, $user_id, $category, false);
$stmt->bind_result($result);
$stmt->execute();

//Fetches result and puts it in $result
$stmt->fetch();

// Free the result and close database
$stmt->free_result();
$db->close();

if (!$result) {
	// Result was false (error inserting into database)
	echo "Error: Could not insert post into the database. Please try again later.";
	exit
} else {
	echo "Yay! Thanks for joining";
}

?>