class BookingEngine {
  constructor(bookings, rooms) {
    this.bookings = bookings
    this.rooms = rooms
  }

  createDateCode() {
    return this.bookings.map(booking => {
      const dateCode = Number(booking.date.split('/').join(''))
      booking.dateCode = dateCode
    })
  }

  getCurrentAndFutureBookings(currentDate) {
    const dateCode = Number(currentDate.split('/').join(''))
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


  getTodaysBookings(todaysDate) {
    const dateCode = Number(todaysDate.split('/').join(''))
    this.createDateCode()

    // todo ==> need to find the available rooms. rooms without a booking.
    //  currently I am returning all bookings for todday, but that's not what I need
    const todaysBookings = this.bookings.filter(booking => booking.dateCode === dateCode)

    return todaysBookings.reduce((acc, booking) => {
      const roomAndBookingInfo = {
        ...booking,
        ...this.rooms.find(room => room.number === booking.roomNumber)
      }

      return [...acc, roomAndBookingInfo]
    }, [])
  }
}

export default BookingEngine;
