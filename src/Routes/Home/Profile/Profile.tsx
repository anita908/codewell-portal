import React, { Component, ReactElement } from 'react'
import profileIllustration from '../../../images/profile.svg'
import './style.css'

class Home extends Component {
  render(): ReactElement {
    return (
      <div id='profile'>
        <div className='profile-header'>
          <h3>My Profile</h3>
          <img alt='login' className='login' src={profileIllustration} />
        </div>
        <div className='profile-content'>
          Hi <span className='profile-studentName'>Sunny!</span> Great job on completing the
          Function Lesson! Keep up the great work :)
        </div>
      </div>
    )
  }
}

export default Home
