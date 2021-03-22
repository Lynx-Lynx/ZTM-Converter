const button = document.getElementById("convert");
const input = document.getElementById("userinput");
const p1 = document.getElementById("p1");


function inputLength() {						
	return input.value.length;
}

function inputCheck() {
	let commas = "";
	for (let i = 0; i < input.value.length; i++){
		if (input.value[i] === ",") {
			commas += input.value[i];
		}
	}
	
	return commas.length;
}

function validCheck() {
	let inputArray = input.value.replace(/[() ]/g,'').split(",");
		check = "";
		for (element of inputArray) {
			if (/^\d/.test(inputArray) && element.length > 3) {
				check = element;
			}
		}
	return check.length;
}

function hexToRgb() {			//converts HEX to RGB or vice verca
	let color = input.value.replace(/[() ]/g,'');
	switch(true) {
		case(color.startsWith("#") && color.length === 7):
			let rgb = color.substring(1).match(/.{2}/g).map(a => parseInt(a, 16));
			return !rgb.includes(NaN) ? `✓ Hex to RGB: rgb(${rgb})` : "Please enter valid Hex color code";
		case(/^\d/.test(color) && inputCheck() === 2 && validCheck() <= 3):
			let hex = "#" + color.split(",").map(a => parseInt(a).toString(16).padStart(2, '0')).join('');
			return hex.length !== 7 || hex.includes("NaN") ? "Please enter valid RGB color code (0...255)" : `✓ RGB to Hex: ${hex}`;
		default:
			return "Please enter valid color code";				
	}
}
										

function showConverted() {
		p1.textContent = hexToRgb();
}

function addAfterClick() {			///[,\-]/.test(input.value)
	if (inputLength() > 0) {
		showConverted();
	}	
}

function addAfterKeyPress(event) {
	if (inputLength() > 0 && event.keyCode === 13) {
			showConverted();
	}
}


button.addEventListener("click", addAfterClick);

input.addEventListener("click", addAfterClick);

input.addEventListener("keypress", addAfterKeyPress);