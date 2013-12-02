// Called on page load
function loadPage() {
	setEnterCapability();
	var body = document.getElementsByTagName("body")[0];
	window.onresize = function(event) {
		body.style.fontSize = window.innerHeight/70 + "pt";
	}
	body.style.fontSize = window.innerHeight/70 + "pt";
}