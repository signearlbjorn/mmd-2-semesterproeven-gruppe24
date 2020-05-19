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
for(i=0; i<codeSections.length; i++){ // Loop all instanceses of code.
	let currentSection = codeSections[i].innerHTML; // Get inner html.
	let newCodeSectionText = currentSection.trim(); // trim (remove leading and trailing whiteSpace)
	newCodeSectionText = newCodeSectionText.replace(/</g, '&lt;'); // repace < with &lt;
	newCodeSectionText = newCodeSectionText.replace(/\n/g, '</code><code>'); // repace linebreaks with </code><code>
	newCodeSectionText = newCodeSectionText.replace(/<code><\/code>/g, '<br>'); // repace <code></code> (emty code elements) with <br>
	newCodeSectionText = newCodeSectionText.replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;'); // repace tabs with 4 space;
	codeSections[i].innerHTML = '<code>' + newCodeSectionText + '</code>'; // update element, and add leading <code> and trailing </code>
}
