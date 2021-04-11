import React, { Component, Fragment, ReactElement } from 'react'
import { Link } from 'react-router-dom'
import CacheHelper from 'Utilities/CacheHelper'
import Cookies from 'Utilities/Cookies'
import Fetcher from 'Drivers/Fetcher'
import LogoutPresenter from '../../Routes/Logout/LogoutPresenter'
import './style.css'

type Props = {
  pendingTab?: boolean
}

class SideNav extends Component<Props, {}> {
  componentDidMount(): void {
    this.setActiveLink()
  }

  render(): ReactElement {
    const { pendingTab } = this.props
    const name = localStorage.getItem('username')

    return (
      <nav id='sideNav'>
        <ul>
          <li className='sideNav-userName'>
            <h3>{name ? `Hi, ${name}!` : 'Hi!'}</h3>
          </li>
          {!pendingTab && (
            <Fragment>
              <li onClick={this.setActiveLink} className='/'>
                <Link
                  to={{
                    pathname: `/`
                  }}
                >
                  Home
                </Link>
              </li>
              <li onClick={this.setActiveLink} className='courseSlides'>
                <Link
                  to={{
                    pathname: `/courseSlides`
                  }}
                >
                  Course Slides
                </Link>
              </li>
              <li onClick={this.setActiveLink} className='grades'>
                <Link
                  to={{
                    pathname: `/grades`
                  }}
                >
                  Grades
                </Link>
              </li>
              <li onClick={this.setActiveLink} className='settings'>
                <Link
                  to={{
                    pathname: `/settings`
                  }}
                >
                  Settings
                </Link>
              </li>
            </Fragment>
          )}
          <li className='logout'>
            <a type='button' className='sideNav-mouseChange' onClick={this.logout}>
              Log out
            </a>
          </li>
        </ul>
      </nav>
    )
  }

  setActiveLink = (): void => {
    const navList = Array.from(document.querySelectorAll('nav'))
    const linkLists = navList.map((nav) => Array.from(nav.querySelectorAll('li > a')))

    linkLists.forEach((links) => {
      for (let i: number = 0; i < links.length; ++i) {
        if (window.location.pathname === links[i].getAttribute('href')) {
          links[i].classList.add('active')
        }
      }
    })
  }

  logout = async (): Promise<void> => {
    const logoutPresenter = new LogoutPresenter(new Fetcher())

    await logoutPresenter.logout()
    Cookies.remove('auth')
    Cookies.remove('adminAuth')
    CacheHelper.clearCache()

    if (typeof window !== 'undefined') {
      window.location.pathname = '/login'
    }
  }
}

export default SideNav
