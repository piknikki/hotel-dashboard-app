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

    return this.bookings.filter(booking => booking.dateCode >= dateCode)
  }

  getPastBookings(currentDate) {
    const dateCode = Number(currentDate.split('/').join(''))
    this.createDateCode()

    return this.bookings.filter(booking => booking.dateCode <= dateCode)
  }

  getTotalSpent() {
    const roomNumbers = this.bookings.map(booking => booking.roomNumber)

    const userTotalCost = roomNumbers.reduce((acc, roomNumber) => {
      const roomCost = this.rooms.find(room => room.number === roomNumber).costPerNight
      return acc += roomCost
    }, 0)
    return userTotalCost
  }
}

export default BookingEngine;
