import React, { Component, ReactElement, Fragment } from 'react'
import Card from '../../../Common/Card/Card'
import ILesson from '../Interfaces/ILesson'
import './style.css'

type Prop = {
  lessons: ILesson[]
}

class Lesson extends Component<Prop, {}> {
  render(): ReactElement {
    const { lessons } = this.props

    return (
      <div id='lesson'>
        <div className='lesson-header'>
          <h3>Lessons</h3>
        </div>
        <div className='lesson-content'>
          {lessons.map((lesson: ILesson) => {
            return (
              <Fragment key={lesson.chapterId}>
                <Card
                  header={`Lesson ${lesson.chapterNo}:`}
                  title={lesson.chapterName}
                  activity={' activity'}
                />
              </Fragment>
            )
          })}
        </div>
      </div>
    )
  }
}

export default Lesson
