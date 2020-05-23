// ----- STYLEGUIDE JAVASCRIPT -----

// --- Format coding sections as copy friendly code, without use of pre ---
/*
What is does:
	This code will find all intances with the class code, and then replace < with '&lt;, linebreaks with code wrapprings, and tabs with 4 spaces.
Why:
	"<" cannot be displayed as text, and needs to be replaced with &lt; to be shown.
	The code wrapping formats the individual sections as code, and will implement line break logic and text formatting.
	Tabs cannot be displayed without use of pre. To emulate tabs, they are replaced by 4 spaces.
How to use:
	give a html element the class of code, and this code will run
*/

let codeSections = document.getElementsByClassName('code'); // Find all elements with the class code.
for(let i=0; i<codeSections.length; i++){ // Loop all instanceses of code.
	let currentSection = codeSections[i].innerHTML; // Get inner html.
	let newCodeSectionText = currentSection.trim(); // trim (remove leading and trailing whiteSpace)
	newCodeSectionText = newCodeSectionText.replace(/\t\t\t\t\t\t/g, ''); // repace 6 tabs with nothing
	newCodeSectionText = newCodeSectionText.replace(/</g, '&lt;'); // repace < with &lt;
	newCodeSectionText = newCodeSectionText.replace(/\n/g, '</code><code>'); // repace linebreaks with </code><code>
	newCodeSectionText = newCodeSectionText.replace(/<code><\/code>/g, '<br>'); // repace <code></code> (emty code elements) with <br>
	newCodeSectionText = newCodeSectionText.replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;'); // repace tabs with 4 space;
	codeSections[i].innerHTML = '<code>' + newCodeSectionText + '</code>'; // update element, and add leading <code> and trailing </code>

	codeSections[i].addEventListener("dblclick", function(){selectText(codeSections[i])}); // Add eventlistner on doubleclick for selectText.
}

let tableExplainer = document.getElementsByClassName('tableExplainer'); // Find all elements with the class tableExplainer.
for(let i=0; i<tableExplainer.length; i++){ // Loop all instanceses of tableExplainer.
	let tableExplainerInstance = tableExplainer[i];
	let tableExplainerButton = tableExplainerInstance.getElementsByClassName('tableExplainerButton'); // Find elements with the class tableExplainerButton in tableExplainer
	tableExplainerButton = tableExplainerButton[0]; // Always set to first instance.
	tableExplainerButton.addEventListener("click", function(){tableExplainer[i].parentNode.removeChild(tableExplainer[i]);}); // Add eventlistner on click for tableExplainerButton, and when fired, remove tableExplainer instance from dom.
}

function selectText(element) {
	// Based on: https://stackoverflow.com/questions/1173194/select-all-div-text-with-single-mouse-click
	// IE kode removed, as we do not attempt to support the platform, and the function is not a critical part of the experience.
    if (window.getSelection) { // If window.getSelection exists, run the code
        var range = document.createRange(); // Create range object
        range.selectNode(element); // Set range to target element
        window.getSelection().removeAllRanges(); // Remove all set ranges (what should or has been selected)
        window.getSelection().addRange(range); // Set the selection to range
    }
}

/* PRIORITY STAR / STJERNE PRIORITERING */
function changeImage() {

	if (document.getElementById("imgClickAndChange").src == "file:///Users/signearlbjorn/Desktop/git%20og%20github/mmd-2-semesterproeven-gruppe24/img/icons/star.svg")
	{
		document.getElementById("imgClickAndChange").src = "file:///Users/signearlbjorn/Desktop/git%20og%20github/mmd-2-semesterproeven-gruppe24/img/icons/starfull.svg";
	}
	else
	{
		document.getElementById("imgClickAndChange").src = "file:///Users/signearlbjorn/Desktop/git%20og%20github/mmd-2-semesterproeven-gruppe24/img/icons/star.svg";
	}
}

let rowOne = document.getElementsByClassName("row-one");
for(let i=0; i<rowOne.length; i++){ // Loop all instanceses of rowOne.
	rowOne[i].addEventListener("click", function(){dis(rowOne[i])});
}
function dis(element){
	let parrent = element.parentNode; /* Få fat i parrent node (tbody/table) */
	let rowTwo = parrent.getElementsByClassName("row-two");
	rowTwo = rowTwo[0];
	if(rowTwo.classList.contains("show")){
		rowTwo.classList.remove("show");
	} else {
		rowTwo.classList.add("show");
	}
}
