import React, { Component, ReactElement } from 'react'
import './style.css'

class Home extends Component {
  render(): ReactElement {
    return (
      <div id='sideNav'>
        <ul>
          <li className='sideNav-userName'>
            <h3>Hi, Sunny!</h3>
          </li>
          <li>
            <a className='active' href='#home'>
              Home
            </a>
          </li>
          <li>
            <a href='#news'>Course Slides</a>
          </li>
          <li>
            <a href='#contact'>Grades</a>
          </li>
          <li>
            <a href='#about'>Settings</a>
          </li>
        </ul>
      </div>
    )
  }
}

export default Home
