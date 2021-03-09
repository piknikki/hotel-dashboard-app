class BookingFactory {
  constructor(bookingInfo, roomInfo) {
    this.bookingInfo = bookingInfo
    this.room = roomInfo
    this.booking = this.mergeBookingAndRoom()
  }

  mergeBookingAndRoom() {
    const dateCode = Number(this.bookingInfo.date.split('/').join(''))
    return {
      ...this.bookingInfo,
      ...this.room,
      dateCode
    }
  }
}

export default BookingFactory;
