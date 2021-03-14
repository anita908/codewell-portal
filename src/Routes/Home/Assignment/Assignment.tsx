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
          <details className='assignment-toggleExpandButton'>
            <summary>Expand</summary>
          </details>
        </div>
        <div className='assignment-content'>
          {lessons.map((lesson: ILesson) => {
            return (
              <Fragment key={lesson.chapterId}>
                <Card
                  activity={'activity'}
                  header={`Lesson ${lesson.chapterNo}:`}
                  title={lesson.chapterName}
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
