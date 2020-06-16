// ----- STYLEGUIDE JAVASCRIPT -----

// --- STYLEGUIDE SPECIFIC CODE ---
console.log('editor.js loaded.');

// --- GENERIC FUNCTIONS ---
function showElement(element) {
	element.classList.remove("hidden");
}

function hideElement(element) {
	element.classList.add("hidden");
}

function hideParrent(child) {
	let parrent = child.parentNode;
	if(!parrent.classList.contains("menu")) {
		while(!parrent.classList.contains("menu")) {
			parrent = parrent.parentNode;
			if(parrent.tagName == "body"){
				alert('Could not close parrent.\nSorry for the inconvinience.\nPlease contact a developer to fix this issue\nThe button is placed in an invallid position.');
				return(false);
			} else if(parrent.classList.contains("example")){
				alert('Could not close parrent.\nExample has no target to close.');
				return(false);
			}
		}
	}
	parrent.classList.add("hidden");
}

function blurArray(arr) {
	for(let i = 0; i < arr.length; i++) {
		if(arr[i].id != "main-header"){
			arr[i].classList.add('blur');
		}
	}
}

function blurArrayRemove(arr) {
	for(let i = 0; i < arr.length; i++) {
		arr[i].classList.remove('blur');
	}
}

function scrollLock() {
	document.body.classList.add('scroll-lock');
}

function scrollLockRemove() {
	document.body.classList.remove('scroll-lock');
}


// --- GENERIC VARIABLES ---
let sections = document.getElementsByTagName("section");
let header = document.getElementsByTagName("header");
let main = document.getElementsByTagName("main");
let aside = document.getElementsByTagName("aside");
let body = document.getElementsByTagName("body");
body = body[0];


// -- FORMAT CODING SECTIONS AS COPY FRIENDLY CODE, WITHOUT USE OF PRE --
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

	codeSections[i].addEventListener("dblclick", function(){ selectText(codeSections[i]) }); // Add eventlistner on doubleclick for selectText.
}


// -- INSERT EXPLAINING BOX ABOVE TABLES --
function activateTableExplainer() {
	let tableExplainer = document.getElementsByClassName('tableExplainer'); // Find all elements with the class tableExplainer.
	for(let i=0; i<tableExplainer.length; i++){ // Loop all instanceses of tableExplainer.
		let tableExplainerInstance = tableExplainer[i];
		let tableExplainerButton = tableExplainerInstance.getElementsByClassName('tableExplainerButton'); // Find elements with the class tableExplainerButton in tableExplainer
		tableExplainerButton = tableExplainerButton[0]; // Always set to first instance.
		tableExplainerButton.addEventListener("click", function(){ 
			for(let j=tableExplainer.length-1; j>=0; j--) {
				// console.log("Intance: " + j);
				tableExplainer[j].parentNode.removeChild(tableExplainer[j]);
			}
			saveCookieTableExplainer();
		 }); // Add eventlistner on click for tableExplainerButton, and when fired, remove tableExplainer instance from dom.
	}
}


// -- TABLE SELECTION --
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


// -- STYLEGUIDE TABLES --
let rowOne = document.getElementsByClassName("row-one");
for(let i=0; i<rowOne.length; i++){ // Loop all instanceses of rowOne.
	// On click on row-one, expand or compress row-tow
	rowOne[i].addEventListener("click", function(){ expandOrCompress(rowOne[i]) });
	
	// Insert info section before tables.
	if(!getTableExplainerCookie()){
		InfoTable = document.createElement("div");
		InfoTable.setAttribute('class', 'tableExplainer');
		InfoTable.innerHTML = '<img src="img/icons/wrench.svg" alt="Wrench-ikon" class="tableExplainerIcon"><span class="tableExplainerText">Tryk på tabel overskrifter, for at se tabelindholdet.</span><img src="img/icons/copy.svg" alt="Kopier-ikon" class="tableExplainerIcon"><span class="tableExplainerText">Tryk på text for at markere en linje i tabelceller med kode.</span><img src="img/icons/copy.svg" alt="Kopier-ikon" class="tableExplainerIcon"><span class="tableExplainerText">Dobbeltclick for at markere hele sektionen i tabelceller med kode.</span><button class="tableExplainerButton">Forstået</button>';
		let grandGrandParrent = rowOne[i].parentNode.parentNode.parentNode; // Få fat i parrent noder få at nå ud af tabel (div)
		grandGrandParrent.insertBefore(InfoTable, grandGrandParrent.childNodes[0]);
		activateTableExplainer();
	}
}

