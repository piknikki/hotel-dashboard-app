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

  xit('should be able to calculate total cost of bookings', () => {
    console.log("TEST FILE", bookingsRepo1.rooms)
    expect(bookingsRepo1.getTotalSpent()).to.equal(5555.00)
  })

  it('should find bookings if future bookings exist', () => {
    expect(bookingsRepo1.getCurrentAndFutureBookings('2020/02/02')).to.deep.equal([
      {
        "bedSize": "twin",
        "bidet": false,
        "costPerNight": 172.09,
        "date": "2020/02/18",
        "dateCode": 20200218,
        "id": "5fwrgu4i7k55hl74k",
        "numBeds": 2,
        "number": 12,
        "roomNumber": 12,
        "roomServiceCharges": [],
        "roomType": "single room",
        "userID": 40
      },
      {
        "bedSize": "king",
        "bidet": false,
        "costPerNight": 491.14,
        "date": "2020/02/08",
        "dateCode": 20200208,
        "id": "5fwrgu4i7k55hl74p",
        "numBeds": 1,
        "number": 3,
        "roomNumber": 3,
        "roomServiceCharges": [],
        "roomType": "single room",
        "userID": 40
      },
      {
        "bedSize": "queen",
        "bidet": true,
        "costPerNight": 397.02,
        "date": "2020/02/02",
        "dateCode": 20200202,
        "id": "5fwrgu4i7k55hl74s",
        "numBeds": 1,
        "number": 6,
        "roomNumber": 6,
        "roomServiceCharges": [],
        "roomType": "junior suite",
        "userID": 40
      },
      {
        "bedSize": "queen",
        "bidet": true,
        "costPerNight": 358.4,
        "date": "2020/02/26",
        "dateCode": 20200226,
        "id": "5fwrgu4i7k55hl74w",
        "numBeds": 1,
        "number": 1,
        "roomNumber": 1,
        "roomServiceCharges": [],
        "roomType": "residential suite",
        "userID": 40
      },
      {
        "bedSize": "twin",
        "bidet": false,
        "costPerNight": 328.15,
        "date": "2020/02/17",
        "dateCode": 20200217,
        "id": "5fwrgu4i7k55hl764",
        "numBeds": 2,
        "number": 17,
        "roomNumber": 17,
        "roomServiceCharges": [],
        "roomType": "junior suite",
        "userID": 40
      },
      {
        "bedSize": "twin",
        "bidet": false,
        "costPerNight": 497.64,
        "date": "2020/02/23",
        "dateCode": 20200223,
        "id": "5fwrgu4i7k55hl765",
        "numBeds": 1,
        "number": 10,
        "roomNumber": 10,
        "roomServiceCharges": [],
        "roomType": "suite",
        "userID": 40
      }
    ]);
  });

  it('should find no future bookings if no future bookings exist', () => {
    expect(bookingsRepo1.getCurrentAndFutureBookings('2021/02/02')).to.deep.equal([]);
  });

  it('should find past bookings', () => {
    expect(bookingsRepo1.getPastBookings('2020/02/01')).to.deep.equal([
      {
        "bedSize": "queen",
        "bidet": false,
        "costPerNight": 423.92,
        "id": "5fwrgu4i7k55hl747",
        "numBeds": 2,
        "number": 13,
        "userID": 40,
        "date": "2020/01/31",
        "dateCode": 20200131,
        "roomNumber": 13,
        "roomType": "single room",
        "roomServiceCharges": []
      },
      {
        "bedSize": "full",
        "bidet": false,
        "costPerNight": 294.56,
        "date": "2020/01/09",
        "dateCode": 20200109,
        "id": "5fwrgu4i7k55hl748",
        "numBeds": 1,
        "number": 15,
        "roomNumber": 15,
        "roomServiceCharges": [],
        "roomType": "residential suite",
        "userID": 40
      },
      {
        "bedSize": "twin",
        "bidet": true,
        "costPerNight": 207.24,
        "date": "2020/01/12",
        "dateCode": 20200112,
        "id": "5fwrgu4i7k55hl74g",
        "numBeds": 2,
        "number": 11,
        "roomNumber": 11,
        "roomServiceCharges": [],
        "roomType": "single room",
        "userID": 40
      },
      {
        "bedSize": "full",
        "bidet": false,
        "costPerNight": 294.56,
        "date": "2020/01/13",
        "dateCode": 20200113,
        "id": "5fwrgu4i7k55hl74i",
        "numBeds": 1,
        "number": 15,
        "roomNumber": 15,
        "roomServiceCharges": [],
        "roomType": "residential suite",
        "userID": 40
      },
      {
        "bedSize": "queen",
        "bidet": true,
        "costPerNight": 397.02,
        "date": "2020/01/22",
        "dateCode": 20200122,
        "id": "5fwrgu4i7k55hl74l",
        "numBeds": 1,
        "number": 6,
        "roomNumber": 6,
        "roomServiceCharges": [],
        "roomType": "junior suite",
        "userID": 40
      },
      {
        "bedSize": "full",
        "bidet": false,
        "costPerNight": 294.56,
        "date": "2020/01/15",
        "dateCode": 20200115,
        "id": "5fwrgu4i7k55hl74u",
        "numBeds": 1,
        "number": 15,
        "roomNumber": 15,
        "roomServiceCharges": [],
        "roomType": "residential suite",
        "userID": 40
      },
      {
        "bedSize": "queen",
        "bidet": true,
        "costPerNight": 397.02,
        "date": "2020/01/25",
        "dateCode": 20200125,
        "id": "5fwrgu4i7k55hl74v",
        "numBeds": 1,
        "number": 6,
        "roomNumber": 6,
        "roomServiceCharges": [],
        "roomType": "junior suite",
        "userID": 40
      },
      {
        "bedSize": "twin",
        "bidet": false,
        "costPerNight": 328.15,
        "date": "2020/01/26",
        "dateCode": 20200126,
        "id": "5fwrgu4i7k55hl74y",
        "numBeds": 2,
        "number": 17,
        "roomNumber": 17,
        "roomServiceCharges": [],
        "roomType": "junior suite",
        "userID": 40
      },

    ]);
  });

});