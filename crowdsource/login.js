// Called on page load
function load() {
	$("#login_password").keyup(function(event) {
	    if(event.keyCode == 13){
	        login();
	    }
	});
}

// Makes the login table visible
function displayLogin() {
	var loginTable = document.getElementById("login_table");
	$(loginTable).fadeToggle(700);
}

// Processes the login of a user
function login() {
	var loginTable = document.getElementById("login_table");
	var usernameField = document.getElementById("login_username");
	var passwordField = document.getElementById("login_password");
	var username = usernameField.value;
	var password = passwordField.value;

	var request = new XMLHttpRequest();
	var url = "http://luna.mines.edu/csci_445/2013_fall/team10/crowdsource/login.php";
	request.open("POST", url, true);
	request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	request.send("username=" + username + "&password=" + password);
	request.onreadystatechange = function() {
		if ( request.readyState == 4 && request.status == 200) {
			var response = request.responseText;
			alert(response);
			if ( response == "valid" ) {
				var headerLinks = document.getElementById("header_links");
				headerLinks.innerHTML =
				"<a class = \"header\" href = \"#\" onclick = \"topUsers()\">Top Users</a> | " +
				"<a class = \"header\" href = \"createSuggestion.html\" target = \"_blank\">Create Suggestion</a> | " +
				"<a class = \"header\" href = \"myAccount.html\" target = \"_blank\">" + username + "</a> | " +
				"<a class = \"header\" href = \"#\" onclick = \"logout()\">Log Out</a>"
				;
				// Clear fields
				usernameField.value = "";
				passwordField.value = "";
				$(loginTable).fadeOut(700);
			} else if ( response == "invalid" ) {
				loginTable.innerHTML += "<tr><td colspan = 3>Username or password is incorrect</td></tr>";
			} else {
				loginTable.innerHTML += "<tr><td colspan = 3>Error: couldn't query database.</td></tr>";
			}
		}
	}
}

// Logs the user out, returning to guest view mode
function logout() {
	var headerLinks = document.getElementById("header_links");
	headerLinks.innerHTML =
	"<a class = \"header\" href = \"#\" onclick = \"topUsers()\">Top Users</a> | " +
	"<a class = \"header\" href = \"createAccount.html\" target = \"_blank\">Create Account</a> | " +
	"<a class = \"header\" href = \"#\" onclick = \"displayLogin()\">Log In</a>"
	;
}
