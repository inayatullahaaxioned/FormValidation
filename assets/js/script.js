/* Author: 
Inayatullah
*/
//Grabbing element
var form = document.querySelector('#form'),
  checkbox = document.querySelector("#terms"),
  isEdit = false,
  editRow;

//Grabbing buttons 
var submitBtn = document.querySelector('.submit-btn'),
  cancelBtn = document.querySelector('.cancel-btn');
//regex 
var NameRegex = /^[A-Za-z]+$/;
var AddressRegex = /^[a-z0-9,.'-]+$/i;

form.addEventListener('submit', validateForm);

function validateForm(e) {
  e.preventDefault();
  var firstname = document.querySelector('#firstname'),
    lastname = document.querySelector('#lastname'),
    gender = form.gender,
    address = document.querySelector('#address');

  validateInput(firstname, NameRegex);
  validateInput(lastname, NameRegex);
  validateInput(address, AddressRegex);
  validateCheckbox(checkbox);
  var checkGender = validateGender(gender);

  if (firstname.value && lastname.value && (gender[0].checked || gender[1].checked) && address.value && checkbox.checked) {
    var userData = {
      fname: firstname.value,
      lname: lastname.value,
      gender: checkGender,
      address: address.value,
      checkbox: checkbox.checked,
    }
    if (isEdit) {
      EditFunc();
    } else {
      display(userData);
    }
    alert('form is submitted');


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
  var inputWrap = input.parentElement;
  var error = inputWrap.querySelector('.error');
  if (error) {
    error.remove();
  }
  // inputWrap.appendChild(errorSpan);
  if (input.value == "") {
    appendSpan(input, '*field is required');
  } else if (fname.length < 4) {
    appendSpan(input, '"*It should have atleast 4 character"');
  } else if (regex.test(input.value) == false) {
    appendSpan(input, `*Please enter valid  ${input.name}`);
  }
}

//validating gender
function validateGender(gender) {
  var valid = false;
  var inputWrap = document.querySelector("#male").parentElement;
  var error = inputWrap.querySelector('.error');
  if (error) {
    error.remove();
  }
  if (gender[0].checked || gender[1].checked) {
    return gender[0].checked ? gender[0].value : gender[1].value;
  } else {
    appendSpan(gender[0], "Please select your gender");
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
    appendSpan(input, 'Please agree the Terms & Conditions');
  }
}

//display function for showing data in table
function display(dataList) {
  var table = document.querySelector('.table');
  var list = document.createElement('li'),
    ul = document.createElement('ul');
  ul.classList.add('cols');
  list.classList.add('row');
  var data = [dataList.fname, dataList.lname, dataList.gender, dataList.address];
  for (var i = 0; i < 6; i++) {
    var li = document.createElement('li');
    li.classList.add('col');
    if (i < 4) {
      li.innerText = data[i];
    } else {
      var Btn = document.createElement('button');
      if (i == 4) {
        Btn.classList.add('edit-btn');
        Btn.innerText = "Edit";
        Btn.addEventListener('click', EditData);
      } else {
        Btn.classList.add('delete-btn');
        Btn.innerText = "Delete";
        Btn.addEventListener('click', DeleteData);
      }
      li.appendChild(Btn);
    }
    ul.appendChild(li);
  }
  list.appendChild(ul);
  table.appendChild(list);
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

function EditData() {
  isEdit = true;
  var parent = this.parentElement.parentElement;
  editRow = parent;
  firstname.value = parent.children[0].innerText;
  lastname.value = parent.children[1].innerText;
  address.value = parent.children[3].innerText;
  checkbox.checked = true;
  gender.forEach(function (input) {
    if (input.value == parent.children[2].innerText) {
      input.checked = true;
    }
  })
}

//function for deleting the data from table
function DeleteData() {
  this.parentElement.parentElement.remove();
}

//function for edit the data in table
function EditFunc() {
  editRow.children[0].innerText = firstname.value;
  editRow.children[1].innerText = lastname.value;
  editRow.children[3].innerText = address.value;
  gender.forEach(function (input) {
    if (input.checked) {
      editRow.children[2].innerText = input.value;
    }
  })
  isEdit = false;
}

//function for append the error span
function appendSpan(input, errorMsg) {
  var errorSpan = document.createElement('span');
  errorSpan.className = 'error';
  var inputWrap = input.parentElement;
  inputWrap.appendChild(errorSpan);
  console.log('appended');
  errorSpan.innerText = errorMsg;
}