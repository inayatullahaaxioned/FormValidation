/* Author: 
Inayatullah
*/
//Grabbing element
var firstname = document.querySelector('#firstname'),
  lastname = document.querySelector('#lastname'),
  male = document.querySelector('#male'),
  female = document.querySelector('#female'),
  address = document.querySelector('#address'),
  checkbox = document.querySelector("#terms"),
  form = document.querySelector('#form');

//Grabbing buttons 
var submitBtn = document.querySelector('.submit-btn'),
  cancelBtn = document.querySelector('.cancel-btn');
//regex 
var NameRegex = /^[A-Za-z]+$/;

form.addEventListener('submit', validateForm);

function validateForm(e) {
  e.preventDefault();
  if (firstname.value && lastname.value && (male.checked || female.checked) && address.value && checkbox.checked) {
    console.log('success');
  }
  validateName(firstname);
}

function validateName(input, errorMsg, message) {
  var fname = input.value;
  var errorSpan = document.createElement('span');
  errorSpan.classList.add('error');
  var inputGroup = input.parentElement;
  inputGroup.appendChild(errorSpan);
  fail = document.querySelector(".fail")
  if (fname == "") {
    if (fail) {
      errorSpan.classList.remove("fail")
      errorSpan.classList.remove("error")
    } else {
      errorSpan.innerText = 'field is required';
      errorSpan.classList.add("fail");

    }
  }
  else {
    if (fail) {
      errorSpan.classList.remove("fail")
      errorSpan.classList.remove("error")
    } else {

      inputBox.removeChild(fail)
      errorSpan.classList.remove("fail");
      errorSpan.classList.remove("error")
    }
  }
}
