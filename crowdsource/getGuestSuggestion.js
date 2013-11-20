function displaySuggestion(type) {
	
	var request = new XMLHttpRequest();
	var url = "http://luna.mines.edu/csci_445/2013_fall/team10/crowdsource/getGuestSuggestion.php";
	request.open("POST", url, true);
	request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	request.send("type=" + type);
	request.onreadystatechange = function() {
		if ( request.readyState == 4 && request.status == 200) {
			// Get the response from the server
			var response = request.responseText;
			
			var suggestionDiv = document.getElementById(type + "_div");

			// Hide the suggestion div, which will be replaced by the suggestion later
			$(suggestionDiv).hide();

			if ( response == "Error: database connection failed.") {
				// Display appropriate message
				suggestionDiv.innerHTML =
				"<p class = \"suggestion\">" + "We're sorry, we couldn't connect to the database. Please try again later." + "</p>";
			
			} else if ( response == "Query Failed" ) {
				// Display appropriate message
				suggestionDiv.innerHTML =
				"<p class = \"suggestion\">" + "We're sorry, we couldn't find a suggestion right now. Please try again later." + "</p>";
			
			} else {
				
				var responseArray = JSON.parse(response);
				var id = responseArray[0];
				var suggestion = responseArray[1];
				suggestionDiv.innerHTML =
				"<div class = upArrow></div>" +
				"<p class = \"suggestion\">" + suggestion + "</p>" +
				"<div class = downArrow></div>";
			
			}
			// Display the suggestion
			$(suggestionDiv).fadeIn(300);
		}
	}

}