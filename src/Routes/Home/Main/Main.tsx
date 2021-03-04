import React, { Component, ReactElement, Fragment } from 'react'
import Assignment from '../Assignment/Assignment'
import Profile from '../Profile/Profile'
import './style.css'

class Main extends Component {
  render(): ReactElement {
    return (
      <div id='main'>
        <Profile />
        <Assignment />
      </div>
    )
  }
}

export default Main
