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
})
