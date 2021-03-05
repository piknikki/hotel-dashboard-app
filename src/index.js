import './css/_base.scss';
import './css/styles.scss';
import './images/pouncecat_orange.png';
import './images/pouncecat_white.png';

import User from "./User";
import Booking from "./Booking";

// *** Global variables *** //
// user will input the string of their username - either customer or manager
// use a query selector to get the input value of the name
const userNameSelector = document.querySelector('.user-name')

const userName = 'customer2' // todo => this will come from the login input not sure where it will live yet
const userId = userName.slice(8);

// *** Build page *** //
// fetch calls

/// GET user info
fetch(`http://localhost:3001/api/v1/customers/${userId}`)
  .then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json()
  })
  .then(data => {
    createNewUser(data)
  })
  .catch(error => console.log(error.message))

/// GET booking info
fetch(`http://localhost:3001/api/v1/bookings`)
  .then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json()
  })
  .then(data => {
    createBookingsData(data)
  })
  .catch(error => console.log(error.message))

const createNewUser = (data) => {
  // const date = new Date();
  // const today = date.toLocaleDateString();
  const date = '2019/01/01';
  const user = new User(data)
  console.log(user)

  document.querySelector('.date').innerHTML = `${date}`
  userNameSelector.setAttribute('data-userId', user.id)
  userNameSelector.innerHTML = `Hi, ${user.name}`
}

const createBookingsData = (data) => {
  const currentUserId = userNameSelector.getAttribute('data-userId')

  const currentUserBookings = data.filter(booking => {
    return booking.userID === currentUserId
  })

  // pass this to the User??

  // todo ==> probably need to use promise.all now
  return currentUserBookings
}

// *** General Functions *** //



// *** Event listeners *** //


