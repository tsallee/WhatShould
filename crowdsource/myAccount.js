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
			var response = JSON.parse(request.responseText);
			var contentArea = document.getElementById("my_account_content");

			var html =
			"<table class = \"todoTable\">" +
				"<tr>" +
					"<th>Activity</th><th>Completed?</th>";
				"</tr>"
			;
			for ( var i = 0; i < response.length; i++) {
				html +=
				"<tr>" +
					"<td>" +
						"<p class = \"myAccountSuggestion\">";
							html += response[i].content;
							html += "</p>" +
					"</td>" +
					"<td id = \"" + response.id + "_td" + "\" style = \"text-align: center\">"
					;
					if ( response[i].completed == 0 ) {
						html += "<a class = \"myAccountCompleted\" href = \"#\" onclick = \"updatePostCompleted(" + response.id +")\">No</a>";
					} else if ( response[i].completed == 1 ) {
						html += "<a class = \"myAccountCompleted\" href = \"#\" onclick = \"updatePostCompleted(" + response.id +")\">Yes</a>";
					} else {
						html += "&nbsp;";
					}
				html +=
						"</a>" +
					"</td>" +
				"</tr>"
				;
			}
			html += "</table>";
			contentArea.innerHTML = html;
			var dayTab = document.getElementById("day_tab");
			var yearTab = document.getElementById("year_tab");
			var lifeTab = document.getElementById("life_tab");
			dayTab.style.color = "#C10202";
			dayTab.style.fontWeight = "bold";
			yearTab.style.color = "#610B21";
			yearTab.style.fontWeight = "normal";
			lifeTab.style.color = "#610B21";
			lifeTab.style.fontWeight = "normal";

		}
	}
}

function updatePostCompleted(postID) {
	var completedTd = document.getElementById(postID + "_td");
	completedTd.innerHTML = "Mark as Completed?" +
	"<a href = \"#\" onclick = \"completePost('" + currentUser + "'," + postID + ", 1)\">Yes</a> | " +
	"<a href = \"#\" onclick = \"completePost('" + currentUser + "'," + postID + ", 0)\">No</a>";
}

function completePost(userId, postId, completed) {
	var request = new XMLHttpRequest();
	var url = "http://luna.mines.edu/csci_445/2013_fall/team10/crowdsource/updatePostCompleted.php";
	request.open("POST", url, false);
	request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	request.send("username=" + currentUser + "&post_id=" + postId + "&completed=" + completed);
	request.onreadystatechange = function() {
		if ( request.readyState == 4 && request.status == 200) {
			var completedTd = document.getElementById(postID + "_td");
			completedTd.innerHTML = "<a class = \"myAccountCompleted\" href = \"#\" onclick = \"updatePostCompleted(" + response.id +")\">" + request.responseText + "</a>";
		}
	}
}

function yearToDo() {
	
}

function lifeToDo() {
	
}