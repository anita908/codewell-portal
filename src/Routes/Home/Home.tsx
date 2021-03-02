import React, { Component, ReactElement } from 'react'
import './style.css'

class Home extends Component {
  render(): ReactElement {
    return (
      <div id='home'>
        <div className='home-sideNav'>
          <ul>
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
        <div className='home-profile'>Your Profile</div>
      </div>
    )
  }
}

export default Home
