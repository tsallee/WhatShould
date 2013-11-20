function updateScore(post_id, username, action) {
	var request = new XMLHttpRequest();
	var url = "http://luna.mines.edu/csci_445/2013_fall/team10/crowdsource/updateScores.php";
	request.open("POST", url, true);
	request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	request.send("post_id=" + post_id + "&username=" + username + "&action=" + action);
	request.onreadystatechange = function() {
		if ( request.readyState == 4 && request.status == 200) {
			location.reload();
		}
	}
}