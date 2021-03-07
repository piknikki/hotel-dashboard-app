import './css/_base.scss';
import './css/styles.scss';
import './images/pouncecat_orange.png';
import './images/pouncecat_white.png';

import User from "./User";
import BookingEngine from "./BookingEngine";

// *** Global variables *** //
const userName = 'customer49'
// todo => this will come from the login input not sure where it will live yet
const userId = userName.slice(8);

const userNameSelector = document.getElementById('userName');
const pastBookingsSelector = document.getElementById('pastBookings');
const futureBookingsSelector = document.getElementById('futureBookings');
const pastButton = document.getElementById('pastButton');
const futureButton = document.getElementById('futureButton');
const spendingButton = document.getElementById('spendingButton');
const newReservationButton = document.getElementById('newReservationButton');


const futureBookingsSection = document.getElementsByClassName('content__future')[0];
const pastBookingsSection = document.getElementsByClassName('content__past')[0];
const spendingSection = document.getElementsByClassName('content__spending')[0];
const newReservationSection = document.getElementsByClassName('content__new-reservation')[0];
const availableRoomsSection = document.getElementsByClassName('content__available-Rooms')[0];
const availableRoomsSelector = document.getElementById('availableRooms');
const formSelector = document.getElementById('form');
const newBookingCancelButton = document.getElementById('newBookingCancel');
const newBookingSubmitButton = document.getElementById('newBookingSubmit');
const feedbackSelector = document.getElementById('feedback');
const apologiesSelector = document.getElementById('apologies');


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

let searchableData;
let roomInfo;

/// POST new booking
const sendBookingData = (inputBookingData) => {
  fetch('http://localhost:3001/api/v1/bookings', {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(inputBookingData)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      displaySuccess()
      return response.json()
    })
    .catch(error => {
      if (error.message === "Unprocessable Entity") {
        feedbackSelector.innerHTML = `You must fill in all the blanks`
      }
      console.log(error.number)
      console.log(error.message)
    })
}

const createCurrentDataSet = () => {
  Promise.all([getUserData, getBookingData, getRoomData])
    .then((allData) => {
      const userData = allData[0];
      const bookingData = allData[1].bookings;
      const roomData = allData[2].rooms;

      searchableData = bookingData;
      roomInfo = roomData;

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
      const pastBookings = userBookingsRepo.getPastBookings(today) // todo ==> sort these

      let pastChunk = ''
      pastBookings.forEach(booking => {
        const roomTypeSlug = booking.roomType.split(' ').join('-');

          pastChunk += `
          <article class="content__bookings--item item-container">
            <p class="item-container__item--id">ID: ${booking.id}</p>
            <p class="item-container__item--date">Date: ${booking.date}</p>
            <p class="item-container__item--room-number">Room Number: ${booking.roomNumber}</p>
            <p class="item-container__item--duration">Duration: 1 night</p>
            <button class="item-container__item--room-type ${roomTypeSlug}" type="button">${booking.roomType}</button>
          </article>
        `
      })

      pastBookingsSelector.innerHTML = pastChunk

      // put current and future reservations on page
      const currentAndFutureBookings = userBookingsRepo.getCurrentAndFutureBookings(today);  // todo ==> sort these

      let futureChunk = ''
      currentAndFutureBookings.forEach(booking => {
        const roomTypeSlug = booking.roomType.split(' ').join('-');

        futureChunk += `
          <article class="content__bookings--item item-container">
            <p class="item-container__item--id">ID: ${booking.id}</p>
            <p class="item-container__item--date">Date: ${booking.date}</p>
            <p class="item-container__item--room-number">Room Number: ${booking.roomNumber}</p>
            <p class="item-container__item--duration">Duration: 1 night</p>
            <button class="item-container__item--room-type ${roomTypeSlug}" type="button">${booking.roomType}</button>
          </article>
        `
      })

      futureBookingsSelector.innerHTML = futureChunk

      // put total spent on page
      const totalSpent = userBookingsRepo.getTotalSpent();
      document.getElementById('customerTotalSpending').innerHTML = `${totalSpent.toFixed(2)}`

    })
    .catch(error => console.log(error.message))
}

createCurrentDataSet();

// *** General Functions *** //
const hide = (element) => element.classList.add('hidden');
const display = (element) => element.classList.remove('hidden');

const showPastSection = () => {
  hide(futureBookingsSection)
  hide(spendingSection)
  hide(newReservationSection)
  display(pastBookingsSection)
  hide(availableRoomsSection)
}

const showFutureSection = () => {
  display(futureBookingsSection)
  hide(spendingSection)
  hide(newReservationSection)
  hide(pastBookingsSection)
  hide(availableRoomsSection)
}

