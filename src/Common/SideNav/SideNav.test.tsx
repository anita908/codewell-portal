import { BrowserRouter } from 'react-router-dom'
import { fireEvent, getByText, render } from '@testing-library/react'
import LogoutPresenter from '../../Routes/Logout/LogoutPresenter'
import React from 'react'
import SideNav from './SideNav'

let Props = {
  pendingTab: true,
  isAdmin: true
}

function getContainer() {
  return render(
    <BrowserRouter>
      <SideNav {...Props} />
    </BrowserRouter>
  )
}

jest.mock(`../../Routes/Logout/LogoutPresenter`, () => ({
  LogoutPresenter: jest.fn()
}))

describe('Test IconButton', () => {
  it('Should return renderAdminNav: when isAdmin is true', () => {
    const container = getContainer()
    expect(container).toBeDefined()

    const logOut = container.getByText('Log out')
    fireEvent.click(logOut)
  })
  it('Should simulate openHamburgerMenu', () => {
    global.innerWidth = 300
    const { getByTestId } = getContainer()

    const button = getByTestId('hamburgerMenu-icon')
    fireEvent.click(button)
    fireEvent.click(button)
  })
  it('Should return renderStudentNav: when isAdmin is false, pendingTab is true', () => {
    Props = {
      pendingTab: true,
      isAdmin: false
    }
    const container = getContainer()
    expect(container).toBeDefined()
  })
  it('Should return renderStudentNav: when isAdmin is false, pendingTab is false', () => {
    Props = {
      pendingTab: false,
      isAdmin: false
    }
    const container = getContainer()
    expect(container).toBeDefined()
  })
})
