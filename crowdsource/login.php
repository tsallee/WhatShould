<?php
	// get the query parameter from URL
	$username = $_POST['username'];
	$password = $_POST['password'];
	
	echo validate_login($username, $password);

	function validate_login($username, $password) {

		// Code to call sql queries and validate user
		// If valid,
		return "valid";

		// else
		// return "invalid";

	}

?>