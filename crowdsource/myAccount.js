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
			var suggestionBox = document.getElementById("suggestion_box");
			var myAccountDiv = document.getElementById("my_account_div");
			$(suggestionBox).fadeOut(600);
			window.setTimeout(function() { $(createAccountDiv).fadeIn(600); }, 600);
			
		}
	}

}