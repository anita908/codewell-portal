import React, { Component, ReactElement } from 'react'
import Profile from './Profile/Profile'
import SideNav from './SideNav/SideNav'

class Home extends Component {
  render(): ReactElement {
    return (
      <div id='home'>
        <SideNav />
        <Profile />
      </div>
    )
  }
}

export default Home
