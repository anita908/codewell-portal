import React, { Component, Fragment, ReactElement } from 'react'
import Card from '../../../Common/Card'
import IAssignmentPresenter from './IAssignmentPresenter'
import IAssignmentVideo from '../Interfaces/IAssignmentVideo'
import ILesson from '../Interfaces/ILesson'
import './style.css'

type Prop = {
  lessons: ILesson[]
  presenter: IAssignmentPresenter
  videos: { homeworkId: number; video: IAssignmentVideo[] }[]
}

type State = {
  showMore: boolean
}

class Assignment extends Component<Prop, State> {
  state = {
    showMore: false
  }

  render(): ReactElement {
    const { lessons, videos } = this.props
    const { showMore } = this.state
    const displayLessons: ILesson[] = showMore ? lessons : [lessons[0], lessons[1]] // TODO: cur & next

    if (!lessons.length) {
      return this.renderLoadingState()
    }

    if (!videos.length) {
      return <div>loading...</div>
    }

    return (
      <div id='assignment'>
        <a className='assignment-link' href={`/assignmentInstruction/${lessons[0].homeworkId}`}>
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
                    activity={'assignment'}
                    header={`Lesson ${lesson.chapterNo}:`}
                    title={lesson.chapterName}
                  />
                </Fragment>
              )
            })}
          </div>
        </a>
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
        const assignmentCards = Array.from(
          document.querySelectorAll('.assignment-content > .card')
        ) as HTMLElement[]

        if (assignmentContent && this.state.showMore) {
          assignmentContent.classList.add('lesson-adjustGrid')
        } else if (assignmentCards && !this.state.showMore) {
          assignmentContent.classList.remove('lesson-adjustGrid')
        }

        if (assignmentCards && this.state.showMore) {
          assignmentCards.forEach((assignmentCard: HTMLElement) => {
            assignmentCard.classList.add('adjustCardWidth')
          })
        } else if (assignmentCards && !this.state.showMore) {
          assignmentCards.forEach((assignmentCard: HTMLElement) => {
            assignmentCard.classList.remove('adjustCardWidth')
          })
        }
      }
    )
  }

  renderLoadingState = (): ReactElement => {
    return (
      <div id='assignment'>
        <div className='assignment-header'>
          <h3>Assignments</h3>
          <details className='assignment-toggleExpandButton loadingButton'>
            <summary>View More</summary>
          </details>
        </div>
        <div className='assignment-content'>
          <Card activity={''} header={''} title={''} />
        </div>
      </div>
    )
  }
}

export default Assignment