function expandOrCompress(element) {
	let parrent = element.parentNode; // Få fat i parrent node (tbody)
	let rowTwo = parrent.getElementsByClassName("row-two");
	rowTwo = rowTwo[0];
	if(rowTwo.classList.contains("show")){
		rowTwo.classList.remove("show");
	} else {
		rowTwo.classList.add("show");
	}
}

/* --- COOKIES --- */
/*Code based on https://www.w3schools.com/js/js_cookies.asp*/
function getTableExplainerCookie() {
    //console.log('Getting cookies')
    var name = "tableExplainer" + "=";
    var cookieSplits = document.cookie.split(';');
    for (var i = 0; i < cookieSplits.length; i++) {
        var currentCookiePart = cookieSplits[i];
		//console.log(cookieSplits[i]);
		//console.log(currentCookiePart.charAt(0));
		while (currentCookiePart.charAt(0) == ' ') {
			currentCookiePart = currentCookiePart.substring(1);
        }
        if (currentCookiePart.indexOf(name) == 0) {
            return true;
        }
    }
    return false;
}

function saveCookieTableExplainer() {
    let date = new Date();
    date.setTime(date.getTime() + (720 * 24 * 60 * 60 * 1000));
    let cookieExpire = "expires=" + date.toUTCString();
    document.cookie = "tableExplainer" + "=" + 1 + ";" + cookieExpire + ";path=/";
    console.log('Cookie - tableExplainer - is saved.')
}


// --- BUTTON LINKS AND INPUT ---
// -- HELP BUTTON --
let help = document.getElementsByClassName("help");

for(let i = 0; i < help.length; i++) {
	help[i].addEventListener("click", function(){ helpTextDisplay(help[i].title) });
}

function helpTextDisplay(text) {
	alert(text);
}


// -- PRINT BUTTON --
let printButton = document.getElementsByName("print");
for(let i = 0; i < printButton.length; i++) {
	printButton[i].addEventListener("click", function(){ printReport() });
}

function printReport(){
	// Find parrent id, and get corresponding report, if used on overview
	// ToDo
	// Save scroll postion, as the page size changes while printing, and might be disoriented after print
	let y = window.pageYOffset;
	let x = window.pageXOffset;
	// Print report
	window.print();
	// Scroll user to previous position
	window.scrollTo(x, y);
	// Unload report, if on overview
	// ToDo
}


// -- PRIORITY STAR --
// Change icon
let star = document.getElementsByClassName("star");

for(let i = 0; i < star.length; i++){
	star[i].addEventListener("click", function(){ changeImage(star[i]) });
}

function changeImage(elem) {
	console.log('changeImage function active.'	);
	// console.log(document.getElementById("imgClickAndChange").src.endsWith("img/icons/star.svg"));
	//elem = document.getElementById(elem);
	//if (document.getElementById("imgClickAndChange").src =="img/icons/star.svg") // Must use endsWith method instead of == when directory layout is uncertain
	if (elem.src.endsWith("img/icons/star.svg")) // Must use endsWith method instead of == when directory layout is uncertain
	{
		//console.log('changeImage if true.');
		elem.src = "img/icons/starfull.svg";
		elem.alt = "Filled star";
		// Prioritize graph/template
	}
	else
	{
		//console.log('changeImage if false.');
		elem.src = "img/icons/star.svg";
		elem.alt = "Empty star";
		// Unprioritize graph/template
	}
}

// Change priority
/*
1. Get all star parrents in category
2. Insert all prioritized elements in priority category, sorted by initial position
3. Remove prioritized content from regular content.
4. Save priority settings to cookie
*/
//ToDo


// -- BURGER MENU --
let burgerMenu = document.getElementsByClassName("burger-menu");
let mainNavigation = document.getElementById("main-navigation");

