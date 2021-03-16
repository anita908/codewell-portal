import React from 'react'
import { render } from '@testing-library/react'
import Login from './Login'

function getContainer() {
  return render(<Login />).container
}

describe('Test login page', () => {
  it('Should have a div with a login id', () => {
    const container = getContainer()
    expect(container.querySelector('#login')).toBeTruthy()
  })

  it('Should have an input box for username', () => {
    const container = getContainer()
    const usernameInput = container.querySelector('#username')
    expect(usernameInput).toBeTruthy()
  })

  it('Should have an input box for password', () => {
    const container = getContainer()
    const passwordInput = container.querySelector('#password')
    expect(passwordInput).toBeTruthy()
  })
})
