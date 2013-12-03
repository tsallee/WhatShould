<?php
// Returns a suggestion array with the content and id of the suggestion. Returns false otherwise.

// Try to connect to the database
@ $db = new mysqli('localhost', 'team10', 'pear', 'team10');
if (mysqli_connect_errno()) {
	echo "Database Connection Error";
	exit;
}

// Get passed in values
$username = $_POST['username'];
$type = $_POST['type'];

if ( $username == "guest" ) {
	// Get one random suggestion to display
	$get_suggestion_query = "select * from post where category = '".$type."' order by rand() limit 1;";
	$suggestion = $db->query($get_suggestion_query)->fetch_assoc();


	if ($suggestion) {
		echo "[\"" . $suggestion['id'] . "\",\"" . $suggestion['content'] . "\",\"" . $suggestion['score'] . "\"]";
	} else {
		echo "Query Failed";
	}
	exit;
}

// Get user information from database
$get_user_query = "select id, currency from user where username = ?";
$get_user_stmt = $db->prepare($get_user_query);
$get_user_stmt->bind_param("s", $username);
$get_user_stmt->bind_result($user_id, $currency);
$get_user_stmt->execute();
$get_user_stmt->fetch();
$get_user_stmt->free_result();
 

 // If user has no currency, don't let them see a post
 if ($currency < 1) {
 	echo "<p class = \"suggestion\">Taylor Sucks</p>";
 	exit;
 }

// Get quality count
$get_user_quality_count = "select quality_count from user where id = ".$user_id;
$quality_count = $db->query($get_user_quality_count)->fetch_assoc();

if ($quality_count['quality_count'] > 4) {
	// Give them a quality post

	// Get list ordered by score
	$get_list_query = "select * from post where post.id not in (select post_id from user_voted_posts where user_id =".$user_id.") and category = '".$type."' order by score desc";
	$quality_list = $db->query($get_list_query);
	$num_rows = $quality_list->num_rows;
	$random_number = rand(0,floor(0.2*$num_rows));
	$post = $quality_list->fetch_assoc();

	// Picks a random row
	for ($i = 0; $i < ($random_number-1); $i++) {
		$post = $quality_list->fetch_assoc();
	}

	// Reset the quality count
	$reset_quality_count_query = "update user set quality_count=0 where id = ".$user_id;
	$db->query($reset_quality_count_query);
} else {
	// Increment quality count
	$increment_quality_count_query = "update user set quality_count=".($quality_count['quality_count'] + 1)." where id = ".$user_id;
	$db->query($increment_quality_count_query);

	// See if user needs to see a new post
	$get_user_new_count = "select new_count from user where id = ".$user_id;
	$new_count = $db->query($get_user_new_count)->fetch_assoc();

	if ($new_count['new_count'] > 4) {
		// Reset new count
		$reset_new_count_query = "update user set new_count=0 where id = ".$user_id;
		$db->query($reset_new_count_query);
		
		// Give them a new post

		// Get list ordered by ascending (lowest to highest) number of votes
		$get_list_query = "select * from post where post.id not in (select post_id from user_voted_posts where user_id =".$user_id.") and category = '".$type."' order by total_votes asc";
		$new_list = $db->query($get_list_query);
		$num_rows = $new_list->num_rows;
		$random_number = rand(0,floor(0.2*$num_rows));
		$post = $new_list->fetch_assoc();

		for ($i = 0; $i < ($random_number-1); $i++) {
			$post = $new_list->fetch_assoc();
		}

	} else {
		// Increment new count
		$increment_new_count_query = "update user set new_count=".($new_count['new_count'] + 1)." where id = ".$user_id;
		$db->query($increment_new_count_query);

		// Give them a random post
		$get_suggestion_query = "select * from post where post.id not in (select post_id from user_voted_posts where user_id =".$user_id.") and category = '".$type."' order by rand() limit 1;";
		$post = $db->query($get_suggestion_query)->fetch_assoc(); /* This may be a problem */
	}
}

if ($post) {
	echo "[\"" . $post['id'] . "\",\"" . $post['content'] . "\",\"" . $post['score'] . "\"]";
} else {
	echo "Query Failed";
}

?>