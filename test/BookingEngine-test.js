import { expect } from 'chai';
import BookingEngine from '../src/BookingEngine';
import bookingsTestData from "./booking-testdata";
import roomsTestData from "./room-testdata";

describe('BookingEngine', function() {
  let bookingsRepo1;

  beforeEach(() => {
    bookingsRepo1 = new BookingEngine(bookingsTestData, roomsTestData)
  })

  it('should instantiate a new repository of bookings', () => {
    expect(bookingsRepo1).to.exist;
  });

  it('should be able to calculate total cost of bookings', () => {
    console.log("TEST FILE", bookingsRepo1.rooms)
    expect(bookingsRepo1.getTotalSpent()).to.equal(5555.00)
  })
});
