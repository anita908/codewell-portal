import React, { Component, ReactElement, Fragment } from 'react'
import Card from '../../../Common/Card'
import ILesson from '../Interfaces/ILesson'
import './style.css'

type Prop = {
  lessons: ILesson[]
}

type State = {
  showMore: boolean
}

class Assignment extends Component<Prop, State> {
  state = {
    showMore: false
  }

  render(): ReactElement {
    const { lessons } = this.props
    const { showMore } = this.state
    const displayLessons: ILesson[] = showMore ? lessons : [lessons[0], lessons[1]] // cur & next

    return (
      <div id='assignment'>
        <div className='assignment-header'>
          <h3>Assignments</h3>
          <details onClick={this.toggleSection} className='assignment-toggleExpandButton'>
            <summary>View More</summary>
          </details>
        </div>
        <div className='assignment-content'>
          {displayLessons.map((lesson: ILesson) => {
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

  toggleSection = (): void => {
    this.setState(
      (prevState) => ({
        showMore: !prevState.showMore
      }),
      () => {
        const assignmentContent = document.querySelector('.assignment-content') as HTMLElement
        const assignmentCards = document.querySelectorAll('.assignment-content > .card')

        if (assignmentContent) {
          assignmentContent.style.gridTemplateColumns = this.state.showMore
            ? 'repeat(4, 1fr)'
            : 'repeat(2, 1fr)'
        }

        if (assignmentCards) {
          Array.from(assignmentCards).forEach((assignmentCard: HTMLElement) => {
            // eslint-disable-next-line no-param-reassign
            assignmentCard.style.width = this.state.showMore ? 'var(--card-width)' : 'auto'
          })
        }
      }
    )
  }
}

export default Assignment
