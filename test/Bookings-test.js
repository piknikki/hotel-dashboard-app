import { expect } from 'chai';
import Booking from '../src/Booking';
import bookingsTestData from './booking-testdata';

describe('Booking', function() {
  let booking1;

  beforeEach(() => {
    booking1 = new Booking(bookingsTestData[0])
  })

  it('should instantiate a new booking', () => {
    expect(booking1).to.exist;
  });

  it('should start with all the right information for one booking', () => {
    expect(booking1).to.deep.equal(  {
      "id": "5fwrgu4i7k55hl746",
      "userID": 40,
      "date": "2020/02/16",
      "roomNumber": 18,
      "roomServiceCharges": []
    })
  })
});