for(let i = 0; i < burgerMenu.length; i++) {
	burgerMenu[i].addEventListener("click", function(){ burgerMenuChange(burgerMenu[i]) });
	burgerMenu[i].addEventListener("click", function(){ hiddenToggle(mainNavigation) });
}

function burgerMenuChange(burgerMenu) {
	burgerMenu.classList.toggle("change");
}

function hiddenToggle(element) {
	element.classList.toggle("hidden");
}

// -- CLOSE BUTTON --
let closeButton = document.getElementsByClassName("close");

for(let i = 0; i < closeButton.length; i++) {
	closeButton[i].addEventListener("click", function(){
		hideParrent(closeButton[i]);
		hideElement(overlay);
		if(sections) {
			blurArrayRemove(sections);
		}
		if(header) {
			blurArrayRemove(header);
		}
		if(main) {
			blurArrayRemove(main);
		}
		if(aside) {
			blurArrayRemove(aside);
		}
		scrollLockRemove();
	});
}

// --- SEARCH ---
function search_report() { 
    let input = document.getElementById('myInput').value 
    input=input.toLowerCase(); 
    let repList = document.getElementsByClassName('rep-namelist'); 
      
    for (i = 0; i < repList.length; i++) {  
        if (!repList[i].innerHTML.toLowerCase().includes(input)) { 
            repList[i].style.display="none"; 
        } 
        else { 
            repList[i].style.display="list-item";
             
        } 
    } 
	console.log("Search complete"); 
} 


// -- DIABLELING --
let disabledLinks = document.getElementsByClassName("disabled");
for(let i=0; i < disabledLinks.length; i++){
	disabledLinks[i].addEventListener("click", function(){ 
		event.preventDefault();
		return null;
	 });
}

// -- OPTIONS --
let reportOptions = document.getElementsByClassName("report-options");

for(let i=0; i < reportOptions.length; i++){
	reportOptions[i].addEventListener("click", function(){
		let parrent = reportOptions[i].parentNode;
		if(parrent.classList.contains("report-preview-outbox")) {
			let optionsMenu = parrent.getElementsByClassName("settings-menu");
			optionsMenu = optionsMenu[0];
			//console.log(optionsMenu);
			optionsMenu.classList.remove("hidden");
			return(true);
		} else{
			alert("Invallid button position.");
			return(false);
		}
	 });
}

// -- POP UP --
// - POP UP ELEMENTS -
let deleteReportPopUp = document.getElementById("delete-report-pop-up");
let deleteGroupPopUp = document.getElementById("delete-group-pop-up");
let shareAsPopUp = document.getElementById("share-as-pop-up");
let schedulePopUp = document.getElementById("schedule-pop-up");
let savePopUp = document.getElementById("save-pop-up");
let filterPopUp = document.getElementById("filter-pop-up");
let createNewPopUp = document.getElementById("create-new-pop-up");
let closeWithoutSavingPopUp = document.getElementById("close-without-saving-pop-up");


// - OVERLAY -
let overlay = document.getElementById("overlay");


window.addEventListener("scroll", function(){overlayPosition()});

function overlayPosition (){
	if(document.body.scrollTop > 51 && window.screen.width < 3840 || document.documentElement.scrollTop > 51 && window.screen.width < 3840 || document.body.scrollTop > 102 && window.screen.width >= 3840 || document.documentElement.scrollTop > 102 && window.screen.width >= 3840) {
		overlay.classList.add("past-top");
	} else {
		overlay.classList.remove("past-top");
		if(document.body.scrollTop != 0) {
			var newSize = 51 - document.body.scrollTop;
		} else {
			var newSize = 51 - document.documentElement.scrollTop;
		}
		overlay.style.top = newSize + "px";
	}
	//console.log(51 - document.documentElement.scrollTop);
}


// - OPEN POP UP BUTTONS -
// - NEW REPORT
let newReportButton = document.getElementsByClassName("new-report-button");

for(let i = 0; i < newReportButton.length; i++) {
	newReportButton[i].addEventListener("click", function(){
		showElement(createNewPopUp);
		showElement(overlay);
		if(sections) {
			blurArray(sections);
		}
		if(header) {
			blurArray(header);
		}
		if(main) {
			blurArray(main);
		}
		if(aside) {
			blurArray(aside);
		}
		scrollLock();
	});
}


