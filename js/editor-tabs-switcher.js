// JavaScript Document
function switchedit(switcheditpage){
	var editpage = ["grpahs", "text", "templates", "code"];
	for(i = 0; i < editpage.length; i++){
		if(switcheditpage == editpage[i]){
			document.getElementById(editpage[i]).classList.remove("hidden");
		}
		else{
			document.getElementById(editpage[i]).classList.add("hidden");
		}
	}
}
function switcheditbg(editbgswitch){
	var editbg = ["graphsdiv", "textdiv", "templatesdiv", "codediv"];
	for(ii = 0; ii < editbg.length; ii++){
		if(editbgswitch == editbg[i]){
			document.getElementById(editbg[ii]).classList.remove("lightbg");
		}
		else{
			document.getElementById(editbg[ii]).classList.add("lightbg")
		}
	}
}