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
$create_user_query = "INSERT INTO post (id, content, user_id, upvotes, downvotes, score, total_votes, category, flagged) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
$stmt = $db->prepare($create_user_query);

// Assign the remaining variables for the insert statment
$id = NULL;
$upvotes = 0;
$downvotes = 0;
$score = 0;
$total_votes = 0;
$flagged = false;

$stmt->bind_param($id, $content, $user_id, $upvotes, $downvotes, $score, $total_votes, $category, $flagged);

if ( !($stmt->execute()) ) {
	// Result was false (error inserting into database)
	echo "Error: Could not insert post into the database. Please try again later.";
	exit
} else {
	echo "Woo! Your post was submitted! Thanks for contributing!";
}

// Close database
$db->close();

?>