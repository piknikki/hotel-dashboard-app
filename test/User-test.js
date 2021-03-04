import { expect } from 'chai';
import User from '../src/User';

describe('User', function() {
  let user;
  beforeEach(() => {
    user = new User('customer50')
  })

  it('should instantiate a new user', function() {
    expect(user).to.exist;
  });
});
