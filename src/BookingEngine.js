class BookingEngine {
  constructor(bookings, rooms) {
    this.bookings = bookings
    this.rooms = rooms
  }

  createDateCode() {
    // creates datecodes for all existing bookings
    return this.bookings.map(booking => {
      const dateCode = Number(booking.date.split('/').join(''))
      booking.dateCode = dateCode
    })
  }

  getCurrentAndFutureBookings(currentDate) {
    const dateCode = Number(currentDate.split('/').join('')) // creates datecode for just this date
    this.createDateCode()
    const filteredBookings = this.bookings.filter(booking => booking.dateCode >= dateCode)

    return filteredBookings.reduce((acc, booking) => {
      const roomAndBookingInfo = {
        ...booking,
        ...this.rooms.find(room => room.number === booking.roomNumber)
      }

      return [...acc, roomAndBookingInfo]
    }, [])
  }

  getPastBookings(currentDate) {
    const dateCode = Number(currentDate.split('/').join(''))
    this.createDateCode()

    // todo ==> sort both of these searches
    const filteredBookings = this.bookings.filter(booking => booking.dateCode < dateCode)

    return filteredBookings.reduce((acc, booking) => {
      const roomAndBookingInfo = {
        ...booking,
        ...this.rooms.find(room => room.number === booking.roomNumber)
      }

      return [...acc, roomAndBookingInfo]
    }, [])
  }

  getTotalSpent() {
    const roomNumbers = this.bookings.map(booking => booking.roomNumber)

    const userTotalCost = roomNumbers.reduce((acc, roomNumber) => {
      const roomCost = this.rooms.find(room => room.number === roomNumber).costPerNight
      return acc += roomCost
    }, 0)
    return userTotalCost
  }

  getRoomsNotBooked(currentDate) {
    const dateCode = Number(currentDate.split('/').join('')) // creates datecode for just this date
    this.createDateCode()
    const filteredBookings = this.bookings.filter(booking => booking.dateCode === dateCode).map(booking => booking.roomNumber) // bookings for today

    return filteredBookings.reduce((acc, booking) => {
      acc = this.rooms.filter(room => {
        if (!filteredBookings.includes(room.number)) {
          return room
        }
      })

      return  acc
    }, [])
  }

  getTotalRevenueForYear(currentDate) {
    let splitDate = currentDate.split('/')
    const yearDateCode = Number(`${splitDate[0]}0000`)
    const yearDateCodeEnding = yearDateCode + 10000

    const yearBookings = this.getPastBookings(currentDate).filter(booking => booking.dateCode < yearDateCodeEnding)

    return yearBookings.reduce((acc, booking) => {
      return acc += booking.costPerNight
    }, 0)

  }
}

export default BookingEngine;
