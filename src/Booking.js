class Booking {
  constructor(newBooking) {
    this.id = newBooking.id
    this.userID = newBooking.userID
    this.date = newBooking.date
    this.roomNumber = newBooking.roomNumber
    this.roomServiceCharges = newBooking.roomServiceCharges
  }
}

export default Booking;
