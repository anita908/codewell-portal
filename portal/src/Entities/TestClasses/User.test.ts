import User from '../User'

describe('Test user entity', () => {
  it('Should have a name', () => {
    const user = new User('Sunny Yang')
  expect(user.name).toEqual('Sunny Yang')
  })
})