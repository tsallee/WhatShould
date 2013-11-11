<!DOCTYPE HTML>

<html>
	
	<head>
		<title>
			What Should?
		</title>
		<link rel = "stylesheet" type = "text/css" href = "style.css">
		<link rel = "stylesheet" type = "text/css" href = "suggestion.css">
		<script src = "logIn.js"></script>
		<script src = "jquery-1.10.2.min.js"></script>
	</head>

	<body>

		<table id = "header">
			<tr>
				<td>
					<div id = "header_bar">
						<a class = "header" href = # onclick = "topUsers()">Top Users</a> | 
						<a class = "header" href = # onclick = "createAccount()">Create Account</a> | 
						<a class = "header" href = # onclick = "displayLogIn()">Log in</a>
					</div>
				</td>
			</tr>
			<tr>
				<td>
					<div id = "login_div">
						<label>Username:</label>
						<input id = "username">
						<label>Password:</label>
						<input id = "password">
					</div>
				</td>
			</tr>
		</table>

		<div id = "suggestion_box">
			<p class = "suggestion">What Should I do...</p>
			<a class = "suggestion" href = # onclick = "displaySuggestion('short')">Today?</a>
			<br>
			<a class = "suggestion" href = # onclick = "displaySuggestion('medium')">This year?</a>
			<br>
			<a class = "suggestion" href = # onclick = "displaySuggestion('long')">Before I die?</a>
		</div>
	</body>

</html>