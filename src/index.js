import './css/_base.scss';
import './css/styles.scss';
import './images/pouncecat_orange.png';
import './images/pouncecat_white.png';
import './images/eyes.png'

import User from "./User";
import BookingEngine from "./BookingEngine";

// *** Global variables *** //
let globalUserName;
let globalUserId;
let globalDate;
let searchableData;
let roomInfo;
let getUserData;

const loginModalSelector = document.getElementById('loginModal');
const loginContainer = document.getElementById('login');
const loginSubmitButton = document.getElementById('submitLogin');
const inputUsername = document.getElementById('loginUsername')
const inputPassword = document.getElementById('loginPassword')
const logoutModalSelector = document.getElementById('logoutModal');
const logoutContainer = document.getElementById('logout');
const logoutSubmitButton = document.getElementById('submitLogout');

const navDateSelector = document.getElementById('navDate')
const userNameSelector = document.getElementById('userName');

const landingViewSelector = document.getElementById('landingView');
const landingViewImgSelector = document.getElementById('landingViewImg')
const customerViewSelector = document.getElementById('customerView')
const managerViewSelector = document.getElementById('managerView')
const dashboardContentSelector = document.getElementById('dashboardContent')

const pastButton = document.getElementById('pastButton');
const futureButton = document.getElementById('futureButton');
const spendingButton = document.getElementById('spendingButton');
const newReservationButton = document.getElementById('newReservationButton');
const futureBookingsSection = document.getElementsByClassName('content__future')[0];
const pastBookingsSection = document.getElementsByClassName('content__past')[0];
const spendingSection = document.getElementsByClassName('content__spending')[0];
const newReservationSection = document.getElementsByClassName('content__new-reservation')[0];
const availableRoomsSection = document.getElementsByClassName('content__available-rooms')[0];
const availableRoomsSelector = document.getElementById('availableRooms');
const formSelector = document.getElementById('form');
const newBookingCancelButton = document.getElementById('newBookingCancel');
const newBookingSubmitButton = document.getElementById('newBookingSubmit');
const feedbackSelector = document.getElementById('feedback');
const apologiesSelector = document.getElementById('apologies');
const availabilityContentButton = document.getElementById('availabilityContentButton')
const revenueButton = document.getElementById('revenueButton')
const newReservationButtonManager = document.getElementById('newReservationButtonManager')
const revenueSection = document.getElementsByClassName('content__revenue')[0];
const contentFutureSection = document.getElementById('contentFuture')
const gaugeElement = document.querySelector('.gauge');

// *** Build page *** //

/// GET booking info -- do this immediately
let getBookingData =
  fetch(`http://localhost:3001/api/v1/bookings`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json()
    })


/// GET room info -- do this immediately, only need once
const getRoomData =
  fetch(`http://localhost:3001/api/v1/rooms`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json()
    })

const updateUserData = () => {
  getUserData =
    fetch(`http://localhost:3001/api/v1/customers/${globalUserId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json()
      })
}

const updateBookingData = () => {
  getBookingData =
    fetch(`http://localhost:3001/api/v1/bookings`)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json()
      })
}

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
      console.log(response.json)
      displaySuccess()

      return response.json()
    })
    .then(() => {
      updateBookingData()
      createCurrentDataSet(globalDate)
      updateCustomerView()
    })
    .catch(error => {
      if (error.message === "Unprocessable Entity") {
        feedbackSelector.innerHTML = `You must fill in all the blanks`
      }
      console.log(error.number)
      console.log(error.message)
    })
}

const createCurrentDataSet = (today) => {
  Promise.all([getUserData, getBookingData, getRoomData])
    .then((allData) => {

      const userData = allData[0];
      const bookingData = allData[1].bookings;
      const roomData = allData[2].rooms;

      searchableData = bookingData;
      roomInfo = roomData;

      if (userData !== undefined) {
        const currentUser = new User(userData)
        createCustomerInfo(currentUser, today, bookingData, roomData)

      } else if (userData === undefined) {
        const allBookingsRepo  = new BookingEngine(bookingData, roomData)
        createManagerInfo(allBookingsRepo, today)

      }
    })
    .catch(error => console.log(error.message))
}

