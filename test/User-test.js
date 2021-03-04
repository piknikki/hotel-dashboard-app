import { expect } from 'chai';
import User from '../src/User';
import customersTestData from './customer-testdata';

describe('User', function() {
  let user1;
  beforeEach(() => {
    user1 = new User(customersTestData[0])
  })

  it('should instantiate a new user', () => {
    expect(user1).to.exist;
  });

  it('should have a new user name and id', () => {
    expect(user1).to.deep.equal(  {
      "id": 1,
      "name": "Leatha Ullrich"
    })
  })

  it('find user past bookings', () => {

  })

  it('find user current and future bookings', () => {

  })
});
