import React, { Component, Fragment, ReactElement } from 'react'
import { Link } from 'react-router-dom'
import CacheHelper from '../../Utilities/CacheHelper'
import Cookies from '../../Utilities/Cookies'
import Fetcher from '../../Drivers/Fetcher'
import HamburgerMenu from './HanburgerMenu/HamburgerMenu'
import LogoutPresenter from '../../Routes/Logout/LogoutPresenter'
import './style.css'

type Props = {
  pendingTab?: boolean
  isAdmin?: boolean
  username: string
}

type State = {
  open: boolean
}

class SideNav extends Component<Props, State> {
  state = {
    open: false
  }

  componentDidMount(): void {
    this.setActiveLink()
  }

  render(): ReactElement {
    const isAdmin = this.props.isAdmin || false

    if (isAdmin) {
      return this.renderAdminNav()
    } else {
      return this.renderStudentNav()
    }
  }

  renderAdminNav = (): ReactElement => {
    const { username } = this.props
    const { open } = this.state

    return (
      <nav id='sideNav'>
        <div className='sideNav-icon'>
          <HamburgerMenu open={open} onClick={this.openHamburgerMenu} />
        </div>
        <div className='sideNav-regular-menu'>
          <ul>
            <li className='sideNav-userName'>
              <h3>{username ? `Hi, ${username}!` : 'Hi!'}</h3>
            </li>
            <li onClick={this.setActiveLink} className='/'>
              <Link
                to={{
                  pathname: `/admin`
                }}
              >
                Home
              </Link>
            </li>
            <li onClick={this.setActiveLink} className='students'>
              <Link
                to={{
                  pathname: `/admin/students`
                }}
              >
                Students
              </Link>
            </li>
            <li className='logout'>
              <a type='button' className='sideNav-mouseChange' onClick={this.logout}>
                Log out
              </a>
            </li>
          </ul>
        </div>
        {open && (
          <div className='sideNav-hamburger-menu'>
            <ul>
              <li className='sideNav-userName'>
                <h3>{username ? `Hi, ${username}!` : 'Hi!'}</h3>
              </li>
              <li onClick={this.setActiveLink} className='/'>
                <Link
                  to={{
                    pathname: `/admin`
                  }}
                >
                  Home
                </Link>
              </li>
              <li onClick={this.setActiveLink} className='students'>
                <Link
                  to={{
                    pathname: `/admin/students`
                  }}
                >
                  Students
                </Link>
              </li>
              <li className='logout'>
                <a type='button' className='sideNav-mouseChange' onClick={this.logout}>
                  Log out
                </a>
              </li>
            </ul>
          </div>
        )}
      </nav>
    )
  }

  renderStudentNav = (): ReactElement => {
    const { pendingTab, username } = this.props
    const { open } = this.state

    return (
      <nav id='sideNav'>
        <div className='sideNav-icon'>
          <HamburgerMenu open={open} onClick={this.openHamburgerMenu} />
        </div>
        <div className='sideNav-regular-menu'>
          <ul>
            <li className='sideNav-userName'>
              <h3>{username ? `Hi, ${username}!` : 'Hi!'}</h3>
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
                <li onClick={this.setActiveLink} className='assignment'>
                  <Link
                    to={{
                      pathname: `/assignment`
                    }}
                  >
                    Assignment
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
        </div>
        {open && (
          <div className='sideNav-hamburger-menu'>
            <ul>
              <li className='sideNav-userName'>
                <h3>{username ? `Hi, ${username}!` : 'Hi!'}</h3>
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
          </div>
        )}
      </nav>
    )
  }

  setActiveLink = (): void => {
    this.setState({ open: false })
    const navList = Array.from(document.querySelectorAll('nav'))
    const linkLists = navList.map(nav => Array.from(nav.querySelectorAll('li > a')))
    linkLists.forEach(links => {
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

  openHamburgerMenu = () => {
    if (this.state.open) {
      this.setState({ open: false })
    } else {
      this.setState({ open: true })
    }
  }
}
export default SideNav