const showSpendingSection = () => {
  hide(futureBookingsSection)
  display(spendingSection)
  hide(newReservationSection)
  hide(pastBookingsSection)
  hide(availableRoomsSection)
}

const showNewResSection = () => {
  hide(futureBookingsSection)
  hide(spendingSection)
  display(newReservationSection)
  hide(pastBookingsSection)
}

const resetForm = () => {
  formSelector.reset()
}

const displaySuccess = () => {
  resetForm()
  availableRoomsSelector.innerHTML = ''
  // todo => also show the details of the booking
  feedbackSelector.innerHTML = `<h3>Your booking has been made successfully. </h3>
    `

}

const displayAvailableRooms = (roomsAvailable, searchDate) => {
  availableRoomsSection.classList.remove('hidden')

  if (roomsAvailable.length === 0) {
    feedbackSelector.innerText = ''
    apologiesSelector.innerHTML = `
      We are so sorry, but there are no rooms available for 
      your search criteria. Please try different dates or room types.
      `
  }

  let availChunk = ''

  roomsAvailable.forEach(room => {
    const roomTypeSlug = room.roomType.split(' ').join('-');
    availChunk += `
          <article class="content__bookings--item room-container" id="roomContainer">
          <div class="room-container__item--room-type ${roomTypeSlug}" >${room.roomType}</div>
            <p class="room-container__item--number">Room Number: ${room.number}</p>
            <p class="room-container__item--bed-size">Bed Size: ${room.bedSize}</p>
            <p class="room-container__item--num-beds">Number of Beds: ${room.numBeds}</p>
            <p class="room-container__item--bidet">Has Bidet? ${room.bidet}</p>
            <p class="room-container__item--cost-per-night">Cost per Night: $ ${room.costPerNight}</p>
            
            <button class="room-container__item--submit" 
              id="selectRoom" 
              data-id="${room.number}" 
              data-date="${searchDate}">
            Select this room
            </button>
          </article>
        `
  })
  availableRoomsSelector.innerHTML = availChunk
}

const displayNewBookingInfo = () => {
  // todo ==> do this, to display after the booking has been successful
}


// *** Event listeners *** //

pastButton.addEventListener('click', showPastSection)
futureButton.addEventListener('click', showFutureSection)
spendingButton.addEventListener('click', showSpendingSection)
newReservationButton.addEventListener('click', showNewResSection)
newBookingCancelButton.addEventListener('click', resetForm)
newBookingSubmitButton.addEventListener('click', (event) => {
  event.preventDefault();

  document.querySelector('#apologies').innerHTML = ''
  const searchDate = (document.getElementById('inputDate').value).split('-').join('/');

  const roomsBooked = searchableData.filter(booking => booking.date === searchDate).map(booking => booking.roomNumber)
  const dropdownSelection = document.getElementById('typesSelector').value

  let roomsAvailable = roomInfo.filter(room => {
    if (!roomsBooked.includes(room.number)) {
      return room
    }
  })

  if (dropdownSelection !== 'none') {
    roomsAvailable = roomsAvailable.filter(room => room.roomType === dropdownSelection.split('-').join(' '))
  }

  displayAvailableRooms(roomsAvailable, searchDate)
  // formSelector.reset()
})


availableRoomsSection.addEventListener('click', (event) => {
  event.preventDefault();

  const roomSelectedNewRes = event.target.getAttribute('data-id');
  const dateSelectedNewRes = event.target.getAttribute('data-date');

  const newBooking = {
    "id": String(new Date().valueOf()),
    "userID": Number(userId),
    "date": dateSelectedNewRes,
    "roomNumber": Number(roomSelectedNewRes)
  }

  sendBookingData(newBooking)
})

const loginModalSelector = document.getElementById('loginModal');
const loginContainer = document.getElementById('login');
const loginSubmitButton = document.getElementById('submitLogin');

const logoutModalSelector = document.getElementById('logoutModal');
const logoutContainer = document.getElementById('logout');
const logoutSubmitButton = document.getElementById('submitLogout');

loginModalSelector.addEventListener('click', (event) => {
  event.preventDefault()
  // display modal
  display(loginContainer)
})

loginSubmitButton.addEventListener('click', (event) => {
  event.preventDefault()

  // collect form data of name and password

  // do some error handling
  // send form data to global??
  hide(loginContainer)

  // display either manager view or customer view
})

logoutModalSelector.addEventListener('click', (event) => {
  event.preventDefault()
  // display modal
  display(logoutContainer)
})

logoutSubmitButton.addEventListener('click', (event) => {
  event.preventDefault()

  // display(homeView)
})




















