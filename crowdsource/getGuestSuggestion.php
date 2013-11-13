<?php
// Returns a suggestion array with the content and id of the suggestion. Returns false otherwise.

// Try to connect to the database
@ $db = new mysqli('localhost', 'team10', 'pear', 'team10');
if (mysqli_connect_errno()) {
	echo 'Error: Could not connect to database. Please try again later.';
	exit;
}

// Get one random suggestion to display
$get_suggestion_query = "select * from post where id >= (select floor( max(id) * rand()) from post) order by id limit 1;";
$suggestion = $db->query($get_suggestion_pool_query)->fetch_assoc(); /* This may be a problem */

if ($suggestion) {
	return array($suggestion['content'], $suggestion['id']);
} else {
	return false;
}

?>