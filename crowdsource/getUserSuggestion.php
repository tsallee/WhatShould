<?php
// Returns a suggestion array with the content and id of the suggestion. Returns false otherwise.

// Try to connect to the database
@ $db = new mysqli('localhost', 'team10', 'pear', 'team10');
if (mysqli_connect_errno()) {
	echo 'Error: Could not connect to database. Please try again later.';
	exit;
}

// Get passed in values
$username = $_POST['username'];
$type = $_POST['type']

// Get user information from database
$get_user_query = "select * from user where username = ?";
$get_user_stmt = $db->prepare($get_user_query);
$get_user_stmt->bind_param("s", $username);
$get_user_stmt->bind_result($user);
$get_user_stmt->execute();
$get_user_stmt->fetch_assoc();
$get_user_stmt->free_result();

// Get quality count
$get_user_quality_count = "select quality_count from user where id = ".$user['id'];
$quality_count = $db->query($get_user_quality_count)->fetch_assoc();

if ($quality_count > 4) {
	// Give them a quality post

	// Get list ordered by score
	$get_list_query = "select * from post where post.id not in (select post_id from user_voted_posts where user_id =".$user['id'].") and category = '".$type."' order by score desc";
	$quality_list = $db->query($get_list_query);
	$num_rows = $quality_list->num_rows;
	$random_number = rand(0,floor(0.2*$num_rows));
	$post = $quality_list->fetch_assoc();

	// Picks a random row
	for (i = 0; i < $num_rows; i++) {
		$post = $quality_list->fetch_assoc();
	}

	// Reset the quality count
	$reset_quality_count_query = "update user set quality_count=0 where id = ".$user['id'];
	$db->query($reset_quality_count_query);
} else {
	// Increment quality count
	$increment_quality_count_query = "update user set quality_count=".($quality_count + 1)." where id = ".$user['id'];
	$db->query($increment_new_count_query);

	// See if user needs to see a new post
	$get_user_new_count = "select new_count from user where id = ".$user['id'];
	$new_count = $db->query($get_user_new_count)->fetch_assoc();

	if ($new_count > 4) {
		// Reset new count
		$reset_new_count_query = "update user set new_count=0 where id = ".$user['id'];
		$db->query($reset_new_count_query);
		
		// Give them a new post

		// Get list ordered by ascending (lowest to highest) number of votes
		$get_list_query = "select * from post where post.id not in (select post_id from user_voted_posts where user_id =".$user['id'].") order by total_votes asc";
		$new_list = $db->query($get_list_query);
		$num_rows = $new_list->num_rows;
		$random_number = rand(0,floor(0.2*$num_rows));
		$post = $new_list->fetch_assoc();

		for (i = 0; i < $num_rows; i++) {
			$post = $new_list->fetch_assoc();
		}

	} else {
		// Increment new count
		$increment_new_count_query = "update user set new_count=".($new_count + 1)." where id = ".$user['id'];
		$db->query($increment_new_count_query);

		// Give them a random post
		$get_suggestion_query = "select * from post where id >= (select floor( max(id) * rand()) from post) order by id limit 1;";
		$post = $db->query($get_suggestion_pool_query)->fetch_assoc(); /* This may be a problem */
	}
}

if ($post) {
	return array($post['content'], $post['id']);
} else {
	return false;
}

?>