// Allows the user to press enter in the password field instead of
// hitting the "Go" button.
function setEnterCapability() {
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
			if ( response == "valid" ) {
				displayMemberLinks(username);
				// Clear fields
				usernameField.value = "";
				passwordField.value = "";
				$(loginTable).fadeOut(700);
				// Set a cookie on the user's browser so we remember them in the future.
				dropCookie(username);
			} else if ( response == "invalid" ) {
				loginTable.innerHTML += "<tr id = \"login_error\"><td style = \"text-align: center\" colspan = 3>Username or password is incorrect</td></tr>";
				$("#login_error").fadeIn(300);
				setTimeout(function() { $("#login_error").fadeOut(700) }, 1000);
			} else {
				loginTable.innerHTML += "<tr><td colspan = 3>Error: couldn't query database.</td></tr>";
			}
			setEnterCapability();
		}
	}
}

// Changes the links in the upper right corner to those specific to site members (those with logins)
function displayMemberLinks(username) {
	var headerLinks = document.getElementById("header_links");
	headerLinks.innerHTML =
	"<a class = \"header\" href = \"#\" onclick = \"createSuggestion()\">Create Suggestion</a> | " +
	"<a class = \"header\" href = \"#\" onclick= \"myAccount('" + username + "')\">" + username + "</a> | " +
	"<a class = \"header\" href = \"#\" onclick = \"logout()\">Log Out</a>"
	;
}

// Logs the user out, returning to guest view mode
function logout() {
	var headerLinks = document.getElementById("header_links");
	headerLinks.innerHTML =
	"<a class = \"header\" href = \"#\" onclick = \"createAccount()\">Create Account</a> | " +
	"<a class = \"header\" href = \"#\" onclick = \"displayLogin()\">Log In</a>"
	;
	deleteCookie();
}
