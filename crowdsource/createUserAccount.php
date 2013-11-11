<?php
@ $db = new mysqli('localhost', 'team10', 'pear', 'team10');

if (mysqli_connect_errno()) {
	echo 'Error: Could not connect to database. Please try again later.';
	exit;
}



?>