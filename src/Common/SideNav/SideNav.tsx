import React, { Component, ReactElement } from 'react'
import { Link } from 'react-router-dom'
import './style.css'

type Props = {
  name: string
}

class SideNav extends Component<Props, {}> {
  render(): ReactElement {
    const { name } = this.props
    return (
      <div id='sideNav'>
        <ul>
          <li className='sideNav-userName'>
            <h3>{name ? `Hi, ${name}!` : 'Hi!'}</h3>
          </li>
          <li>
            <Link
              className='active'
              to={{
                pathname: `/`
              }}
            >
              Home
            </Link>
          </li>
          <li>
            <a href='#'>Course Slides</a>
          </li>
          <li>
            <a href='#'>Grades</a>
          </li>
          <li>
            <a href='#'>Assignments</a>
          </li>
          <li>
            <a href='#'>Settings</a>
          </li>
          <li>
            <a href='#'>Log out</a>
          </li>
        </ul>
      </div>
    )
  }
}

export default SideNav
