function checkFields() {
	var password = document.getElementById("password");
	var confirmPassword = document.getElementById("confirm_password");
	if ( password.value != confirmPassword.value ) {
		var passErrDiv = document.getElementById("no_pass_match");
		$(passErrDiv).slideDown(600);
		setTimeout(function() { $(passErrDiv).slideToggle(600); }, 3000);
		password.value = "";
		confirmPassword.value = "";
	}
}