<?php
	// get the query parameter from URL
	$username = $_POST['username'];
	$username = $_POST['post_id'];
	$username = $_POST['completed'];

	echo update_post_completed($username, $post_id, $completed);

	function update_post_completed($username, $post_id, $completed)) {

		// Try to connect to the database
		@ $db = new mysqli('localhost', 'team10', 'pear', 'team10');
		if (mysqli_connect_errno()) {
			echo 'Error: database connection failed.';
			exit;
		}

		$user_id_query = "select id from user where username = ?";
		$stmt = $db->prepare($user_id_query);
		$stmt->bind_param("s", $username);
		$stmt->bind_result($user_id);
		$stmt->execute();
		$stmt->fetch();
		$stmt->free_result();

		// Update the post in the todo list
		if ($completed == true) {
			$update_completed_query = "update todo_list set completed = true where user_id = ? and post_id = ?";
			$stmt = $db->prepare($update_user_score_query);
			$stmt->bind_param("ii", $user_id, $post_id);
			$stmt->execute();
		} else {
			$update_completed_query = "update todo_list set completed = false where user_id = ? and post_id = ?";
			$stmt = $db->prepare($update_user_score_query);
			$stmt->bind_param("ii", $user_id, $post_id);
			$stmt->execute();
		}

		$db->close();

		return $user_score;
	}
?>