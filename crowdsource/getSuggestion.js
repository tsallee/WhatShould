var suggestionType;

function displaySuggestion(type) {
	suggestionType = type;
	var request = new XMLHttpRequest();
	var url = "http://luna.mines.edu/csci_445/2013_fall/team10/crowdsource/getSuggestion.php";
	request.open("POST", url, true);
	request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	request.send("type=" + type + "&username=" + currentUser);
	request.onreadystatechange = function() {
		if ( request.readyState == 4 && request.status == 200) {
			// Get the response from the server
			var response = request.responseText;
			
			var suggestionDiv = document.getElementById(type + "_div");

			// Hide the suggestion div, which will be replaced by the suggestion later
			$(suggestionDiv).hide();

			if ( response == "Database Connection Error") {
				// Display appropriate message
				suggestionDiv.innerHTML =
				"<p class = \"suggestion\">We're sorry, we couldn't connect to the database. Please try again later.</p>";
			} else if ( response == "Query Failed" ) {
				// Display appropriate message
				suggestionDiv.innerHTML =
				"<p class = \"suggestion\">We're sorry, we couldn't find a suggestion right now. Please try again later.</p>";
			} else {
				var responseArray = JSON.parse(response);
				var id = responseArray[0];
				var suggestion = responseArray[1];
				var score = parseInt(responseArray[2]);
				if ( isNaN(score) ) {
					score = "";
				}
				var scoreDisplay = score;
				var scoreTd = document.getElementsByClassName("score");
				if ( score > 0 ) {
					scoreDisplay = "+" + score;
				} else {
					scoreDisplay = score;
				}
				
				// NEED TO PASS IN USERNAME TO UPDATESCORE IF LOGGED IN. WE WILL NEED TO THEN TEST IT TO MAKE SURE THE RIGHT SUGGESTIONS ARE GIVEN
				var suggestionHTML =
				"<table>" +
					"<tr>" +
						"<td class = \"score\">" + scoreDisplay + "</td>" +
						"<td><p class = \"suggestion\">" + suggestion + "</p></td>"
						;
						if ( id != "" ) {
							suggestionHTML +=
							"<td class = \"suggestionButtons\">" +
								"<table>" +
									"<tr>" +
										"<td class = \"thumbUp\" onclick = \"updateScore(" + id + ",'" + currentUser + "'," + "'up')\">&nbsp;</td>" +
										"<td class = \"thumbDown\" onclick = \"updateScore(" + id + ",'" + currentUser + "'," + "'down')\">&nbsp;</td>" +
										"<td class = \"skip\" onclick = \"updateScore(" + id + ",'" + currentUser + "'," + "'skip')\">&nbsp;</td>" +
									"</tr>" +
								"</table>" +
							"</td>"
							;
						} else {
							suggestionHTML += "<td>&nbsp;</td>";
						}
						suggestionHTML +=
					"</tr>" +
				"</table>"
				;
				suggestionDiv.innerHTML = suggestionHTML;
				if ( score < 0 ) {
					scoreTd[0].style.color = "#C10202";
				} else if ( score > 0 ) {
					scoreTd[0].style.color = "#00A703";
				} else {
					scoreTd[0].style.color = "#3C4758";
				}
			}
			var dayDiv = document.getElementById("day_div");
			var yearDiv = document.getElementById("year_div");
			var lifeDiv = document.getElementById("life_div");
			// Sets each Div to its correct display
			if ( type == "day" ) {
				yearDiv.innerHTML = "<a class = \"suggestionTitle\" href = \"#\" onclick = \"displaySuggestion('year'); return false;\">This Year?</a>";
				lifeDiv.innerHTML = "<a class = \"suggestionTitle\" href = \"#\" onclick = \"displaySuggestion('life'); return false;\">Before I Die?</a>";
			} else if ( type == "year" ) {
				dayDiv.innerHTML = "<a class = \"suggestionTitle\" href = \"#\" onclick = \"displaySuggestion('day'); return false;\">Today?</a>";
				lifeDiv.innerHTML = "<a class = \"suggestionTitle\" href = \"#\" onclick = \"displaySuggestion('life'); return false;\">Before I Die?</a>";
			} else if ( type == "life" ) {
				dayDiv.innerHTML = "<a class = \"suggestionTitle\" href = \"#\" onclick = \"displaySuggestion('day'); return false;\">Today?</a>";
				yearDiv.innerHTML = "<a class = \"suggestionTitle\" href = \"#\" onclick = \"displaySuggestion('year'); return false;\">This Year?</a>";
			}

			// Display the suggestion
			$(suggestionDiv).fadeIn(300);
		}
	}

}

// Called when the suggestion gets upvoted (a thumbs up)
function upVote(response) {
	var suggestionDiv = document.getElementById(suggestionType + "_div");
	$(suggestionDiv).fadeOut(300);
	window.setTimeout(function() {
		suggestionDiv.innerHTML = response;
		$(suggestionDiv).fadeIn(300);
		window.setTimeout(function() {
			$(suggestionDiv).fadeOut(300);
			window.setTimeout(function() {
				if ( suggestionType == "day" ) {
					suggestionDiv.innerHTML = "<a class = \"suggestionTitle\" href = \"#\" onclick = \"displaySuggestion('day'); return false;\">Today?</a>";
				} else if ( suggestionType == "year" ) {
					suggestionDiv.innerHTML = "<a class = \"suggestionTitle\" href = \"#\" onclick = \"displaySuggestion('year'); return false;\">This Year?</a>";
				} else if ( suggestionType == "life" ) {
					suggestionDiv.innerHTML = "<a class = \"suggestionTitle\" href = \"#\" onclick = \"displaySuggestion('life'); return false;\">Before I Die?</a>";
				}
				$(suggestionDiv).fadeIn(300);
			}, 300);
		}, 2000);
	}, 300);
	
}

// Called when the suggestion gets downvoted (a thumbs down) or skipped
function skip() {
	displaySuggestion(suggestionType);
}