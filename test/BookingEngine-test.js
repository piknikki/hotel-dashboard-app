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
        "id": "5fwrgu4i7k55hl746",
        "userID": 40,
        "date": "2020/02/16",
        "dateCode": 20200216,
        "roomNumber": 18,
        "roomServiceCharges": []
      },
      {
        "id": "5fwrgu4i7k55hl749",
        "userID": 40,
        "date": "2020/02/22",
        "dateCode": 20200222,
        "roomNumber": 4,
        "roomServiceCharges": []
      },
      {
        "id": "5fwrgu4i7k55hl74c",
        "userID": 40,
        "date": "2020/02/21",
        "dateCode": 20200221,
        "roomNumber": 3,
        "roomServiceCharges": []
      },
      {
        "id": "5fwrgu4i7k55hl74d",
        "userID": 40,
        "date": "2020/02/13",
        "dateCode": 20200213,
        "roomNumber": 6,
        "roomServiceCharges": []
      },
      {
        "id": "5fwrgu4i7k55hl74e",
        "userID": 40,
        "date": "2020/02/09",
        "dateCode": 20200209,
        "roomNumber": 8,
        "roomServiceCharges": []
      },
      {
        "id": "5fwrgu4i7k55hl74h",
        "userID": 40,
        "date": "2020/02/17",
        "dateCode": 20200217,
        "roomNumber": 25,
        "roomServiceCharges": []
      },
      {
        "id": "5fwrgu4i7k55hl74j",
        "userID": 40,
        "date": "2020/02/25",
        "dateCode": 20200225,
        "roomNumber": 12,
        "roomServiceCharges": []
      },
      {
        "id": "5fwrgu4i7k55hl74k",
        "userID": 40,
        "date": "2020/02/18",
        "dateCode": 20200218,
        "roomNumber": 12,
        "roomServiceCharges": []
      },
      {
        "id": "5fwrgu4i7k55hl74m",
        "userID": 40,
        "date": "2020/02/08",
        "dateCode": 20200208,
        "roomNumber": 20,
        "roomServiceCharges": []
      },
      {
        "id": "5fwrgu4i7k55hl74p",
        "userID": 40,
        "date": "2020/02/08",
        "dateCode": 20200208,
        "roomNumber": 3,
        "roomServiceCharges": []
      },
      {
        "id": "5fwrgu4i7k55hl74s",
        "userID": 40,
        "date": "2020/02/02",
        "dateCode": 20200202,
        "roomNumber": 6,
        "roomServiceCharges": []
      },
      {
        "id": "5fwrgu4i7k55hl74w",
        "userID": 40,
        "date": "2020/02/26",
        "dateCode": 20200226,
        "roomNumber": 1,
        "roomServiceCharges": []
      },
      {
        "id": "5fwrgu4i7k55hl750",
        "userID": 40,
        "date": "2020/02/07",
        "dateCode": 20200207,
        "roomNumber": 25,
        "roomServiceCharges": []
      },
      {
        "id": "5fwrgu4i7k55hl764",
        "userID": 40,
        "date": "2020/02/17",
        "dateCode": 20200217,
        "roomNumber": 17,
        "roomServiceCharges": []
      },
      {
        "id": "5fwrgu4i7k55hl765",
        "userID": 40,
        "date": "2020/02/23",
        "dateCode": 20200223,
        "roomNumber": 10,
        "roomServiceCharges": []
      }
    ]);
  });

  it('should find no future bookings if no future bookings exist', () => {
    expect(bookingsRepo1.getCurrentAndFutureBookings('2021/02/02')).to.deep.equal([]);
  });

  it('should find past bookings', () => {
    expect(bookingsRepo1.getPastBookings('2020/02/01')).to.deep.equal([
      {
        "id": "5fwrgu4i7k55hl747",
        "userID": 40,
        "date": "2020/01/31",
        "dateCode": 20200131,
        "roomNumber": 13,
        "roomServiceCharges": []
      },
      {
        "id": "5fwrgu4i7k55hl748",
        "userID": 40,
        "date": "2020/01/09",
        "dateCode": 20200109,
        "roomNumber": 15,
        "roomServiceCharges": []
      },
      {
        "id": "5fwrgu4i7k55hl74g",
        "userID": 40,
        "date": "2020/01/12",
        "dateCode": 20200112,
        "roomNumber": 11,
        "roomServiceCharges": []
      },
      {
        "id": "5fwrgu4i7k55hl74i",
        "userID": 40,
        "date": "2020/01/13",
        "dateCode": 20200113,
        "roomNumber": 15,
        "roomServiceCharges": []
      },
      {
        "id": "5fwrgu4i7k55hl74l",
        "userID": 40,
        "date": "2020/01/22",
        "dateCode": 20200122,
        "roomNumber": 6,
        "roomServiceCharges": []
      },
      {
        "id": "5fwrgu4i7k55hl74r",
        "userID": 40,
        "date": "2020/01/14",
        "dateCode": 20200114,
        "roomNumber": 24,
        "roomServiceCharges": []
      },
      {
        "id": "5fwrgu4i7k55hl74u",
        "userID": 40,
        "date": "2020/01/15",
        "dateCode": 20200115,
        "roomNumber": 15,
        "roomServiceCharges": []
      },
      {
        "id": "5fwrgu4i7k55hl74v",
        "userID": 40,
        "date": "2020/01/25",
        "dateCode": 20200125,
        "roomNumber": 6,
        "roomServiceCharges": []
      },
      {
        "id": "5fwrgu4i7k55hl74y",
        "userID": 40,
        "date": "2020/01/26",
        "dateCode": 20200126,
        "roomNumber": 17,
        "roomServiceCharges": []
      },
      {
        "id": "5fwrgu4i7k55hl74z",
        "userID": 40,
        "date": "2020/01/16",
        "dateCode": 20200116,
        "roomNumber": 3,
        "roomServiceCharges": []
      },
      {
        "id": "5fwrgu4i7k55hl763",
        "userID": 40,
        "date": "2020/01/19",
        "dateCode": 20200119,
        "roomNumber": 5,
        "roomServiceCharges": []
      }
    ]);
  });

});
