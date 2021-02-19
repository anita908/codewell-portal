import User from '../User'

describe('Test user entity', () => {
  it('Should have basic user data', () => {
    const userData = {
      name: 'Sunny Yang',
      age: 22,
      email: 'asdf@mail.com', 
      phone: 2342342342,
      username: 'hahasunny',
      isActive: false,
      isAdmin: true
    }
    const user = new User({ name: userData.name, age: userData.age, email: userData.email, phone: userData.phone, username: userData.username, isActive: userData.isActive, isAdmin: userData.isAdmin })
  expect(user.name).toEqual(userData.name)
  expect(user.age).toBe(userData.age)
  expect(user.email).toEqual(userData.email)
  expect(user.phone).toEqual(userData.phone)
  expect(userData.username).toEqual(userData.username)
  expect(userData.isActive).toBe(false)
  expect(userData.isAdmin).toBe(true)
  })
})