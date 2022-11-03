/* Author: 
Inayatullah
*/
//Grabbing element
var form = document.querySelector('#form'),
  firstname = document.querySelector('#firstname'),
  lastname = document.querySelector('#lastname'),
  gender = form.gender,
  address = document.querySelector('#address'),
  checkbox = document.querySelector("#terms");

//Grabbing buttons 
var submitBtn = document.querySelector('.submit-btn'),
  cancelBtn = document.querySelector('.cancel-btn');
//regex 
var NameRegex = /^[A-Za-z]+$/;
var AddressRegex = /^[a-z0-9 ,.'-]+$/i;

form.addEventListener('submit', validateForm);

function validateForm(e) {
  e.preventDefault();
  validateInput(firstname, NameRegex);
  validateInput(lastname, NameRegex);
  validateInput(address, AddressRegex);
  validateCheckbox(checkbox);
  var checkGender = validateGender(gender);

  if (firstname.value && lastname.value && (male.checked || female.checked) && address.value && checkbox.checked) {
    var userData = {
      fname: firstname.value,
      lname: lastname.value,
      gender: checkGender,
      address: address.value,
      checkbox: checkbox.checked,
    }
    display();
    alert('form is submitted');
    function display() {
      var list = document.createElement('li');
      list.className = "row";
      var table = document.querySelector('.table');
      list.innerHTML = `<ul class="cols">
              <li class="col">${userData.fname}</li>
              <li class="col">${userData.lname}</li>
              <li class="col">${userData.gender}</li>
              <li class="col">${userData.address}</li>
              <li class="col"><button class="edit-btn">Edit</button></li>
              <li class="col"><button class="delete-btn">Delete</button></li>
            </ul>`;
      table.appendChild(list);
    }

    firstname.value = "";
    lastname.value = "";
    address.value = "";
    checkbox.checked = false;

    for (let gen of gender) {
      gen.checked = false;
    }

  } else {
    console.log('error');
  }

}
//validation function for fname,lname and address
function validateInput(input, regex) {
  var fname = input.value;
  var errorSpan = document.createElement('span');
  errorSpan.className = 'error';
  var inputWrap = input.parentElement;
  var error = inputWrap.querySelector('.error');
  if (error) {
    error.remove();
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
//validating gender
function validateGender(gender) {
  var valid = false;
  var inputWrap = document.querySelector("#male").parentElement.parentElement;
  var errorSpan = document.createElement('span');
  errorSpan.className = 'error';
  inputWrap.appendChild(errorSpan);
  var error = inputWrap.querySelector('.error');
  for (let i = 0; i < gender.length; i++) {
    if (gender[i].checked) {
      valid = true;
      if (valid) {
        error.remove();
        return gender[i].value;
      }
    } else {
      error.innerText = "Please select your gender";
    }
  }
}
//validating checkbox
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

//cancel btn form reset
cancelBtn.addEventListener('click', formReset);
function formReset() {
  var error = document.querySelectorAll('.error');
  console.log(error);
  error.forEach(function remove(elem) {
    elem.remove();
  })
}
