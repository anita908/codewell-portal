import React, { Component, ReactElement } from 'react'
import LocalStorageHelper from 'Utilities/LocalStorageHelper'
import profileIllustration from '../../../images/profile.svg'
import './style.css'

class Profile extends Component {
  render(): ReactElement {
    const name = LocalStorageHelper.getUserFirstName()

    if (!name) {
      return this.renderLoadingState()
    }

    return (
      <div id='profile'>
        <div className='profile-header'>
          <h3>My Profile</h3>
          <img alt='login' className='login' src={profileIllustration} />
        </div>
        <div className='profile-content'>
          Hi <span className='profile-studentName'>{name}!</span> Great job on completing the
          Function Lesson! Keep up the great work :)
        </div>
      </div>
    )
  }

  renderLoadingState = (): ReactElement => {
    return (
      <div id='profile'>
        <div className='profile-header'>
          <h3>My Profile</h3>
          <img alt='login' className='login' src={profileIllustration} />
        </div>
        <div className='profile-content loading' />
      </div>
    )
  }
}

export default Profile
