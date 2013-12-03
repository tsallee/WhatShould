var score;

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
			myAccountDiv.innerHTML = response;
			$(suggestionBox).fadeOut(600);
			window.setTimeout(function() { $(myAccountDiv).fadeIn(600); }, 600);
			getUserScore(username);
			dayToDo();
		}
	}

}

function getUserScore(username) {
	var request = new XMLHttpRequest();
	var url = "http://luna.mines.edu/csci_445/2013_fall/team10/crowdsource/getUserScore.php";
	request.open("POST", url, true);
	request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	request.send("username=" + username);
	request.onreadystatechange = function() {
		if ( request.readyState == 4 && request.status == 200) {
			score = request.responseText;
			displayUserName(username);
		}
	}
}

function displayUserName(username) {
	var userIdDiv = document.getElementById("my_account_user_id");
	userIdDiv.innerHTML = username + " (" + score + ")";
}

function dayToDo() {
	var request = new XMLHttpRequest();
	var url = "http://luna.mines.edu/csci_445/2013_fall/team10/crowdsource/myAccount.php";
	request.open("POST", url, true);
	request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	request.send("type=day&username=" + currentUser);
	request.onreadystatechange = function() {
		if ( request.readyState == 4 && request.status == 200) {
			// Get the response from the server
			// alert(request.responseText);
			// var response = JSON.parse(request.responseText);
			var contentArea = document.getElementById("my_account_content");

			var html =
			"<table class = \"todoTable\">" +
				"<tr>" +
					"<th>Activity</th><th>Completed?</th>";
				"</tr>"
			;
			for ( var i = 0; i < 3; i++) {//response.length; i++ ) {
				html +=
				"<tr>" +
					"<td>" +
						"<p class = \"myAccountSuggestion\">Hello I am a suggestion</p>" +
					"</td>" +
					"<td>" +
						"<a class = \"completed\">Yes</a>";
					"</td>" +
				"</tr>"
				;
			}
			html += "</table>";

			contentArea.innerHTML = html;
		}
	}
}

function yearToDo() {
	
}

function lifeToDo() {
	
}