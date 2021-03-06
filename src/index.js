import './css/_base.scss';
import './css/styles.scss';
import './images/pouncecat_orange.png';
import './images/pouncecat_white.png';

import User from "./User";
import BookingEngine from "./BookingEngine";

// *** Global variables *** //
const userName = 'customer40'
// todo => this will come from the login input not sure where it will live yet
const userId = userName.slice(8);

const userNameSelector = document.getElementById('userName');
const pastBookingsSelector = document.getElementById('pastBookings');
const futureBookingsSelector = document.getElementById('futureBookings');

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

/// GET room info
const getRoomData = fetch(`http://localhost:3001/api/v1/rooms`)
  .then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json()
  })

const createCurrentDataSet = () => {
  Promise.all([getUserData, getBookingData, getRoomData])
    .then((allData) => {
      const userData = allData[0];
      const bookingData = allData[1].bookings;
      const roomData = allData[2].rooms;

      // create current user
      const today = '2020/02/02';
      // const date = new Date();
      // const today = date.toLocaleDateString();
      const currentUser = new User(userData)

      document.getElementById('headerDate').innerHTML = `${today}`
      userNameSelector.setAttribute('data-userId', currentUser.id)
      userNameSelector.innerHTML = `Hi, ${currentUser.name}`

      // create bookings repo -- filter if customer, don't filter if manager
      const currentUserBookings = bookingData.filter(booking => booking.userID === currentUser.id)
      const userBookingsRepo  = new BookingEngine(currentUserBookings, roomData)

      // put past reservations on page
      const pastBookings = userBookingsRepo.getPastBookings(today)
      console.log(pastBookings)

      let chunk = ''
      pastBookings.forEach(booking => {
        chunk += `
        <article class="content__bookings--item item-container">
          <p class="item-container__item--id">ID: ${booking.id}</p>
          <p class="item-container__item--date">Date: ${booking.date}</p>
          <p class="item-container__item--room-number">Room Number: ${booking.roomNumber}</p>
          <p class="item-container__item--duration">Duration: 1 night</p>
          <button class="item-container__item--room-type" type="button" style="background: #68DF9D">A1</button>
        </article>
      `
      })

      pastBookingsSelector.innerHTML = chunk

      // put current and future reservations on page
      const currentAndFutureBookings = userBookingsRepo.getCurrentAndFutureBookings(today);

      // put total spent on page
      const totalSpent = userBookingsRepo.getTotalSpent();
      document.getElementById('customerTotalSpending').innerHTML = `${totalSpent}`

    })
    .catch(error => console.log(error.message))
}

createCurrentDataSet();

// *** General Functions *** //



// *** Event listeners *** //