// FILTER BUTTON
let filterButton = document.getElementsByClassName("filter-button");

for(let i = 0; i < filterButton.length; i++) {
	filterButton[i].addEventListener("click", function(){
		showElement(filterPopUp);
		showElement(overlay);
		if(sections) {
			blurArray(sections);
		}
		if(header) {
			blurArray(header);
		}
		if(main) {
			blurArray(main);
		}
		if(aside) {
			blurArray(aside);
		}
		scrollLock();
	});
}


// CLOSE WITHOUT SAVING POP UP
let closeEditorButton = document.getElementsByName("close-editor");

for(let i = 0; i < closeEditorButton.length; i++) {
	closeEditorButton[i].addEventListener("click", function(){
		// Check for changes
		// ToDo
		showElement(closeWithoutSavingPopUp);
		showElement(overlay);
		if(sections) {
			blurArray(sections);
		}
		if(header) {
			blurArray(header);
		}
		if(main) {
			blurArray(main);
		}
		if(aside) {
			blurArray(aside);
		}
		scrollLock();
	});
}


// DELETE REPORT
let deleteReportButton = document.getElementsByName("delete-report");

for(let i = 0; i < deleteReportButton.length; i++) {
	deleteReportButton[i].addEventListener("click", function(){
		showElement(deleteReportPopUp);
		showElement(overlay);
		if(sections) {
			blurArray(sections);
		}
		if(header) {
			blurArray(header);
		}
		if(main) {
			blurArray(main);
		}
		if(aside) {
			blurArray(aside);
		}
		scrollLock();
	});
}


// SCHEDULE REPORT
let scheduleReportButton = document.getElementsByName("schedule-report");

for(let i = 0; i < scheduleReportButton.length; i++) {
	scheduleReportButton[i].addEventListener("click", function(){
		showElement(schedulePopUp);
		showElement(overlay);
		if(sections) {
			blurArray(sections);
		}
		if(header) {
			blurArray(header);
		}
		if(main) {
			blurArray(main);
		}
		if(aside) {
			blurArray(aside);
		}
		scrollLock();
	});
}

// SHARE REPORT
let shareReportButton = document.getElementsByName("share-report");

for(let i = 0; i < shareReportButton.length; i++) {
	shareReportButton[i].addEventListener("click", function(){
		showElement(shareAsPopUp);
		showElement(overlay);
		if(sections) {
			blurArray(sections);
		}
		if(header) {
			blurArray(header);
		}
		if(main) {
			blurArray(main);
		}
		if(aside) {
			blurArray(aside);
		}
		scrollLock();
	});
}


// SAVE REPORT AS
let saveReportAsButton = document.getElementsByName("save-report-as");

for(let i = 0; i < saveReportAsButton.length; i++) {
	saveReportAsButton[i].addEventListener("click", function(){
		showElement(savePopUp);
		showElement(overlay);
		if(sections) {
			blurArray(sections);
		}
		if(header) {
			blurArray(header);
		}
		if(main) {
			blurArray(main);
		}
		if(aside) {
			blurArray(aside);
		}
		scrollLock();
	});
}


// -- EDITOR TAB --
let templateTab = document.getElementById("template-tab");
let graphsTab = document.getElementById("graphs-tab");
let textTab = document.getElementById("text-tab");
let codeTab = document.getElementById("code-tab");
let editorAsideNavButton = document.getElementsByClassName("editor-aside-nav-button");
let editorTabContent = document.getElementsByClassName("editor-tab-content");

for(let i= 0; i < editorAsideNavButton.length; i++) {
	editorAsideNavButton[i].addEventListener("click", function(){
		for(let i= 0; i < editorAsideNavButton.length; i++) {
			editorAsideNavButton[i].classList.remove("current");
		}
		editorAsideNavButton[i].classList.add("current");
		for(let i= 0; i < editorTabContent.length; i++) {
			editorTabContent[i].classList.remove("current");
			editorTabContent[i].classList.add("hidden");
		}
		let content = document.getElementById(editorAsideNavButton[i].value);
		content.classList.add("current");
		content.classList.remove("hidden");
		//console.log(content);
	});
}


