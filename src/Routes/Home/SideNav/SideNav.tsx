import React, { Component, ReactElement } from 'react'
import { redirectLogin } from '../../../Utilities/Url'
import Cookies from '../../../Utilities/Cookies'
import Fetcher from '../../../Drivers/Fetcher'
import ISession from '../Interfaces/ISession'
import LogoutPresenter from '../../Logout/LogoutPresenter'
import './style.css'

type Props = {
  name: string
  session: ISession[]
}

class SideNav extends Component<Props, {}> {
  render(): ReactElement {
    const { name } = this.props
    return (
      <div id='sideNav'>
        <ul>
          <li className='sideNav-userName'>
            <h3>Hi, {name}!</h3>
          </li>
          <li>
            <a className='active' href='#home'>
              Home
            </a>
          </li>
          <li>
            <a href='/courslides'>Course Slides</a>
          </li>
          <li>
            <a href='#contact'>Grades</a>
          </li>
          <li>
            <a href='#about'>Settings</a>
          </li>
          <li>
            <a type='button' className='sideNav-mouseChange' onClick={this.logout}>
              Log out
            </a>
          </li>
        </ul>
      </div>
    )
  }

  logout = (): void => {
    const username = this.props.name
    const logoutPresenter = new LogoutPresenter(new Fetcher())
    logoutPresenter.logout(username)
    Cookies.remove('auth')
    if (typeof window !== 'undefined') {
      window.location.href = redirectLogin
    }
  }
}

export default SideNav
