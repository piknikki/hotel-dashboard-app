class User {
  constructor(newUser) {
    // gets passed in when fetch gets it from api call
    this.id = newUser.id
    this.name = newUser.name

  }
}

export default User;
