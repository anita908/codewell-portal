import React, { Component, ReactElement } from 'react'
import './style.css'

class Assignment extends Component {
  render(): ReactElement {
    return (
      <div id='assignment'>
        <div className='assignment-header'>
          <h3>Assignment</h3>
        </div>
        <div className='assignment-content'>
          <div className='assignment-lessonCard'>Lesson 7: Function</div>
          <div className='assignment-lessonCard'>Lesson 7: Function</div>
          <div className='assignment-lessonCard'>Lesson 7: Function</div>
        </div>
      </div>
    )
  }
}

export default Assignment
