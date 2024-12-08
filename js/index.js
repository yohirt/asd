// based on https://www.webucator.com/tutorial/learn-javascript/javascript-form-validation.cfm

var inputName = document.getElementById("myname");
var inputEmail = document.getElementById("email");
var inputTel = document.getElementById("tel");
var inputComments = document.getElementById("comments");
var ArrayOfInputs = document.getElementsByTagName("input");

// ===== errors =====

var errorMyname = document.getElementById("errorMyname");
var errorEmail = document.getElementById("errorEmail");
var errorPhone = document.getElementById("errorPhone");
var errorComments = document.getElementById("errorComments");
var errorReCAPTCHA = document.getElementById("errorReCAPTCHA");

// alert(input);

function validate(e) {
  var errors = [];
  clearError();

  if (!CheckLengthName(inputName.value)) {
    errors[errors.length] = "Proszę wprowadzić Imię i Nazwisko";
    errorMyname.innerHTML = "Proszę wprowadzić Imię i Nazwisko";
  }

  if (!checkEmail(inputEmail.value)) {
    errors[errors.length] = "Email nieprawidłowy";
    errorEmail.innerHTML = "Proszę wprowadzić prawidłowy email";
  }

  if (!checkTel(inputTel.value)) {
    errors[errors.length] = "Telefon nieprawidłowy.";
    errorPhone.innerHTML = "Proszę wprowadzić prawidłowy numer telefonu";
  }

  if (!CheckLengthName(inputComments.value, 12)) {
    errors[errors.length] =
      "Proszę wprowadzić treść wiadomosći - conajmniej 20 znaków";
    errorComments.innerHTML =
      "Proszę wprowadzić treść wiadomosći - conajmniej 20 znaków";
  }

  //only online and for the domain
  //  console.log('test recaptcha');
  //  if (!checkReCAPTCHA()) {
  //      errors[errors.length] = "ReCAPTCHA niezweryfikowana";
  //      document.getElementById('errorReCAPTCHA').innerHTML = "Potwierdź że nie jesteś robotem";
  //  }

  if (errors.length > 0) {
    reportErrors(errors);
    e.preventDefault();
  }
}

function CheckLengthName(text, min = 1, max) {
  if (text.length < min || text.length > max) {
    return false;
  }
  return true;
}

function CheckComments(params) {}
function clearError() {
  errorMyname.innerHTML = "";
  errorEmail.innerHTML = "";
  errorPhone.innerHTML = "";
  errorComments.innerHTML = "";
  errorReCAPTCHA.innerHTML = "";
}

function checkTel(params) {
  var expression = /^(?:\(?\+?48)?(?:[-\.\(\)\s]*(\d)){9}\)?$/;
  // var expression = /b[aeiou]+t/;
  var regex = new RegExp(expression);

  if (!params.match(regex)) {
    return false;
  }
  return true;
}

function checkEmail(params) {
  var expression = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  var regex = new RegExp(expression);

  if (!params.match(regex)) {
    return false;
  }
  return true;
}

//only online and for the domain
//  function checkReCAPTCHA() {
//      // ===== Check if ReCAPTCHA =====
//      if (grecaptcha && grecaptcha.getResponse().length > 0) {
//          return true;
//      } else {
//          return false
//      }
//  }

function reportErrors(errors) {
  var msg = "There were some problems...\n";
  var numError;
  for (var i = 0; i < errors.length; i++) {
    numError = i + 1;
    msg += "\n" + numError + ". " + errors[i];
  }
  console.log(msg);
}

window.onload = function() {
  var InputCount = ArrayOfInputs.length;

  for (let index = 0; index < ArrayOfInputs.length; index++) {
    if (ArrayOfInputs[index].type != "submit") {
      ArrayOfInputs[index].addEventListener("keyup", function(e) {
        e.preventDefault();
        console.log("test");
        validate(e);
      });
    }
  }

  inputComments.addEventListener("keyup", function(e) {
    // e.preventDefault();
    console.log("test");
    validate(e);
  });
  document
    .getElementById("amarolMainForm")
    .addEventListener("submit", function(e) {
      // e.preventDefault();
      console.log("test");
      validate(e);
    });
};