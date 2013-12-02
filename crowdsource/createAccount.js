function checkFields() {
	var username = document.getElementById("create_username").value;
	var password = document.getElementById("create_password").value;
	var confirmPassword = document.getElementById("create_confirm_password").value;
	var email = document.getElementById("create_email").value;
	var daySuggestion = document.getElementById("create_day_suggestion").value;
	var yearSuggestion = document.getElementById("create_year_suggestion").value;
	var lifeSuggestion = document.getElementById("create_life_suggestion").value;
	
	if ( username == "" ) {
		var userErrDiv = document.getElementById("no_username");
		$(userErrDiv).slideDown(600);
		setTimeout(function() { $(userErrDiv).slideToggle(600); }, 3000);
		userErrDiv.value = "";
		return;
	}

	if ( password == "" ) {
		var passErrDiv = document.getElementById("no_password");
		$(passErrDiv).slideDown(600);
		setTimeout(function() { $(passErrDiv).slideToggle(600); }, 3000);
		passErrDiv.value = "";
		return;
	}

	if ( password != confirmPassword ) {
		var passErrDiv = document.getElementById("no_pass_match");
		$(passErrDiv).slideDown(600);
		setTimeout(function() { $(passErrDiv).slideToggle(600); }, 3000);
		password.value = "";
		confirmPassword.value = "";
		return;
	}
}

function createAccount() {
	var request = new XMLHttpRequest();
	var url = "http://luna.mines.edu/csci_445/2013_fall/team10/crowdsource/createAccount.html";
	request.open("POST", url, true);
	request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	request.send(null);
	request.onreadystatechange = function() {
		if ( request.readyState == 4 && request.status == 200) {
			// Get the response from the server
			var response = request.responseText;
			var createAccountDiv = document.getElementById("create_account_div");
			createAccountDiv.innerHTML = response;
			$(createAccountDiv).fadeIn(600);
		}
	}
}

function saveUserAccount() {
	var username = document.getElementById("create_username");
	var password = document.getElementById("create_password");
	var email = document.getElementById("create_email");
	var request = new XMLHttpRequest();
	var url = "http://luna.mines.edu/csci_445/2013_fall/team10/crowdsource/createAccount.php";
	request.open("POST", url, true);
	request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	request.send("username=" + username + "&password=" + password + "&email=" + email);
	request.onreadystatechange = function() {
		if ( request.readyState == 4 && request.status == 200) {
			// Get the response from the server
			var response = request.responseText;
			var createAccountDiv = document.getElementById("create_account_div");
			createAccountDiv.innerHTML = response;
			$(createAccountDiv).fadeIn(600);
		}
	}
}