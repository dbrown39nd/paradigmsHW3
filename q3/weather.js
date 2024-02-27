function toCelsius(){

	// grabs the input from the user
	let input =  document.getElementById("temperature").value;
	// converts the temperature to C
	// if input is not a number (NaN), then return an error message
	if(isNaN(input)){
		document.getElementById("result-parent").style.visibility = "visible";
		document.getElementById("result-parent").style.color = "red";
		document.getElementById("result-parent").style.fontWeight = "bold";
		document.getElementById("result-parent").innerText = "Please enter a valid number!";
		return;
	}

	let celsius = (input - 32) * 5/9;

	// show back to the user, on the <span> element
	document.getElementById("result-parent").style.visibility = "visible";
	document.getElementById("result").style.visibility = "visible";
	document.getElementById("result").style.color = "Blue";
	document.getElementById("result").innerText = celsius.toFixed(2);
	// makes the div visible
	// element.style can be used to change CSS properties of an HTML document
}