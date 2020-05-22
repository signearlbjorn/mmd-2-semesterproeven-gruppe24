// JavaScript Document
function switchedit(editpageswitch){
			var editpage = ["graphs", "text", "templates", "code"];
			for(i = 0; i < editpage.length; i++){
				if(editpageswitch == editpage[i]){
					document.getElementById(editpage[i]).classList.remove("hidden");
				}
				else{
					document.getElementById(editpage[i]).classList.add("hidden");
				}
			}
		}
function switcheditdivbg(editbgswitch){
			var editbg = ["graphsdiv", "textdiv", "templatesdiv", "codediv"];
			for(i = 0; i < editbg.length; i++){
				if(editbgswitch == editpage[i]){
					document.getElementById(editpage[i]).classList.remove("lightbg");
				}
				else{
					document.getElementById(editbg[i]).classList.add("lightbg")
				}
			}
		}