var cookieName = "what_should_cookie";
var currentUser = "";

// Called on page load
function loadPage() {
	setEnterCapability();
	var body = document.getElementsByTagName("body")[0];
	window.onresize = function(event) {
		body.style.fontSize = window.innerHeight/75 + "pt";
	}
	body.style.fontSize = window.innerHeight/75 + "pt";
	setUserName();
	if ( currentUser != "guest" ) {
		displayMemberLinks(username);
	}
}

// Drops a cookie on the user's browser so they will stay logged in unless
// they log out, which keeps track of their username so it can be used in
// all the pages on our site.
function dropCookie(username) {
	currentUser = username;
	var c_name = cookieName;
	var c_value = username;
	var exdays = 100;
	var exdate = new Date();
	exdate.setDate(exdate.getDate() + exdays);
	var c_value = escape(c_value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
	document.cookie = c_name + "=" + c_value;
}

// Removes the "what_should_cookie" from the user's browser
function deleteCookie() {
    document.cookie = cookieName + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    currentUser = "guest";
};

// If the user has our cookie on their browser, this function will extract
// their username from the cookie.
function getUsernameFromCookie() {
	var c_name = cookieName;
	var c_value = document.cookie;
	var c_start = c_value.indexOf(" " + c_name + "=");
	if (c_start == -1)
	  {
	  c_start = c_value.indexOf(c_name + "=");
	  }
	if (c_start == -1)
	  {
	  c_value = null;
	  }
	else
	  {
	  c_start = c_value.indexOf("=", c_start) + 1;
	  var c_end = c_value.indexOf(";", c_start);
	  if (c_end == -1)
	  {
	c_end = c_value.length;
	}
	c_value = unescape(c_value.substring(c_start,c_end));
	}
	return c_value;
}

// This function sets the "currentUser" variable with the value extracted
// from the cookie, and with "guest" otherwise
function setUserName() {
	username = getUsernameFromCookie();
  	if ( username != null && username != "" && username != "guest") {
		currentUser = username;
	} else {
  		currentUser = "guest";
  	}
}