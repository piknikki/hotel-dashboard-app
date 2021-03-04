class User {
  constructor(newUser, bookings) {
    // gets passed in when fetch gets it from api call
    this.id = newUser.id
    this.name = newUser.name
    this.allBookings = bookings //array of bookings where newUser.id === booking.userID
  }

  findPastBookings() {
    this.allBookings.filter()
  }
}

export default User;
