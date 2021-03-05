import { expect } from 'chai';
import BookingsRepository from '../src/BookingsRepository';
import bookingsTestData from "./booking-testdata";
import Booking from "../src/Booking";

describe('BookingsRepository', function() {
  let bookingsRepo1;

  beforeEach(() => {
    const testData = bookingsTestData.forEach(bookingTestItem => new Booking(bookingTestItem))
    bookingsRepo1 = new BookingsRepository(testData)
  })

  it('should instantiate a new repository of bookings', () => {
    expect(bookingsRepo1).to.exist;
  });

  it('should not be empty', () => {
    expect(bookingsRepo1).to.have.length(20)
  })
});
