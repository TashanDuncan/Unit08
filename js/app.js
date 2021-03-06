// ------------------------------------------
//  Variables
// ------------------------------------------
const randomUsersURL = 'https://randomuser.me/api/?results=12';
const employees = document.querySelector('.employees');
const modal = document.getElementById('modal');
const modalClose = document.querySelector('.modal-close');
const modalNext = document.querySelector('.modal-next');
const modalPrev = document.querySelector('.modal-prev');
const modalContent = document.querySelector('.modal-content');
const search = document.getElementById('search');

let employeeArray;

// ------------------------------------------
//  FETCH FUNCTIONS
// ------------------------------------------ 

function fetchData(url) {
    return fetch(url)
             .then(checkStatus)  
             .then(res => res.json())
             .catch(error => console.log('Looks like there was a problem!', error));
  }

 fetchData(randomUsersURL)
    .then(data => { 
        const results = data.results;
        let userNumber = 0;
        for (const user of results){
            user.userNumber = userNumber;
            generateEmployee(user);
            userNumber++;
        }
        employeeArray = results;
    });

// ------------------------------------------
//  HELPER FUNCTIONS
// ------------------------------------------

function checkStatus(response) {
    if (response.ok) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(new Error(response.statusText));
    }
  }

  function generateEmployee(data) {
    const createLI = document.createElement("LI");
    createLI.className = "employee-container";
    createLI.dataset.index = data.userNumber;
    const user = `
    <img class="employee-image" src="${data.picture.large}">
    <div class="employee-details">
        <h2 class="employee-name">${data.name.first} ${data.name.last}</h2>
        <p class="employee-email">${data.email}</p>
        <p class="employee-city">${data.location.city}</p>
    </div>
    `;
    createLI.innerHTML = user;
    employees.appendChild(createLI);
  }


// ------------------------------------------
//  Modal FUNCTIONS
// ------------------------------------------

function displayModal(index) {
  const date = new Date(employeeArray[index].dob.date);
  const display = `                
  <img class="modal-avatar" src="${employeeArray[index].picture.large}" />
  <div class="modal-text-container">
      <h2 class="modal-name">${employeeArray[index].name.first} ${employeeArray[index].name.last}</h2>
      <p class="modal-email">${employeeArray[index].email}</p>
      <p class="modal-city">${employeeArray[index].location.city}</p>
      <hr/>
      <p class="modal-number">${employeeArray[index].cell}</p>
      <p class="modal-address">${employeeArray[index].location.street.number} ${employeeArray[index].location.street.name}, ${employeeArray[index].location.state} ${employeeArray[index].location.postcode}</p>
      <p class="modal-birthday">Birthday: ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}</p>
  </div>`;
  modalContent.innerHTML = display;

  if(index === 0){
    modalPrev.classList.add('hidden');
  } else if(index >= 11){
    modalNext.classList.add('hidden');
  } else {
    modalNext.classList.remove('hidden');
    modalPrev.classList.remove('hidden');
  }
}


employees.addEventListener('click', (e) => {
  const event = e.target;
  if(event !== employees){
  const card = event.closest('.employee-container');
  let indexString = card.getAttribute('data-index');
  let index = parseInt(indexString);
  displayModal(index);

  modal.classList.remove('hidden');

  modalNext.addEventListener('click', () => {
    index++;
    displayModal(index);
  });
  modalPrev.addEventListener('click', () => {
    index--;
    displayModal(index);
  });

  //Attempted Event listener for key presses but causing a bug.
  //Will look into later as not required to pass the unit

  /*document.addEventListener('keydown', (e) =>{
    if (e.code === 'ArrowLeft'){
      index--
      displayModal(index);
    } else if(e.code === 'ArrowRight'){
      index++
      displayModal(index);
    }
  })*/
  
  }



});

modalClose.addEventListener('click', (e) => {
  e.target.parentNode.parentNode.classList.add('hidden');
  modalNext.classList.remove('hidden');
  modalPrev.classList.remove('hidden');
});

search.addEventListener('keyup', e => {
  const searchEmployee = e.target.value.toLowerCase();
  const employeeContainer = document.querySelectorAll('.employee-container');

  for (let i = 0; i < employeeContainer.length; i++) {
    const employeeName = document.querySelectorAll('.employee-name');
    const name = employeeName[i].innerText.toLowerCase();

    if (name.includes(searchEmployee)) {
      employeeContainer[i].style.display = '';
    } else {
      employeeContainer[i].style.display = 'none';
    }
  }
});
