import React, { Component, ReactElement, Fragment } from 'react'
import Card from '../../../Common/Card/Card'
import ILesson from '../Interfaces/ILesson'
import './style.css'

type Prop = {
  lessons: ILesson[]
}

type State = {
  showMore: boolean
}

class Lesson extends Component<Prop, State> {
  state = {
    showMore: false
  }

  render(): ReactElement {
    const { lessons } = this.props
    const { showMore } = this.state
    const displayLessons: ILesson[] = showMore ? lessons : [lessons[0], lessons[1]] // cur & next

    return (
      <div id='lesson'>
        <div className='lesson-header'>
          <h3>Lessons</h3>
          <details onClick={this.toggleSection} className='lesson-toggleExpandButton'>
            <summary>View More</summary>
          </details>
        </div>
        <div className='lesson-content'>
          {displayLessons.map((lesson: ILesson) => {
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

  toggleSection = (): void => {
    this.setState(
      (prevState) => ({
        showMore: !prevState.showMore
      }),
      () => {
        const lessonContent = document.querySelector('.lesson-content') as HTMLElement
        const lessonCards = document.querySelectorAll('.lesson-content > .card')
        if (lessonContent) {
          lessonContent.style.gridTemplateColumns = this.state.showMore
            ? 'repeat(4, 1fr)'
            : 'repeat(2, 1fr)'
        }

        if (lessonCards) {
          Array.from(lessonCards).forEach((lessonCard: HTMLElement) => {
            // eslint-disable-next-line no-param-reassign
            lessonCard.style.width = this.state.showMore ? 'var(--card-width)' : 'auto'
          })
        }
      }
    )
  }
}

export default Lesson