// --- VALIDATION ---
// -- GENERIC FUNCTIONS FOR VALIDATION USE --
function addErrorClass(element) {
	element.classList.add("error");
}

function removeErrorClass(element) {
	element.classList.remove("error");
}


// -- VALIDATE E-MAIL --
let scheduleEmail = document.getElementsByName('email-schedule');

for(let i = 0; i < scheduleEmail.length; i++) {
	let email = scheduleEmail[i];
	
	// Fjern error på click på email
	email.addEventListener("click", function(){ 
		removeErrorClass(email);
	 });
	
	// Fjern error på focus på email
	email.addEventListener("focus", function(){ 
		removeErrorClass(email);
	 });
	
	// Trim og kør validering når man trykker ud af email. Primær
	email.addEventListener("blur", function(){ 
		email.value = email.value.trim();
		emailValidate(email);
	 });
	
	// Trim og kør validering når man trykker ud af email. Sekundær.
	email.addEventListener("focusout", function(){ 
		email.value = email.value.trim();
		emailValidate(email);
	 });
}

function emailValidate(email) {
	console.log('E-mail blev valideret.');
	if(!email.value){
		addErrorClass(email);
		email.title="E-mail cannot be empty";
		return(false);
	} else if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value)){
		addErrorClass(email);
		email.title="Invallid e-mail";
		return(false);
	} else{
		removeErrorClass(email);
		email.title="Valid e-mail ^:^";
		return(true);
	}
}


// -- UPLOADS --
// - UPLOAD IMAGES -
let vallidImageFormats = ['webp', 'svg', 'png', 'jpg', 'jpeg', 'jfif', 'pjpeg', 'pjp', 'ico', 'cur', 'gif', 'bmp'];
let uploadImage = document.getElementsByName("upload-image");

for(let i = 0; i < uploadImage.length; i++) {
	uploadImage[i].addEventListener("change", function(){ validateImaage(uploadImage[i]) });
}

function validateImaage(input){
	let extentension = input.value;
	extentension = extentension.split(".");
	if(extentension.length-1 >= 0){
		extentension = extentension[extentension.length-1];
	} else {
		alert("File extension missing. Please upload a valid file.");
		return(false);
	}
	if((vallidImageFormats.indexOf(extentension) > -1)) { // Inpired by James and Black on https://stackoverflow.com/questions/6116474/how-to-find-if-an-array-contains-a-specific-string-in-javascript-jquery
		alert("Valid format");
		// Ajax add image upload to graph tab
		// ToDo
		return(true);
	} else{
		let validFormatsString = vallidImageFormats.join(' | ');
		alert("Invalid format. Removing image.\nValid formats:\n" + validFormatsString);
		input.value = "";
		//console.log(input.value);
		return(false);
	}
	//console.log((vallidImageFormats.indexOf(extentension) > -1));
}


// - UPLOAD TEMPLATE -
let vallidTemplateFormats = ['html', 'htm'];
let uploadTemplate = document.getElementsByName("upload-template");

for(let i = 0; i < uploadTemplate.length; i++) {
	uploadTemplate[i].addEventListener("change", function(){ validateTemplate(uploadTemplate[i]) });
}

function validateTemplate(input){
	let extentension = input.value;
	extentension = extentension.split(".");
	if(extentension.length-1 >= 0){
		extentension = extentension[extentension.length-1];
	} else {
		alert("File extension missing. Please upload a valid file.");
		return(false);
	}
	if((vallidTemplateFormats.indexOf(extentension) > -1)) { // Inpired by James and Black on https://stackoverflow.com/questions/6116474/how-to-find-if-an-array-contains-a-specific-string-in-javascript-jquery
		alert("Valid format");
		// Ajax add template upload to template tab
		// ToDo
		return(true);
	} else{
		let validFormatsString = vallidTemplateFormats.join(' | ');
		alert("Invalid format. Removing content.\nValid formats:\n" + validFormatsString);
		input.value = "";
		//console.log(input.value);
		return(false);
	}
}

