<!DOCTYPE HTML>

<html>
	
	<head>
		<title>
			Create Account
		</title>
		<link rel = "stylesheet" type = "text/css" href = "style.css">
		<script src = "logIn.js"></script>
		<script src = "jquery-1.10.2.min.js"></script>
	</head>
	<body>

		<?php

			// Try to connect to the database
			@ $db = new mysqli('localhost', 'team10', 'pear', 'team10');
			if (mysqli_connect_errno()) {
				echo
					"<div class = \"serverMessage\">" .
						"Error: Could not connect to the database. Please try again later.<br>" .
						"You may now close this tab or <a class = \"serverMessage\" href = \"index.html\">Return to Home</a>" .
					"</div>";
				exit;
			}

			// Get field information from Create Account page
			$username = $_POST['username'];
			$password = md5($_POST['password']);
			$email = $_POST['email'];

			// Prepare query statement and execute it
			$create_user_query = "insert into user (id, username, password, email, score, currency, quality_count, new_count) values (?, ?, ?, ?, ?, ?, ?, ?)";
			$stmt = $db->prepare($create_user_query);

			// Assign the remaining variables for the insert statment
			$id = NULL;
			$score = 0;
			$currency = 20;
			$quality_count = 0;
			$new_count = 0;

			// Bind the parameters to the query
			$stmt->bind_param("isssiiii", $id, $username, $password, $email, $score, $currency, $quality_count, $new_count);

			NULLif ( !($stmt->execute()) ) {
				// Result was false (error inserting into database)
				echo
					"<div class = \"serverMessage\">" .
						"Error: Your account was not successfully created. Please try again later.<br>" .
						"You may now close this tab or <a class = \"serverMessage\" href = \"index.html\">Return to Home</a>" .
					"</div>";
				exit;
			} else {
				echo
					"<div class = \"serverMessage\">" .
						"Congratulations, your account was successfully created.<br>" .
						"You may now close this tab or <a class = \"serverMessage\" href = \"index.html\">Return to Home</a>" .
					"</div>";
			}

			// Close the database
			$db->close();

		?>
	</body>
</html>