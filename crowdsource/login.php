<?php
	// get the query parameter from URL
	$username = $_POST['username'];
	$password = $_POST['password'];

	echo validate_login($username, $password);

	function validate_login($username, $password) {

		// Try to connect to the database
		@ $db = new mysqli('localhost', 'team10', 'pear', 'team10');
		if (mysqli_connect_errno()) {
			echo 'Error: Could not connect to database. Please try again later.';
			exit;
		}

		// Prepare query statement and execute it
		$get_user_password_query = "select password from user where username = ?";
		$stmt = $db->prepare($get_user_password_query);
		$stmt->bind_param("s", $username);
		$stmt->bind_result($user);
		if ( !($stmt->execute()) ) {
			// Close database
			$db->close();
			// Result was false (error with query)
			return "invalid"
		}
		$stmt->fetch_assoc();
		$stmt->free_result();
		// Close database
		$db->close();

		if ($user['password'] == md5($password)) {
			return "valid"
		} else {
			return "invalid"
		}

	}

?>