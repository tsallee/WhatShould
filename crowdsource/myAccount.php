<?php
	// get the query parameter from URL
	$username = $_POST['username'];
	$type = $_POST['type'];	// Type of post (i.e. day, year, life)

	echo update_account_page($username, $type);

	function update_account_page($username, $type) {

		// Try to connect to the database
		@ $db = new mysqli('localhost', 'team10', 'pear', 'team10');
		if (mysqli_connect_errno()) {
			echo 'Error: database connection failed.';
			exit;
		}

		// get user_id
		$get_user_id = "select id from user where username=?";
		$stmt = $db->prepare($get_user_id);
		$stmt->bind_param("s", $username);
		$stmt->bind_result($user_id);
		$stmt->execute();
		$stmt->fetch();
		$stmt->free_result();

		// get todo list posts
		$get_todo_list = "select post.id, post.content, post.score, todo_list.completed from post, todo_list where post.id in (select post_id from todo_list where user_id=?) and category=? and post.id=todo_list.post_id";
		$stmt = $db->prepare($get_todo_list);
		$stmt->bind_param("is", $user_id, $type);
		$stmt->bind_result($post_id, $post_content, $post_score, $completed);
		$stmt->execute();

		// Create string of JSON objects
		$return_string = "[";
		while ($stmt->fetch()) {
			$todo_list_item = $todo_list->fetch_assoc();
			if ($i != $num_rows - 1) {
				$post_string = "{id: \"".$post_id."\", content: \"".$post_content."\", score: \"".$post_score."\", completed: \"".$completed."\"}, ";
			} else {
				$post_string = "{id: \"".$post_id."\", content: \"".$post_content."\", score: \"".$post_score."\", completed: \"".$completed."\"}";
			}
			$return_string += $post_string;
		}
		$return_string += "]";

		$stmt->free_result();
		$stmt->close;

		if ($todo_list) {
			return $return_string;
		} else {
			return false;
		}
	}
?>
