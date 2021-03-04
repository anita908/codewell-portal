import React, { Component, ReactElement } from 'react'
import './style.css'

class Lesson extends Component {
  render(): ReactElement {
    return (
      <div id='lesson'>
        <div className='lesson-header'>
          <h3>Assignment</h3>
        </div>
        <div className='lesson-content'>
          <div className='lesson-lessonCard'>Lesson 7: Function</div>
          <div className='lesson-lessonCard'>Lesson 7: Function</div>
          <div className='lesson-lessonCard'>Lesson 7: Function</div>
        </div>
      </div>
    )
  }
}

export default Lesson
