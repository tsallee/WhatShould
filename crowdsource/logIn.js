function load() {
	$("#password").keyup(function(event) {
	    if(event.keyCode == 13){
	        login();
	    }
	});
}

function displayLogIn() {
	var loginTable = document.getElementById("login_table");
	$(loginTable).fadeToggle(700);
}

function login() {
	var loginTable = document.getElementById("login_table");
	alert("logging in");
	$(loginTable).fadeOut(700);
}