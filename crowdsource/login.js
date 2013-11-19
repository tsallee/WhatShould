function load() {
	$("#password").keyup(function(event) {
	    if(event.keyCode == 13){
	        login();
	    }
	});
}

function displayLogIn() {
	var loginTable = document.getElementById("login_table");
	$(loginTable).fadeToggle(700);
}

function login() {
	var loginTable = document.getElementById("login_table");
	$(loginTable).fadeOut(700);
	var usernameField = document.getElementById("login_username");
	var passwordField = document.getElementById("login_password");
	var username = usernameField.value;
	var password = passwordField.value;
	usernameField.value = "";
	passwordField.value = "";
	var request = new XMLHttpRequest();
	var url = "http://luna.mines.edu/csci_445/2013_fall/team10/crowdsource/login.php";
	request.open("POST", url, true);
	request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	request.send("username=" + username + "&password=" + password);
	request.onreadystatechange = function() {
		if ( request.readyState == 4 && request.status == 200) {
			alert(request.responseText);
		}
	}
}