// -- VALIDATE DATES AND TIME --
// - VALIDATE DATE AND TIME FUNCTIONS -
function isValidDate(dateString) { // Based on solution from Goblinlord via. https://stackoverflow.com/questions/18758772/how-do-i-validate-a-date-in-this-format-yyyy-mm-dd-using-jquery
	dateString = dateString.toString().replace(/\-|\.|\:/g, '');
	let regEx = /^\d{4}\d{2}\d{2}$/;
	if(!dateString.match(regEx)){
		return(false);
	}
	//console.log(dateString);
	// Remove already placed chars
	dateString = dateString.slice(0, 6) + '-' + dateString.slice(6);
	dateString = dateString.slice(0, 4) + '-' + dateString.slice(4);
	//console.log(dateString);
	let d = new Date(dateString);
	let dNum = d.getTime();
	//console.log(dNum);
	if(!dNum && dNum !== 0){
		return(false); // NaN value, Invalid date
	}
	//console.log(d);
	// Match format check 2
	if(d.toISOString().slice(0,10) !== dateString){
		return(false); // Not exact format
	}
	// Valid - return formatted date
	return (dateString);
}

function isValidTime(timeString) {
	timeString = timeString.toString().replace(/\-|\.|\:/g, '');
	let regEx = /^\d{2}\d{2}$/;
	//console.log(timeString);
	if(!timeString.match(regEx)){
		return(false);
	}
	// Remove already placed chars
	timeString = timeString.slice(0, 2) + ':' + timeString.slice(2);
	// Valid - return formatted time
	return (timeString);
}

function dateValidate(date) {
	console.log(date.name + ' blev valideret.');
	let formattedDate = isValidDate(date.value);
	if(!date.value) {
		// Empty
		addErrorClass(date);
		date.title="Cannot be empty";
		return(false);
	}
	if(!formattedDate) {
		// Incorret format
		addErrorClass(date);
		date.title="Incorect format. Required format: yyyy-mm-dd";
		return(false);
	} else {
		// No errors
		date.value = formattedDate;
		removeErrorClass(date);
		date.title="Valid date :-)";
		return(true);
	}
}

function dateTimeValidate(dateTime) {
	console.log(dateTime.name + ' blev valideret.');
	dateTime.value = dateTime.value.trim();
	if(!dateTime.value) {
		// Empty
		addErrorClass(dateTime);
		dateTime.title="Cannot be empty";
		return(false);
	}
	if(dateTime.value.match(/T/g)){
		var method = 'T';
		var splitDateTime = dateTime.value.split('T');
	} else if(dateTime.value.match(/\s/g)) {
		var method = ' ';
		var splitDateTime = dateTime.value.split(' ');
	} else {
		addErrorClass(dateTime);
		dateTime.title="Missing splits (space) between date and time";
		return(false); // Missing space between date and time
	}
	//console.log(splitDateTime);
	if(splitDateTime.length > 2){
		addErrorClass(dateTime);
		dateTime.title="To many splits in date and time";
		return(false); // To many spaces
	}
	let splitDate = splitDateTime[0];
	let splitTime = splitDateTime[1];
	// Validate date
	let formattedDate = isValidDate(splitDate);
	if(!formattedDate) {
		// Incorret format
		addErrorClass(dateTime);
		dateTime.title="Incorect date format. Required format: yyyy-mm-dd";
		return(false);
	}
	// Validate time
	let formattedTime = isValidTime(splitTime);
	if(!formattedTime) {
		// Incorret format
		addErrorClass(dateTime);
		dateTime.title="Incorect time format. Required format: HH:MM";
		return(false);
	}
	// Splice Date and time together
	let FormattedDateTime = formattedDate + method + formattedTime;
	// No errors
	dateTime.value = FormattedDateTime;
	removeErrorClass(dateTime);
	dateTime.title="Valid date and time :-)";
	return(true);
}

function timeValidate(time) {
	console.log(time.name + ' blev valideret.');
	time.value = time.value.trim();
	if(!time.value) {
		// Empty
		time.value = '00:00';
	}
	
	// Validate time
	let formattedTime = isValidTime(time.value);
	if(!formattedTime) {
		// Incorret format
		addErrorClass(time);
		time.title="Incorect time format. Required format: HH:MM";
		return(false);
	}
	// No errors
	time.value = formattedTime;
	removeErrorClass(time);
	time.title="Valid time :-)";
	return(true);
}

