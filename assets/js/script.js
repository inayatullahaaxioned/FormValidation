/* Author: 
Inayatullah
*/
//Grabbing element
var form = document.querySelector('#form'),
  checkbox = document.querySelector("#terms"),
  gender = form.gender,
  isEdit = false,
  editRow,
  firstname = document.querySelector('#firstname'),
  lastname = document.querySelector('#lastname'),
  address = document.querySelector('#address'),
  editId = null;
var data = JSON.parse(localStorage.getItem('userData'));
var dataStore = data ? data : [];

//Grabbing buttons 
var submitBtn = document.querySelector('.submit-btn'),
  cancelBtn = document.querySelector('.cancel-btn');
//regex 
var NameRegex = /^[A-Za-z]+$/;
var AddressRegex = /^[a-z0-9,.'-]+$/i;

form.addEventListener('submit', validateForm);

function validateForm(e) {
  e.preventDefault();
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
    if (editId != null) {
      dataStore[editId] = userData;
      submitBtn.value = 'Submit';
    } else {
      dataStore.push(userData);
    }
    editId = null;
    storeData(dataStore);
    display(dataStore);
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

//displaying the data from local storage
display(dataStore);

//validation function for fname,lname and address
function validateInput(input, regex) {
  var fname = input.value;
  var inputWrap = input.parentElement;
  var error = inputWrap.querySelector('.error');
  if (error) {
    error.remove();
  }
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
  var tableHead = table.children[0].cloneNode(true);
  table.innerHTML = '';
  table.appendChild(tableHead);
  dataList.forEach(function (data) {
    var list = document.createElement('li');
    list.classList.add('row', "abc");
    list.innerHTML = `<ul class="cols">
                        <li class="col fname-data">${data.fname}</li>
                        <li class="col lname-data">${data.lname}</li>
                        <li class="col gender-data">${data.gender}</li>
                        <li class="col address-data">${data.address}</li>
                        <li class="col"><button class="edit-btn">Edit</button></li>
                        <li class="col"><button class="delete-btn">Delete</button></li>
                      </ul>`;
    table.appendChild(list);

  });
  // addEventListener
  var editBtn = document.querySelectorAll('.edit-btn'),
    deleteBtn = document.querySelectorAll('.delete-btn');

  editBtn.forEach(function (edit, idx) {
    edit.addEventListener('click', function () {
      submitBtn.value = "Update";
      var rowData = this.parentElement.parentElement.children;
      firstname.value = rowData[0].innerText;
      lastname.value = rowData[1].innerText;
      address.value = rowData[3].innerText;
      gender.value = rowData[2].innerText;
      checkbox.checked = true;
      editId = idx;
    });
  })

  deleteBtn.forEach(function (list, idx) {
    list.addEventListener('click', function () {
      dataStore.splice(idx, 1)
      storeData(dataStore);
      display(dataStore);
    })
  });
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

//function for append the error span
function appendSpan(input, errorMsg) {
  var errorSpan = document.createElement('span');
  errorSpan.className = 'error';
  var inputWrap = input.parentElement;
  inputWrap.appendChild(errorSpan);
  console.log('appended');
  errorSpan.innerText = errorMsg;
}

//pushing data local storage 
function storeData(input) {
  localStorage.setItem('userData', JSON.stringify(input));
}