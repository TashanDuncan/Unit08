// ------------------------------------------
//  Variables
// ------------------------------------------
const randomUsersURL = 'https://randomuser.me/api/?results=12';
const employees = document.querySelector('.employees');
const modal = document.getElementById('modal');
const modalClose = document.querySelector('.modal-close');
const modalContent = document.querySelector('.modal-content');
let employeeArray

// ------------------------------------------
//  FETCH FUNCTIONS
// ------------------------------------------ 

function fetchData(url) {
    return fetch(url)
             .then(checkStatus)  
             .then(res => res.json())
             .catch(error => console.log('Looks like there was a problem!', error))
  }

 fetchData(randomUsersURL)
    .then(data => { 
        const results = data.results;
        let userNumber = 0;
        for (const user of results){
            user.userNumber = userNumber;
            console.log(user)
            generateEmployee(user)
            userNumber++
        }
        console.log(results);
        employeeArray = results;
    })

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
    createLI.dataset.index = data.userNumber
    const user = `
    <img class="employee-image" src="${data.picture.large}">
    <div class="employee-details">
        <h2 class="employee-name">${data.name.first} ${data.name.last}</h2>
        <p class="employee-email">${data.email}</p>
        <p class="employee-city">${data.location.city}</p>
    </div>
    `;
    createLI.innerHTML = user;
    employees.appendChild(createLI)
  }


// ------------------------------------------
//  Modal FUNCTIONS
// ------------------------------------------

function displayModal(index) {
  const date = new Date(employeeArray[index].dob.date)
  const display = `                
  <img class="modal-avatar" src="${employeeArray[index].picture.large}" />
  <div class="modal-text-container">
      <h2 class="modal-name">${employeeArray[index].name.first} ${employeeArray[index].name.last}</h2>
      <p class="modal-email">${employeeArray[index].email}</p>
      <p class="modal-city">${employeeArray[index].location.city}</p>
      <hr/>
      <p>${employeeArray[index].cell}</p>
      <p class="modal-address">${employeeArray[index].location.street.number} ${employeeArray[index].location.street.name}, ${employeeArray[index].location.state} ${employeeArray[index].location.postcode}</p>
      <p>Birthday: ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}</p>
  </div>`
  modalContent.innerHTML = display;
}


employees.addEventListener('click', (e) => {
  const event = e.target
  if(event !== employees){
  const card = event.closest('.employee-container')
  const index = card.getAttribute('data-index')
  displayModal(index);
  modal.classList.remove('hidden');
  }

})

modalClose.addEventListener('click', (e) => {
  e.target.parentNode.parentNode.classList.add('hidden')
})