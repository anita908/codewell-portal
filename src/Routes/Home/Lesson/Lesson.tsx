import React, { Component, ReactElement } from 'react'
import Card from '../../../Common/Card/Card'
import './style.css'

class Lesson extends Component {
  render(): ReactElement {
    return (
      <div id='lesson'>
        <div className='lesson-header'>
          <h3>Lessons</h3>
        </div>
        <div className='lesson-content'>
          <Card header={'Lesson 7: Function'} content={'Inclass Activity: Score Analyzer'} />
        </div>
      </div>
    )
  }
}

export default Lesson
