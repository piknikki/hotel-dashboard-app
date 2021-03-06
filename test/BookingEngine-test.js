import { expect } from 'chai';
import BookingEngine from '../src/BookingEngine';
import bookingsTestData from "./booking-testdata";
import Booking from "../src/Booking";

describe('BookingEngine', function() {
  let bookingsRepo1;

  beforeEach(() => {
    const testData = bookingsTestData.forEach(bookingTestItem => new Booking(bookingTestItem))
    bookingsRepo1 = new BookingEngine(testData)
  })

  it('should instantiate a new repository of bookings', () => {
    expect(bookingsRepo1).to.exist;
  });

  it('should not be empty', () => {
    expect(bookingsRepo1).to.have.length(20)
  })
});
