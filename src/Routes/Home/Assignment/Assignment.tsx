import React, { Component, Fragment, ReactElement } from 'react'
import Card from '../../../Common/Card'
import IAssignmentPresenter from './IAssignmentPresenter'
import IAssignmentVideo from '../Interfaces/IAssignmentVideo'
import ILesson from '../Interfaces/ILesson'
import './style.css'

type Prop = {
  courseVideos: IAssignmentVideo[]
  lessons: ILesson[]
  userName: string
  presenter: IAssignmentPresenter
}

type State = {
  showMore: boolean
}

class Assignment extends Component<Prop, State> {
  state = {
    showMore: false
  }

  render(): ReactElement {
    const { courseVideos, lessons, userName } = this.props
    const { showMore } = this.state
    const displayLessons: ILesson[] = showMore ? lessons : [lessons[0], lessons[1]]

    if (!lessons.length || !displayLessons) {
      return this.renderLoadingState()
    }

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
            const { chapterName, chapterNo, chapterId } = lesson
            const videos = courseVideos.filter(
              (video: IAssignmentVideo) => video.homeworkId === chapterId
            )

            return (
              <Fragment key={lesson.chapterId}>
                <Card
                  activity={'assignment'}
                  content={videos}
                  endPoint={'assignmentInstruction'}
                  header={`Lesson ${chapterNo}:`}
                  linkTitle={'Go To Assignment Instruction'}
                  pathId={chapterId?.toString() || ''}
                  title={chapterName}
                  userName={userName}
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
    const { userName } = this.props

    return (
      <div id='assignment'>
        <div className='assignment-header'>
          <h3>Assignments</h3>
          <details className='assignment-toggleExpandButton loadingButton'>
            <summary>View More</summary>
          </details>
        </div>
        <div className='assignment-content'>
          <Card
            activity={''}
            endPoint={''}
            header={''}
            linkTitle={''}
            pathId={''}
            title={''}
            userName={userName}
          />
        </div>
      </div>
    )
  }
}

export default Assignment
