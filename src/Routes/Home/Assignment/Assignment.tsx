import React, { Component, ReactElement } from 'react'
import './style.css'

class Home extends Component {
  render(): ReactElement {
    return (
      <div id='assignment'>
        <div className='assignment-header'>
          <h3>Assignment</h3>
        </div>
        <div className='assignment-content'>Assignments</div>
      </div>
    )
  }
}

export default Home
