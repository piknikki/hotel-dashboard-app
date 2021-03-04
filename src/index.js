import './css/_base.scss';
import './css/styles.scss';
import './images/pouncecat_orange.png';
import './images/pouncecat_white.png';

import User from "./User";


// *** Global variables *** //
let user = new User('customer50');
let date;

console.log(user);


// *** Build page *** //
// fetch calls



// *** General Functions *** //



// *** Event listeners *** //
window.addEventListener('load', (event) => {
  event.preventDefault();
  date = new Date();
  let today = date.toLocaleDateString();

  document.querySelector('.date').innerHTML = `${today}`
  document.querySelector('.user-name').innerHTML = `Hi, ${user.name}`
})

