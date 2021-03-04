import React, { Component, ReactElement } from 'react'
import Assignment from './Assignment/Assignment'
import Lesson from './Lesson/Lesson'
import Profile from './Profile/Profile'
import SideNav from './SideNav/SideNav'

class Home extends Component {
  render(): ReactElement {
    return (
      <div id='home'>
        <SideNav />
        <Profile />
        <Assignment />
        <Lesson />
      </div>
    )
  }
}

export default Home
