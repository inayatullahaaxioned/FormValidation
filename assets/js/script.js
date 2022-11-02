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
var AddressRegex = /^[a-z0-9 ,.'-]+$/i;

form.addEventListener('submit', validateForm);

function validateForm(e) {
  e.preventDefault();
  if (firstname.value && lastname.value && (male.checked || female.checked) && address.value && checkbox.checked) {
    console.log('success');
  } else {
    console.log('error');
    validateInput(firstname, NameRegex);
    validateInput(lastname, NameRegex);
    validateInput(address, AddressRegex);
    validateGender(male);
    validateCheckbox(checkbox);
  }

}

function validateInput(input, regex) {
  var fname = input.value;
  var errorSpan = document.createElement('span');
  errorSpan.className = 'error';
  var inputWrap = input.parentElement;
  var error = inputWrap.querySelector('.error');
  if (error) {
    inputWrap.removeChild(error);
  }
  inputWrap.appendChild(errorSpan);
  if (input.value == "") {
    errorSpan.innerText = '*field is required';
  } else if (fname.length < 4) {
    errorSpan.innerText = "*It should have atleast 4 character";
  } else if (regex.test(input.value) == false) {
    errorSpan.innerText = "*Please enter valid " + input.name;
  } else {
    inputWrap.removeChild(errorSpan);
  }
}

function validateGender(input) {
  var inputWrap = input.parentElement;
  var error = inputWrap.querySelector('.error');
  if (error) {
    inputWrap.removeChild(error);
  }
  if (male.checked == false && female.checked == false) {
    var errorSpan = document.createElement('span');
    errorSpan.className = 'error';
    inputWrap.appendChild(errorSpan);
    errorSpan.innerText = "Please select your gender";
  }
}

function validateCheckbox(input) {
  var inputWrap = input.parentElement;
  var error = inputWrap.querySelector('.error');
  if (error) {
    inputWrap.removeChild(error);
  }
  if (checkbox.checked == false) {
    var errorSpan = document.createElement('span');
    errorSpan.className = 'error';
    inputWrap.appendChild(errorSpan);
    errorSpan.innerText = "Please agree the Terms & Conditions";
  }
}
