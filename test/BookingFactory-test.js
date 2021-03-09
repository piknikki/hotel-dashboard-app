import { expect } from 'chai';

import bookingsTestData from "./booking-testdata";
import roomsTestData from "./room-testdata";
import BookingFactory from "../src/BookingFactory";

describe('BookingFactory', function() {
  let booking1;

  beforeEach(() => {
    booking1 = new BookingFactory(bookingsTestData[0], roomsTestData[12])
  })

  it('should instantiate a new booking object', () => {
    expect(booking1).to.exist;
  });

  it('should create a new object with the given booking and room info', () => {

    expect(booking1.booking).to.deep.equal({
      "id": "5fwrgu4i7k55hl747",
      "userID": 40,
      "date": "2020/01/31",
      "dateCode": 20200131,
      "roomNumber": 13,
      "roomServiceCharges": [],
      "number": 13,
      "roomType": "single room",
      "bidet": false,
      "bedSize": "queen",
      "numBeds": 2,
      "costPerNight": 423.92
    })
  })

});
