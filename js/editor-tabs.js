// JavaScript for Editor tabs
/*Disse to funktioner lader brugeren skifte mellem editor tabs*/
function switchedit(switcheditpage) {
	let editpage = ["graphs", "text", "templates", "codeEditorTab",];
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
/*Denne funktion lader dig skifte mellem vertkal og horisontal sige visning i editor*/
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

/* PRIORITY STAR / STJERNE PRIORITERING */
function changeImage(elem) {
    console.log('changeImage function active.');
    // console.log(document.getElementById("imgClickAndChange").src.endsWith("img/icons/star.svg"));
    elem = document.getElementById(elem);
    //if (document.getElementById("imgClickAndChange").src =="img/icons/star.svg") // Must use endsWith method instead of == when directory layout is uncertain
    if (elem.src.endsWith("img/icons/star.svg")) // Must use endsWith method instead of == when directory layout is uncertain
    {
        console.log('changeImage if true.');
        elem.src = "img/icons/starfull.svg";
        // Prioritize graph/template
    }
    else
    {
        console.log('changeImage if false.');
        elem.src = "img/icons/star.svg";
        // Unprioritize graph/template
    }
}


//Alerts for buttons with text and icon


function savedAlert() {
 alert("Report saved"); 
}

function closeEditor() {
  var txt;
  if (confirm("Are you sure you want to close?")) {
    txt = "Editor closed";
  } else{
      txt = null
  }
  document.getElementById("closeconfirm").innerHTML = txt;
}


function deleteReport() {
  var txt;
  if (confirm("Are you sure you want to delete this report?")) {
    txt = "Report deleted";
  } else{
      txt = null
  }
  document.getElementById("deleteconfirm").innerHTML = txt;
}



