<?php
	// get the query parameter from URL
	$username = $_POST['username'];

	echo get_user_score($username);

	function get_user_score($username) {

		// Try to connect to the database
		@ $db = new mysqli('localhost', 'team10', 'pear', 'team10');
		if (mysqli_connect_errno()) {
			echo 'Error: database connection failed.';
			exit;
		}

		// get user score
		$get_user_score = "select score from user where username=".$username;
		$user = $db->query($get_user_score)->fetch_assoc();
		$user_score = $user['score'];

		if ($user) {
			return $user_score;
		} else {
			return false;
		}
	}
?>