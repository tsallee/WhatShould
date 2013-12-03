function createSuggestion() {
	var request = new XMLHttpRequest();
	var url = "http://luna.mines.edu/csci_445/2013_fall/team10/crowdsource/createSuggestion.html";
	request.open("POST", url, true);
	request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	request.send(null);
	request.onreadystatechange = function() {
		if ( request.readyState == 4 && request.status == 200) {
			// Get the response from the server
			var response = request.responseText;
			var createAccountDiv = document.getElementById("create_suggestion_div");
			createAccountDiv.innerHTML = response;
			$(createAccountDiv).fadeIn(600);
		}
	}
}

function closeCreateSuggestionPopup() {
	$("#create_suggestion_div").fadeOut(600);
}

function checkSuggestions() {
	var daySuggestion = document.getElementById("add_day_suggestion").value;
	var yearSuggestion = document.getElementById("add_year_suggestion").value;
	var lifeSuggestion = document.getElementById("add_life_suggestion").value;
	if ( daySuggestion == "" && yearSuggestion == "" && lifeSuggestion == "" ) {
		var suggestionErrDiv = document.getElementById("no_suggestion");
		$(suggestionErrDiv).slideDown(600);
		setTimeout(function() { $(suggestionErrDiv).slideToggle(600); }, 2000);
		suggestionErrDiv.value = "";
		return;
	}
	saveSuggestions(daySuggestion, yearSuggestion, lifeSuggestion, currentUser);
}

function saveSuggestions(daySuggestion, yearSuggestion, lifeSuggestion, username) {
	var request = new XMLHttpRequest();
	var url = "http://luna.mines.edu/csci_445/2013_fall/team10/crowdsource/createSuggestion.php";
	request.open("POST", url, true);
	request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	request.send("username=" + username + "&day=" + daySuggestion + "&year=" + yearSuggestion + "&life=" + lifeSuggestion);
	request.onreadystatechange = function() {
		if ( request.readyState == 4 && request.status == 200) {
			// Get the response from the server
			var response = request.responseText;
			var createSuggestionForm = document.getElementById("create_suggestion_form");
			createSuggestionForm.innerHTML = response;
			$(createSuggestionForm).fadeIn(600);
		}
	}
}