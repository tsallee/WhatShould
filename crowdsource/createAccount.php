<?php

	// Try to connect to the database
	@ $db = new mysqli('localhost', 'team10', 'pear', 'team10');
	if (mysqli_connect_errno()) {
		echo
			"<div class = \"serverMessage\">" .
				"Error: Could not connect to the database. Please try again later.<br>" .
				"<a class = \"serverMessage\" href = \"#\" onclick = \"closeAccountPopup()\">Return to Home</a>" .
			"</div>";
		exit;
	}

	// Get field information from Create Account page
	$username = $_POST['username'];
	$password = md5($_POST['password']);
	$email = $_POST['email'];
	$day_suggestion = $POST['day'];
	$year_suggestion = $POST['year'];
	$life_suggestion = $POST['life'];

	// Check if username exists
	$check_user_name_query = "select id from user where username = '".$username"'";
	$checked_user_name = $db->query($check_user_name_query)->num_rows;

	if (num_rows > 0) {
		echo
			"<div class = \"serverMessage\">" .
				"The username '".$username."' has already been taken.<br>" .
				"<a class = \"serverMessage\" href = \"#\" onclick = \"closeAccountPopup()\">Return to Home</a>" .
			"</div>";
	}

	// Prepare user query
	$create_user_query = "insert into user (id, username, password, email, score, currency, quality_count, new_count) values (?, ?, ?, ?, ?, ?, ?, ?)";
	$stmt = $db->prepare($create_user_query);

	// Assign the remaining variables for the insert statment
	$id = NULL;
	$score = 0;
	$currency = 20;
	$quality_count = 5;
	$new_count = 3;

	// Bind the parameters to the query
	$stmt->bind_param("isssiiii", $id, $username, $password, $email, $score, $currency, $quality_count, $new_count);

	if ( !($stmt->execute()) ) {
		// Result was false (error inserting into database)
		echo
			"<div class = \"serverMessage\">" .
				"Error: Your account was not successfully created. Please try again later.<br>" .
				"<a class = \"serverMessage\" href = \"#\" onclick = \"closeAccountPopup()\">Return to Home</a>" .
			"</div>";
		exit;
	} else {
		echo
			"<div class = \"serverMessage\">" .
				"Congratulations, your account was successfully created.<br>" .
				"<a class = \"serverMessage\" href = \"#\" onclick = \"closeAccountPopup()\">Return to Home</a>" .
			"</div>";
	}

	// Insert suggestions into database
	submit_post($username, $day_suggestion, "day");
	submit_post($username, $year_suggestion, "year");
	submit_post($username, $life_suggestion, "life");

	// Close the database
	$db->close();


	function submit_post($username, $content, $category) {
		$get_user_id_query = "select * from user where username =".$username;
		$user_id = $db->query($get_user_id_query)->fetch_assoc()['username'];

		// Prepare query statement and execute it
		$create_user_query = "INSERT INTO post (id, content, user_id, upvotes, downvotes, score, total_votes, category) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
		$stmt = $db->prepare($create_user_query);

		// Assign the remaining variables for the insert statment
		$id = NULL;
		$upvotes = 0;
		$downvotes = 0;
		$score = 0;
		$total_votes = 0;

		$stmt->bind_param("isiiiiis", $id, $content, $user_id, $upvotes, $downvotes, $score, $total_votes, $category);

		return ($stmt->execute())
	}
?>