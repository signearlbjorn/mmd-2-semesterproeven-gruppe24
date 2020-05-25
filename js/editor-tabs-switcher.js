// JavaScript for Editor tabs
/*Disse to funktioner lader brugeren skifte mellem editor tabs*/
function switchedit(switcheditpage) {
	let editpage = ["graphs", "text", "templates", "codeEditorTab"];
	for(i = 0; i < editpage.length; i++){
		if(switcheditpage == editpage[i]){
			document.getElementById(editpage[i]).classList.remove("hidden");
		}
		else{
			document.getElementById(editpage[i]).classList.add("hidden");
		}
	}
}
function switcheditbg(editbgswitch) {
	let editbg = ["graphsDiv", "textDiv", "templatesDiv", "codeDiv"];
	for(i = 0; i < editbg.length; i++){
		if(editbgswitch == editbg[i]){
			document.getElementById(editbg[i]).classList.remove("lightbg");
		}
		else{
			document.getElementById(editbg[i]).classList.add("lightbg");
		}
	}
}
console.log('editor-switcher-page-loaded');
let singylarHorizontal = document.getElementById("singularHorizontal");
singularHorizontal.addEventListener("lclick", function(){switchpagepreview});

function switchpagepreview(previewSwitch){
	console.log('Start funktion');
	let editpreview = ["pageVertical", "pageHorizontal"];
	for(i = 0; i < editpreview.length; i++){
		console.log('loop yai');
		if(previewSwitch == editpreview[i]){
			console.log('if');
			document.getElementById(editpreview[i]).classList.remove("hidden");
		}
		else{
			console.log('else');
			document.getElementById(editpreview[i]).classList.add("hidden");
		}
		console.log('Loop end :-(');
	}
}
