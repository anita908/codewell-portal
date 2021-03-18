import React, { Component, Fragment, ReactElement } from 'react'
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

    if (!lessons.length) {
      return this.renderLoadingState()
    }

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
                  activity={'inclass activity'}
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
        const lessonCards = Array.from(
          document.querySelectorAll('.lesson-content > .card')
        ) as HTMLElement[]

        if (lessonContent && this.state.showMore) {
          lessonContent.classList.add('lesson-adjustGrid')
        } else if (lessonCards && !this.state.showMore) {
          lessonContent.classList.remove('lesson-adjustGrid')
        }

        if (lessonCards && this.state.showMore) {
          lessonCards.forEach((lessonCard: HTMLElement) => {
            lessonCard.classList.add('adjustCardWidth')
          })
        } else if (lessonCards && !this.state.showMore) {
          lessonCards.forEach((lessonCard: HTMLElement) => {
            lessonCard.classList.remove('adjustCardWidth')
          })
        }
      }
    )
  }

  renderLoadingState = (): ReactElement => {
    return (
      <div id='lesson'>
        <div className='lesson-header'>
          <h3>Lessons</h3>
          <details className='lesson-toggleExpandButton loadingButton'>
            <summary>View More</summary>
          </details>
        </div>
        <div className='lesson-content'>
          <Card header={''} title={''} activity={''} />
        </div>
      </div>
    )
  }
}

export default Lesson
