class BookingEngine {
  constructor(bookings, rooms) {
    this.bookings = bookings
    this.rooms = rooms
  }


  // getPastBookings(date) {
  //
  // }
  //
  // getCurrentAndFutureBookings() {
  //   //today and onward (include bookings currently being occupied)
  // }


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
