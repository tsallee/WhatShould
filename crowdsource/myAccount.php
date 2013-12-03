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
		$get_user_id = "select id from user where username=".$username;
		$user = $db->query($get_user_id);
		$user->fetch_assoc();
		$user_id = $user['id'];

		// get todo list posts
		$get_todo_list = "select post.id, post.content, post.score, todo_list.completed from post, todo_list where post.id in (select post_id from todo_list where user_id=".$user_id.") and category=".$type." and post.id=todo_list.post_id";
		$todo_list = $db->query($get_todo_list);
		$num_rows = $todo_list->num_rows;

		// Create string of JSON objects
		$return_string = "[";
		for ($i = 0; $i < $num_rows; $i++) {
			$todo_list_item = $todo_list->fetch_assoc();
			if ($i != $num_rows - 1) {
				$post_string = "{id: \"".$todo_list_item['id']."\", content: \"".$todo_list_item['content']."\", score: \"".$todo_list_item['score']."\", completed: \"".$todo_list_item['completed']."\"}, ";
			} else {
				$post_string = "{id: \"".$todo_list_item['id']."\", content: \"".$todo_list_item['content']."\", score: \"".$todo_list_item['score']."\", completed: \"".$todo_list_item['completed']."\"}";
			}
			$return_string += $post_string;
		}
		$return_string += "]";

		if ($todo_list) {
			return $return_string;
		} else {
			return false;
		}
	}
?>
