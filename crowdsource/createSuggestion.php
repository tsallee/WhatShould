<?php

	// Try to connect to the database
	@ $db = new mysqli('localhost', 'team10', 'pear', 'team10');
	if (mysqli_connect_errno()) {
		echo
			"<div class = \"serverMessage\">" .
				"Error: Could not connect to the database. Please try again later.<br>" .
				"<a class = \"serverMessage\" href = \"#\" onclick = \"closeCreateSuggestionPopup()\">Return to Home</a>" .
			"</div>";
		exit;
	}

	// Get field information from Create Suggestions page
	$username = $_POST['username'];
	$day_suggestion = $_POST['day'];
	$year_suggestion = $_POST['year'];
	$life_suggestion = $_POST['life'];

	$flag = false;
	// Insert suggestions into database
	if ( $day_suggestion != "" ) {
		if ( submit_post($username, $day_suggestion, "day", $db) ) {
			$flag = true;
		}
	}
	if ( $year_suggestion != "" ) {
		if ( submit_post($username, $year_suggestion, "year", $db) ) {
			$flag = true;
		}
	}
	if ( $life_suggestion != "" ) {
		if ( submit_post($username, $life_suggestion, "life", $db) ) {
			$flag = true;
		}
	}

	// Close the database
	$db->close();

	if ( $flag ) {
		echo
			"<div class = \"serverMessage\">" .
				"Your suggestions were successfully submitted. Thanks for contributing.<br>" .
				"<a class = \"serverMessage\" href = \"#\" onclick = \"closeCreateSuggestionPopup()\">Return to Home</a>" .
			"</div>";
	} else {
		echo
			"<div class = \"serverMessage\">" .
				"We're sorry, your suggestions were not successfully submitted. Please try again later.<br>" .
				"<a class = \"serverMessage\" href = \"#\" onclick = \"closeCreateSuggestionPopup()\">Return to Home</a>" .
			"</div>";
	}

	// Insert the post into the database
	function submit_post($username, $content, $category, $db) {

		$get_user_id_query = "select id from user where username = ?";
		$stmt = $db->prepare($get_user_id_query);
		$stmt->bind_param("s", $username);
		$stmt->bind_result($user_id);
		$stmt->execute();
		$stmt->fetch();
		$stmt->free_result();

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

		return ($stmt->execute());
	}

?>