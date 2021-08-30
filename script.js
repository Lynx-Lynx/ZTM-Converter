const button = document.getElementById("convert");
const reset = document.getElementById("reset");
const input = document.getElementById("userinput");
const result = document.getElementById("result");
let colorBox = document.getElementById("colorBox");


const inputLength = () => {						
	return input.value.length;
}

const inputCheck = () => {
	let commas = "";
	for (let i = 0; i < input.value.length; i++){
		if (input.value[i] === ",") {
			commas += input.value[i];
		}
	}
	return commas.length;
}

const validCheck = () => {
	let inputArray = input.value.replace(/[() ]/g,'').split(",");
		check = "";
		for (element of inputArray) {
			if (/^\d/.test(inputArray) && element.length > 3) {
				check = element;
			}
		}
	return check.length;
}

const hexToRgb = () => {			//converts HEX to RGB or vice verca
	let color = input.value.replace(/[() ]/g,'');
	switch(true) {
		case(color.startsWith("#") && color.length === 7):
			let rgb = color.substring(1).match(/.{2}/g).map(a => parseInt(a, 16));
			const setRgbColor = () => {
				colorBox.style.backgroundColor = `rgb(${[...rgb]})`;
				colorBox.style.visibility = "visible";
				return `rgb(${rgb})`; 
			}
			const throwRgbError = () => {
				colorBox.style.visibility = "hidden";
				return "Please enter valid Hex color code"; 
			}
			return !rgb.includes(NaN) ? setRgbColor() : throwRgbError(); 
		case(/^\d/.test(color) && inputCheck() === 2 && validCheck() <= 3):
			let hex = "#" + color.split(",").map(a => parseInt(a).toString(16).padStart(2, '0')).join('');
			const setHexColor = () => {
				colorBox.style.backgroundColor = hex;
				colorBox.style.visibility = "visible";
				return hex;
			}
			const throwHexError = () => {
				colorBox.style.visibility = "hidden";
				return "Please enter valid RGB color code (0...255)"; 
			}
			return hex.length !== 7 || hex.includes("NaN") ? throwHexError() : setHexColor();
		default:
			colorBox.style.visibility = "hidden";
			return "Please enter valid color code";				
	}
}							

const showConverted = () => {
	result.textContent = hexToRgb();
}

const addAfterClick = () => {
	if (inputLength() > 0) {
		showConverted();
	}
}

const addAfterKeyPress = event => {
	if (inputLength() > 0 && event.keyCode === 13) {
			showConverted();
	}
}

const resetValue = () => {
	input.value = "";
	result.textContent = "";
	colorBox.style.visibility = "hidden";
}


button.addEventListener("click", addAfterClick);

reset.addEventListener("click", resetValue);

input.addEventListener("click", addAfterClick);

input.addEventListener("keypress", addAfterKeyPress);