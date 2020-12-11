// ------------------------------------------
//  Variables
// ------------------------------------------
const randomUsersURL = 'https://randomuser.me/api/?results=12'
const employees = document.querySelector('.employees');
const modal = document.getElementById('modal')


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

        for (const user of results){
            console.log(user)
            generateEmployee(user)
        }
        console.log(results);
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

employees.addEventListener('click', (e) => {
  const event = e.target
  if(event !== employees){
  modal.classList.remove('hidden');
  }
  
})