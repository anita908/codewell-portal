import React, { Component, ReactElement } from 'react'
import Main from './Main/Main'
import SideNav from './SideNav/SideNav'

class Home extends Component {
  render(): ReactElement {
    return (
      <div id='home'>
        <SideNav />
        <Main />
      </div>
    )
  }
}

export default Home
