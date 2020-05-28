// JavaScript Document
/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function showSetting(settingsMenuShow) {
	document.getElementByClassName("settings").classList.toggle("hidden");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
	if (!event.target.matches('.gear-icon','.closesettingmenu')) {
		var dropdowns = document.getElementsByClassName("settingsmenu");
		var i;
		for (i = 0; i < dropdowns.length; i++) {
			var openDropdown = dropdowns[i];
			if (openDropdown.classList.contains('hidden')) {
				openDropdown.classList.remove('hidden');
			}
		}
	}
}