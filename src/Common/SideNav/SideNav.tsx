import React, { Component, ReactElement } from 'react'
import { Link } from 'react-router-dom'
import './style.css'

type Props = {
  name: string
}

class SideNav extends Component<Props, {}> {
  componentDidMount(): void {
    this.setActiveLink()
  }

  render(): ReactElement {
    const { name } = this.props
    return (
      <nav id='sideNav'>
        <ul>
          <li className='sideNav-userName'>
            <h3>{name ? `Hi, ${name}!` : 'Hi!'}</h3>
          </li>
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
          <li onClick={this.setActiveLink} className='assignments'>
            <Link
              to={{
                pathname: `/assignments`
              }}
            >
              Assignments
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
          <li onClick={this.setActiveLink} className='logout'>
            <a href='#'>Log out</a>
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
}

export default SideNav
