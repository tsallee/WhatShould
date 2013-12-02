<?php
// Returns a suggestion array with the content and id of the suggestion. Returns false otherwise.

$type = $_POST["type"];

// Try to connect to the database
@ $db = new mysqli('localhost', 'team10', 'pear', 'team10');
if (mysqli_connect_errno()) {
	echo "Error: database connection failed.";
	exit;
}

// Get one random suggestion to display
$get_suggestion_query = "select * from post where category = '".$type."' order by rand() limit 1;";
$suggestion = $db->query($get_suggestion_query)->fetch_assoc();


if ($suggestion) {
	echo "[\"" . $suggestion['id'] . "\",\"" . $suggestion['content'] . "\",\"" . $suggestion['score'] . "\"]";
} else {
	echo "Query Failed";
}

?>