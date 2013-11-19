function displaySuggestion(type) {
	
	var request = new XMLHttpRequest();
	var url = "http://luna.mines.edu/csci_445/2013_fall/team10/crowdsource/getGuestSuggestion.php";
	request.open("POST", url, true);
	request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	request.send("type=" + type);
	request.onreadystatechange = function() {
		if ( request.readyState == 4 && request.status == 200) {
			var response = request.responseText;
			var suggestionDiv = document.getElementById(type + "_div");
			if ( response == "Error: Database Connection Failed.") {
				suggestionDiv.fadeOut(300);
				suggestionDiv.innerHTML =
				"<p class = \"suggestion\">" + "We're sorry, we couldn't connect to the database. Please try again later." + "</p>";
				suggestionDiv.fadeIn(300);
			} else if ( response == "Query Failed" ) {
				suggestionDiv.fadeOut(300);
				suggestionDiv.innerHTML =
				"<p class = \"suggestion\">" + "We're sorry, we couldn't find a suggestion. Please try again later." + "</p>";
				suggestionDiv.fadeIn(300);
			} else {
				var responseArray = JSON.parse(response);
				var id = responseArray[0];
				var suggestion = responseArray[1];
				suggestionDiv.fadeOut(300);
				suggestionDiv.innerHTML =
				"<p class = \"suggestion\">" + suggestion + "</p>";
				suggestionDiv.fadeIn(300);
			}
		}
	}

}