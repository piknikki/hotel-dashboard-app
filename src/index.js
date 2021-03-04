import './css/_base.scss';
import './css/styles.scss';
import './images/pouncecat_orange.png';
import './images/pouncecat_white.png';

import User from "./User";


// *** Global variables *** //
// user will input the string of their username - either customer50 or manager
// use a query selector to get the input value of the name
const userName = 'customer2' // todo => this will come from the login input
const userId = userName.slice(8);
let date;

// *** Build page *** //
// fetch calls


fetch(`http://localhost:3001/api/v1/customers/${userId}`)
  .then(response => response.json()) // todo ==> add error handling
  .then(data => {
    createNewUser(data)
  })

const createNewUser = (data) => {
  const user = new User(data)
  console.log("this is the user", user)
  date = new Date();
  let today = date.toLocaleDateString();

  document.querySelector('.date').innerHTML = `${today}`
  document.querySelector('.user-name').innerHTML = `Hi, ${user.name}`
}

// *** General Functions *** //



// *** Event listeners *** //
// window.addEventListener('load', (event) => {
//   event.preventDefault();
//
// })

