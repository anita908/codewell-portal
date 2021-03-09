import React, { Component, ReactElement, Fragment } from 'react'
import Card from '../../../Common/Card'
import ILesson from '../Interfaces/ILesson'
import './style.css'

type Prop = {
  lessons: ILesson[]
}

class Assignment extends Component<Prop, {}> {
  render(): ReactElement {
    const { lessons } = this.props

    return (
      <div id='assignment'>
        <div className='assignment-header'>
          <h3>Assignments</h3>
        </div>
        <div className='assignment-content'>
          {lessons.map((lesson) => {
            return (
              <Fragment key={lesson.lessonNumber}>
                <Card
                  activity={lesson.assignmentName}
                  header={`Lesson ${lesson.lessonNumber}: ${lesson.name}`}
                />
              </Fragment>
            )
          })}
        </div>
      </div>
    )
  }
}

export default Assignment
