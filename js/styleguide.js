// ----- STYLEGUIDE JAVASCRIPT -----

console.log('styleguide.js loaded.');

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

let rowOne = document.getElementsByClassName("row-one");
for(let i=0; i<rowOne.length; i++){ // Loop all instanceses of rowOne.
	// On click on row-one, expand or compress row-tow
	rowOne[i].addEventListener("click", function(){expandOrCompress(rowOne[i])});
	
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

/* -- Highcharts graphs -- */
Highcharts.setOptions({
	colors:  ['#F05440', '#192440', '#F05440', '#337AB7', '#F0AD4E', '#00CD00', '#FF0000'],
    chart: {
		backgroundColor: "rgba(0,0,0,0)",
		borderWidth: 0,
        plotShadow: false,
		plotBorderWidth: 0
    }
});

//window.onload.addEventListener('DOMContentLoaded', function () {
document.addEventListener('DOMContentLoaded', function () {
	// console.log('hej')
	// #highcharts-type-bar-preview-example
	var typeBarPreviewExample = Highcharts.chart('highcharts-type-bar-preview-example', {
		chart: {
			type: 'bar',
			animation: false,
			AnimationOptionsObject: false,
			backgroundColor: "#FFF",
			borderWidth: 0,
			plotShadow: false,
			plotBorderWidth: 1,
			plotBorderColor: 0,
		},
		tooltip: { enabled: false },
		legend: { enabled: false },
		credits: { enabled: false },
		plotOptions: {
			series:{
				states: {
					inactive: {
						opacity: 1
					},
					hover: {
						enabled: false
					}
				}
			}
		},
		title: {
			text: 'Bar',
			align: "left"
		},
		xAxis: {
			title: {
				text: ''
			},	
			categories: ['A', 'B', 'C'],
		},
		yAxis: {
			title: {
				text: ''
			},
		},
		series: [{
			name: '1',
			data: [1, 3, 5]
			// 0 of caregoy 1
			// 2 of caregoy 2
			// 4 of caregoy 3
		}, {
			name: '2',
			data: [2, 4, 6]
			// 1 of caregoy 1
			// 3 of caregoy 2
			// 5 of caregoy 3
		}]
	});
	// console.log('med')
	// #highcharts-type-bar-element-example
	var typeBarElementExample = new Highcharts.chart('highcharts-type-bar-element-example', {
		chart: {
			type: 'bar',
		},
		title: {
			text: 'Graph title'
		},
		xAxis: {
			title: {
				text: 'X-axis title'
			},	
			categories: ['Category 1', 'Category 2', 'Category 3']
		},
		yAxis: {
			title: {
				text: 'Y-axis title'
			}
		},
		series: [{
			name: 'Series name 1',
			data: [0, 2, 4]
			// 0 of caregoy 1
			// 2 of caregoy 2
			// 4 of caregoy 3
		}, {
			name: 'Series name 2',
			data: [1, 3, 5]
			// 1 of caregoy 1
			// 3 of caregoy 2
			// 5 of caregoy 3
		}]
	});
	// console.log('dig')
	
	// #highcharts-type-column-element-preview	
	var typeColumnPreviewExample = new Highcharts.chart('highcharts-type-column-preview-example', {
		chart: {
			type: 'column',
			animation: false,
			AnimationOptionsObject: false,
			backgroundColor: "#FFF",
			borderWidth: 0,
			plotShadow: false,
			plotBorderWidth: 1,
			plotBorderColor: 0,
		},
		tooltip: { enabled: false },
		legend: { enabled: false },
		credits: { enabled: false },
		plotOptions: {
			series:{
				states: {
					inactive: {
						opacity: 1
					},
					hover: {
						enabled: false
					}
				}
			}
		},
		title: {
			text: 'column',
			align: "left"
		},
		xAxis: {
			title: {
				text: ''
			},	
			categories: ['A', 'B', 'C'],
		},
		yAxis: {
			title: {
				text: ''
			},
		},
		series: [{
			name: '1',
			data: [1, 3, 5]
			// 0 of caregoy 1
			// 2 of caregoy 2
			// 4 of caregoy 3
		}, {
			name: '2',
			data: [2, 4, 6]
			// 1 of caregoy 1
			// 3 of caregoy 2
			// 5 of caregoy 3
		}]
	});
	// console.log('min')
	
	// #highcharts-type-column-element-example
	var typeColumnElementExample = new Highcharts.chart('highcharts-type-column-element-example', {
		chart: {
			type: 'column',
		},
		title: {
			text: 'Graph title'
		},
		xAxis: {
			title: {
				text: 'X-axis title'
			},	
			categories: ['Category 1', 'Category 2', 'Category 3']
		},
		yAxis: {
			title: {
				text: 'Y-axis title'
			}
		},
		series: [{
			name: 'Series name 1',
			data: [0, 2, 4]
			// 0 of caregoy 1
			// 2 of caregoy 2
			// 4 of caregoy 3
		}, {
			name: 'Series name 2',
			data: [1, 3, 5]
			// 1 of caregoy 1
			// 3 of caregoy 2
			// 5 of caregoy 3
		}]
	});
	// console.log('ven')
	// #highcharts-type-line-element-preview	
	var typelinePreviewExample = new Highcharts.chart('highcharts-type-line-preview-example', {
		chart: {
			type: 'line',
			animation: false,
			AnimationOptionsObject: false,
			backgroundColor: "#FFF",
			borderWidth: 0,
			plotShadow: false,
			plotBorderWidth: 1,
			plotBorderColor: 0,
		},
		tooltip: { enabled: false },
		legend: { enabled: false },
		credits: { enabled: false },
		plotOptions: {
			series:{
				states: {
					inactive: {
						opacity: 1
					},
					hover: {
						enabled: false
					}
				}
			}
		},
		title: {
			text: 'line',
			align: "left"
		},
		xAxis: {
			title: {
				text: ''
			},	
			categories: ['A', 'B', 'C'],
		},
		yAxis: {
			title: {
				text: ''
			},
		},
		series: [{
			name: '1',
			data: [1, 3, 5]
			// 0 of caregoy 1
			// 2 of caregoy 2
			// 4 of caregoy 3
		}, {
			name: '2',
			data: [2, 4, 6]
			// 1 of caregoy 1
			// 3 of caregoy 2
			// 5 of caregoy 3
		}]
	});
	// console.log('finder du')
	// #highcharts-type-line-element-example
	var typelineElementExample = new Highcharts.chart('highcharts-type-line-element-example', {
		chart: {
			type: 'line',
		},
		title: {
			text: 'Graph title'
		},
		xAxis: {
			title: {
				text: 'X-axis title'
			},	
			categories: ['Category 1', 'Category 2', 'Category 3']
		},
		yAxis: {
			title: {
				text: 'Y-axis title'
			}
		},
		series: [{
			name: 'Series name 1',
			data: [0, 2, 4]
			// 0 of caregoy 1
			// 2 of caregoy 2
			// 4 of caregoy 3
		}, {
			name: 'Series name 2',
			data: [1, 3, 5]
			// 1 of caregoy 1
			// 3 of caregoy 2
			// 5 of caregoy 3
		}]
	});
	// console.log('fejl')
	// #highcharts-type-pie-element-preview	
	var typepiePreviewExample = new Highcharts.chart('highcharts-type-pie-preview-example', {
		chart: {
			type: 'pie',
			animation: false,
			AnimationOptionsObject: false,
			backgroundColor: "#FFF",
			borderWidth: 0,
			plotShadow: false,
			plotBorderWidth: 1,
			plotBorderColor: 0,
		},
		tooltip: { enabled: false },
		legend: { enabled: false },
		credits: { enabled: false },
		plotOptions: {
		pie: {
        allowPointSelect: false,
        },
		series:{
				states: {
					inactive: {
						opacity: 1
					},
					hover: {
						enabled: false
					}
				}
			}
		},
		title: {
			text: 'pie',
			align: "left"
		},
		xAxis: {
			title: {
				text: ''
			},	
			categories: ['A', 'B', 'C'],
		},
		yAxis: {
			title: {
				text: ''
			},
		},
		series: [{
			name: 'ABC',
			colorByPoint: true,
			data: [{
				name: 'A',
				y: 4,
			}, {
				name: 'B',
				y: 3
			}, {
				name: 'C',
				y: 2
			}, {
				name: 'D',
				y: 1
			}]
		}]
	});
	// console.log('igen?')
	// #highcharts-type-pie-element-example
	var typepieElementExample = new Highcharts.chart('highcharts-type-pie-element-example', {
		chart: {
			type: 'pie',
		},
		title: {
			text: 'Graph title'
		},
		xAxis: {
			title: {
				text: 'X-axis title'
			},	
			categories: ['Category 1', 'Category 2', 'Category 3']
		},
		yAxis: {
			title: {
				text: 'Y-axis title'
			}
		},
		series: [{
			name: 'ABC',
			colorByPoint: true,
			data: [{
				name: 'A',
				y: 3,
			}, {
				name: 'B',
				y: 2
			}, {
				name: 'C',
				y: 1
			}, {
				name: 'D',
				y: 1
			}]
		}]
	});
});

/*Cookie code*/
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
/*Js for burgermenu change*/
function burgerMenuChange(burgerMenu) {
  burgerMenu.classList.toggle("change");
}

// DIABLE LINKS
let disabledLinks = document.getElementsByClassName("disabled");
for(let i=0; i < disabledLinks.length; i++){
	disabledLinks[i].addEventListener("click", function(){
		event.preventDefault();
		return null;
	});
}