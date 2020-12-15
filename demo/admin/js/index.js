
// This file contains the authantication related divs scripts
function displaySignUpDiv(){
	document.getElementById("title-head").innerHTML = "Sign Up";
	document.getElementById("login-div").style.display = "none";
	document.getElementById("signup-div").style.display = "block";
	document.getElementById("forgetPass-div").style.display = "none";
}

function displayLoginDiv(){
	document.getElementById("title-head").innerHTML = "Login";
	document.getElementById("login-div").style.display = "block";
	document.getElementById("signup-div").style.display = "none";
	document.getElementById("forgetPass-div").style.display = "none";
}

function displayForgotPassword(){
	document.getElementById("title-head").innerHTML = "Forgot Password";
	document.getElementById("login-div").style.display = "none";
	document.getElementById("signup-div").style.display = "none";
	document.getElementById("forgetPass-div").style.display = "block";
}
document.addEventListener("DOMContentLoaded", function(){
	document.getElementById("title-head").innerHTML = "Login";
	document.getElementById("login-div").style.display = "block";
	document.getElementById("signup-div").style.display = "none";
	document.getElementById("forgetPass-div").style.display = "none";
});

