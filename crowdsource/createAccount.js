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
		setTimeout(function() { $(userErrDiv).slideToggle(600); }, 2000);
		userErrDiv.value = "";
		return;
	}

	if ( password == "" ) {
		var passErrDiv = document.getElementById("no_password");
		$(passErrDiv).slideDown(600);
		setTimeout(function() { $(passErrDiv).slideToggle(600); }, 2000);
		passErrDiv.value = "";
		return;
	}

	if ( password != confirmPassword ) {
		var passErrDiv = document.getElementById("no_pass_match");
		$(passErrDiv).slideDown(600);
		setTimeout(function() { $(passErrDiv).slideToggle(600); }, 2000);
		password.value = "";
		confirmPassword.value = "";
		return;
	}

	if ( email == "" ) {
		var emailErrDiv = document.getElementById("no_email");
		$(emailErrDiv).slideDown(600);
		setTimeout(function() { $(emailErrDiv).slideToggle(600); }, 2000);
		emailErrDiv.value = "";
		return;
	}

	if ( daySuggestion == "" ) {
		var dayErrDiv = document.getElementById("no_day_suggestion");
		$(dayErrDiv).slideDown(600);
		setTimeout(function() { $(dayErrDiv).slideToggle(600); }, 2000);
		dayErrDiv.value = "";
		return;
	}

	if ( yearSuggestion == "" ) {
		var yearErrDiv = document.getElementById("no_year_suggestion");
		$(yearErrDiv).slideDown(600);
		setTimeout(function() { $(yearErrDiv).slideToggle(600); }, 2000);
		yearErrDiv.value = "";
		return;
	}

	if ( lifeSuggestion == "" ) {
		var lifeErrDiv = document.getElementById("no_life_suggestion");
		$(lifeErrDiv).slideDown(600);
		setTimeout(function() { $(lifeErrDiv).slideToggle(600); }, 2000);
		lifeErrDiv.value = "";
		return;
	}

	saveAccount(username, password, email, daySuggestion, yearSuggestion, lifeSuggestion);

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

function closeAccountPopup() {
	$("#create_account_div").fadeOut(600);
}

function saveAccount(username, password, email, daySuggestion, yearSuggestion, lifeSuggestion) {
	var request = new XMLHttpRequest();
	var url = "http://luna.mines.edu/csci_445/2013_fall/team10/crowdsource/createAccount.php";
	request.open("POST", url, true);
	request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	request.send("username=" + username + "&password=" + password + "&email=" + email + "&day=" + daySuggestion + "&year=" + yearSuggestion + "&life=" + lifeSuggestion);
	request.onreadystatechange = function() {
		if ( request.readyState == 4 && request.status == 200) {
			// Get the response from the server
			var response = request.responseText;
			var createAccountDiv = document.getElementById("create_account_form");
			createAccountDiv.innerHTML = response;
			$(createAccountDiv).fadeIn(600);
		}
	}
}