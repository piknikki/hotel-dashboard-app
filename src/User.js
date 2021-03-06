class User {
  constructor(newUser) {
    // gets passed in when fetch gets it from api call
    this.id = newUser.id
    this.name = newUser.name
    // this.allBookings = [] //array of bookings where newUser.id === booking.userID
  }

  findPastBookings() {
    // this.allBookings.filter()
  }

  // findFutureBookings

  // find total cost spent

}

export default User;
