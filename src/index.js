import './css/_base.scss';
import './css/styles.scss';
import './images/pouncecat_orange.png';
import './images/pouncecat_white.png';

import User from "./User";
import Booking from "./Booking";
import BookingsRepository from "./BookingsRepository";

// *** Global variables *** //


// *** Build page *** //

/// GET user info
const getUserData = fetch(`http://localhost:3001/api/v1/customers/${userId}`)
  .then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json()
  })

/// GET booking info
const getBookingData = fetch(`http://localhost:3001/api/v1/bookings`)
  .then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json()
  })

const userNameSelector = document.querySelector('.user-name')

const userName = 'customer2' // todo => this will come from the login input not sure where it will live yet
const userId = userName.slice(8);

const createCurrentDataSet = () => {
  Promise.all([getUserData, getBookingData])
    .then((allData) => {
      const date = '2019/01/01';
      const currentUserId = userNameSelector.getAttribute('data-userId')

      // create current user
      // const date = new Date();
      // const today = date.toLocaleDateString();
      const user = new User(allData[0])
      console.log(user)

      document.querySelector('.date').innerHTML = `${date}`
      userNameSelector.setAttribute('data-userId', user.id)
      userNameSelector.innerHTML = `Hi, ${user.name}`

      // create bookings repo
      const userBookingsRepo = new BookingsRepository()
      allData[1].bookings.filter(booking => {
        return booking.userID === currentUserId
      }).forEach(booking => {
        booking = new Booking(booking)
        userBookingsRepo.push(booking)
      })

      console.log(userBookingsRepo)
    })
    .catch(error => console.log(error.message))
}

createCurrentDataSet();

// *** General Functions *** //



// *** Event listeners *** //