// *** General Functions *** //
const hide = (element) => element.classList.add('hidden');
const display = (element) => element.classList.remove('hidden');

const createManagerInfo = (allBookingsRepo, today) => {
  const todaysRoomsNotBooked = allBookingsRepo.getRoomsNotBooked(today)
  const totalRevenue = allBookingsRepo.getTotalRevenueForYear(today)

  const options2 = { style: 'currency', currency: 'USD' };
  const numberFormat2 = new Intl.NumberFormat('en-US', options2);

  document.getElementById('managerRevenue').innerText = `${numberFormat2.format(totalRevenue)}`
  const percentageOccupiedToday = (25 - todaysRoomsNotBooked.length) / 25
  setGaugeValue(gaugeElement, percentageOccupiedToday);

  displayAvailableRooms(todaysRoomsNotBooked, today)
}

const createCustomerInfo = (currentUser, today, bookingData, roomData) => {
  document.getElementById('navDate').innerHTML = `${today}`
  userNameSelector.setAttribute('data-userId', currentUser.id)
  userNameSelector.innerHTML = `Hi, ${currentUser.name}`

  const currentUserBookings = bookingData.filter(booking => booking.userID === currentUser.id)
  const userBookingsRepo  = new BookingEngine(currentUserBookings, roomData)

  updateCustomerView(userBookingsRepo, today)
}

const updateCustomerView = (userBookingsRepository, today) => {
  const pastBookings = userBookingsRepository.getPastBookings(today)
  pastBookings.sort((a, b) => b.dateCode - a.dateCode)

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
  document.getElementById('pastBookings').innerHTML = pastChunk

  const currentAndFutureBookings = userBookingsRepository.getCurrentAndFutureBookings(today);
  currentAndFutureBookings.sort((a, b) => a.dateCode - b.dateCode)

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

  document.getElementById('futureBookings').innerHTML = futureChunk

  const totalSpent = userBookingsRepository.getTotalSpent();

  const options2 = { style: 'currency', currency: 'USD' };
  const numberFormat2 = new Intl.NumberFormat('en-US', options2);

  document.getElementById('customerTotalSpending').innerHTML = `${numberFormat2.format(totalSpent)}`
}

const showFutureSection = () => {
  display(futureBookingsSection)
  hide(spendingSection)
  hide(newReservationSection)
  hide(pastBookingsSection)
  hide(availableRoomsSection)
}

const showAvailabilitySection = (event) => {
  event.preventDefault()
  hide(futureBookingsSection)
  hide(newReservationSection)
  hide(spendingSection)
  hide(pastBookingsSection)
  display(availableRoomsSection)
}

const showPastSection = () => {
  hide(futureBookingsSection)
  hide(spendingSection)
  hide(newReservationSection)
  display(pastBookingsSection)
  hide(availableRoomsSection)
}

const showSpendingSection = () => {
  hide(futureBookingsSection)
  display(spendingSection)
  hide(newReservationSection)
  hide(pastBookingsSection)
  hide(availableRoomsSection)
}

const showMGRRevenueSection = (event) => {
  event.preventDefault()
  display(revenueSection)
  hide(newReservationSection)
  hide(availableRoomsSection)
  hide(futureBookingsSection)
}

const showNewResSection = () => {
  hide(revenueSection)
  hide(futureBookingsSection)
  hide(spendingSection)
  display(newReservationSection)
  hide(pastBookingsSection)
  display(availableRoomsSection)
}

const showLandingView = () => {
  if (globalUserName === null) {
    navDateSelector.innerText = ''
    userNameSelector.innerText = ''
  }

  display(landingViewSelector)
  display(landingViewImgSelector)
  hide(customerViewSelector)
  hide(managerViewSelector)
}

const showCustomerView = () => {
  hide(landingViewSelector)
  hide(landingViewImgSelector)
  display(customerViewSelector)
  hide(managerViewSelector)
  hide(loginModalSelector)
  display(logoutModalSelector)
  display(dashboardContentSelector)
  display(contentFutureSection)
}

