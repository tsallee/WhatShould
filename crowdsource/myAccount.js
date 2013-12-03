function myAccount(username) {

	var request = new XMLHttpRequest();
	var url = "http://luna.mines.edu/csci_445/2013_fall/team10/crowdsource/myAccount.html";
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