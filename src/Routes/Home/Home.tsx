import React, { Component, ReactElement } from 'react'
import Assignment from './Assignment'
import Lesson from './Lesson'
import Profile from './Profile'
import SideNav from './SideNav'

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
