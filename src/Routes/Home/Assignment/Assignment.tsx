import React, { Component, ReactElement } from 'react'
import Card from '../../../Common/Card'
import './style.css'

class Assignment extends Component {
  render(): ReactElement {
    return (
      <div id='assignment'>
        <div className='assignment-header'>
          <h3>Assignments</h3>
        </div>
        <div className='assignment-content'>
          <Card header={'Lesson 5'} title={'Pizza Shop'} />
        </div>
      </div>
    )
  }
}

export default Assignment