// - DATE RANGE  -
let dateRangeStart = document.getElementsByName('date-range-start');
let dateRangeEnd = document.getElementsByName('date-range-end');

for(let i = 0; i < dateRangeStart.length; i++) {	
	// Fjern error på click på dateRangeStart[i]
	dateRangeStart[i].addEventListener("click", function(){ 
		removeErrorClass(dateRangeStart[i]);
	 });
	
	// Fjern error på focus på dateRangeStart[i]
	dateRangeStart[i].addEventListener("focus", function(){ 
		removeErrorClass(dateRangeStart[i]);
	 });
	
	// Trim og kør validering når man trykker ud af dateRangeStart[i]. Primær
	dateRangeStart[i].addEventListener("blur", function(){ 
		dateRangeStart[i].value = dateRangeStart[i].value.trim();
		dateValidate(dateRangeStart[i]);
		if(dateRangeEnd[i].value &&
		dateRangeStart[i].value &&
		dateRangeStart[i].value > dateRangeEnd[i].value) {
			addErrorClass(dateRangeEnd[i]);
			dateRangeEnd[i].title="End date must be higher than start date";
		} else if(dateRangeEnd[i].value &&
		dateRangeStart[i].value &&
		dateRangeStart[i].value <= dateRangeEnd[i].value) {
			removeErrorClass(dateRangeEnd[i]);
		}
	 });
}

for(let i = 0; i < dateRangeEnd.length; i++) {	
	// Fjern error på click på dateRangeEnd[i]
	dateRangeEnd[i].addEventListener("click", function(){ 
		removeErrorClass(dateRangeEnd[i]);
	 });
	
	// Fjern error på focus på dateRangeEnd[i]
	dateRangeEnd[i].addEventListener("focus", function(){ 
		removeErrorClass(dateRangeEnd[i]);
	 });
	
	// Trim og kør validering når man trykker ud af dateRangeEnd[i]
	dateRangeEnd[i].addEventListener("blur", function(){ 
		dateRangeEnd[i].value = dateRangeEnd[i].value.trim();
		dateValidate(dateRangeEnd[i]);
		if(dateRangeEnd[i].value &&
		dateRangeStart[i].value &&
		dateRangeStart[i].value > dateRangeEnd[i].value) {
			addErrorClass(dateRangeEnd[i]);
			dateRangeEnd[i].title="End date must be higher than start date";
		} else if(dateRangeEnd[i].value &&
		dateRangeStart[i].value &&
		dateRangeStart[i].value <= dateRangeEnd[i].value) {
			removeErrorClass(dateRangeEnd[i]);
		}
	 });
}


// - SCHEDULE DATETIME  -
let scheduleDateTime = document.getElementsByName('schedule-datetime');

for(let i = 0; i < scheduleDateTime.length; i++) {	
	// Fjern error på click på scheduleDateTime[i]
	scheduleDateTime[i].addEventListener("click", function(){ 
		removeErrorClass(scheduleDateTime[i]);
	 });
	
	// Fjern error på focus på scheduleDateTime[i]
	scheduleDateTime[i].addEventListener("focus", function(){ 
		removeErrorClass(scheduleDateTime[i]);
	 });
	
	// Trim og kør validering når man trykker ud af scheduleDateTime[i]
	scheduleDateTime[i].addEventListener("blur", function(){ 		
		dateTimeValidate(scheduleDateTime[i]);
	 });
}

// - SCHEDULE TIME -
let scheduleTime = document.getElementsByName('schedule-time');

for(let i = 0; i < scheduleTime.length; i++) {	
	// Fjern error på click på scheduleTime[i]
	scheduleTime[i].addEventListener("click", function(){ 
		removeErrorClass(scheduleTime[i]);
	 });
	
	// Fjern error på focus på scheduleTime[i]
	scheduleTime[i].addEventListener("focus", function(){ 
		removeErrorClass(scheduleTime[i]);
	 });
	
	// Trim og kør validering når man trykker ud af scheduleTime[i]
	scheduleTime[i].addEventListener("blur", function(){ 		
		timeValidate(scheduleTime[i]);
	 });
}