const showManagerView = () => {
  hide(landingViewSelector)
  hide(landingViewImgSelector)
  hide(contentFutureSection)
  hide(customerViewSelector)
  display(managerViewSelector)
  hide(loginModalSelector)
  display(logoutModalSelector)
  display(dashboardContentSelector)
}

const resetForm = () => {
  formSelector.reset()
}

const displaySuccess = () => {
  resetForm()
  availableRoomsSelector.innerHTML = ''
  feedbackSelector.innerHTML = `<div class="success-box">Your booking has been made successfully. </div>`
}

const displayAvailableRooms = (roomsAvailable, searchDate) => {
  availableRoomsSection.classList.remove('hidden')

  if (roomsAvailable.length === 0) {
    feedbackSelector.innerText = ''
    apologiesSelector.innerHTML = `
    <div class="apologies-box">
      We are so sorry, but there are no rooms available for 
      your search criteria. Please try different dates or room types.
    </div>
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
            
            <button class="room-container__item--submit cf" 
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

function setGaugeValue(gauge, value) {
  if (value < 0 || value > 1) {
    return;
  }

  gauge.querySelector('.gauge__fill').style.transform = `rotate(${value / 2}turn)`
  gauge.querySelector('.gauge__cover').textContent = `${Math.round(value * 100)}%`
}

pastButton.addEventListener('click', showPastSection)
futureButton.addEventListener('click', showFutureSection)
spendingButton.addEventListener('click', showSpendingSection)
newReservationButton.addEventListener('click', showNewResSection)
newBookingCancelButton.addEventListener('click', resetForm)

availabilityContentButton.addEventListener('click', showAvailabilitySection)
revenueButton.addEventListener('click', showMGRRevenueSection)
newReservationButtonManager.addEventListener('click', showNewResSection)

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
})


availableRoomsSection.addEventListener('click', (event) => {
  event.preventDefault();

  const roomSelectedNewRes = event.target.getAttribute('data-id');
  const dateSelectedNewRes = event.target.getAttribute('data-date');

  const newBooking = {
    "id": String(new Date().valueOf()),
    "userID": Number(globalUserId),
    "date": dateSelectedNewRes,
    "roomNumber": Number(roomSelectedNewRes)
  }

  sendBookingData(newBooking)
})

// todo ==> finish modals
loginModalSelector.addEventListener('click', (event) => {
  event.preventDefault()
  // display modal
  display(loginContainer)
})

loginSubmitButton.addEventListener('click', (event) => {
  event.preventDefault()

  document.querySelector('.date').classList.remove('hidden')
  document.querySelector('.user').classList.remove('hidden')
  const date = new Date().toISOString();
  const dateStr = date.split('T');
  let today = dateStr[0].split('-').join('/')

  if (inputUsername.value[0] === 'c' && inputPassword.value === 'overlook2021') {
    globalUserName = inputUsername.value
    globalUserId = globalUserName.slice(8)
    globalDate = today

    updateUserData()
    createCurrentDataSet(today);

    hide(loginContainer)
    showCustomerView()
  } else if (inputUsername.value[0] === 'm' && inputPassword.value === 'overlook2021') {
    navDateSelector.innerHTML = `${today}`
    userNameSelector.innerHTML = `Hi, Manager`

    createCurrentDataSet(today);

    hide(loginContainer)
    showManagerView()
  } else {
    // todo ==>do some error handling
    console.log("SOMETHING IS VERY WRONG")
    // show a message somewhere and reset the login form
    // either username or password were wrong, try again
  }
})

logoutModalSelector.addEventListener('click', (event) => {
  event.preventDefault()
  display(logoutContainer)
  display(logoutModalSelector)
})

logoutSubmitButton.addEventListener('click', (event) => {
  event.preventDefault()

  hide(logoutModalSelector)
  hide(logoutContainer)
  hide(logoutSubmitButton)
  display(loginModalSelector)
  globalUserName = null;
  showLandingView();
  navDateSelector.innerHTML = ''
  userNameSelector.innerHTML = ''
  document.querySelector('.date').classList.add('hidden')
  document.querySelector('.user').classList.add('hidden')
})





