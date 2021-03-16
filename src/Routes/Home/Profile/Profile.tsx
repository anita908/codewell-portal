import React, { Component, ReactElement } from 'react'
import profileIllustration from '../../../images/profile.svg'
import './style.css'

type Props = {
  name: string
}

class Profile extends Component<Props, {}> {
  render(): ReactElement {
    const { name } = this.props

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
}

export default Profile
