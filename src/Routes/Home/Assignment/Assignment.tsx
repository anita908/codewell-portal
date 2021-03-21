import React, { Component, Fragment, ReactElement } from 'react'
import Card from '../../../Common/Card'
import IAssignmentPresenter from './IAssignmentPresenter'
import IAssignmentVideo from '../Interfaces/IAssignmentVideo'
import IHomeworkProgress from '../Interfaces/IHomeworkProgress'
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
    const allAssignments = this.getAllAssignments()
    const displayAssignments: IHomeworkProgress[] = showMore
      ? allAssignments
      : [allAssignments[0], allAssignments[1]]

    if (!lessons.length || !displayAssignments) {
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
          {displayAssignments.map((homework: IHomeworkProgress) => {
            const lesson = lessons.find((l: ILesson) =>
              l.homeworkProgress.find(
                (homeworkProgress: IHomeworkProgress) =>
                  homeworkProgress.homeworkName === homework.homeworkName
              )
            ) as ILesson

            const videos = courseVideos.filter(
              (video: IAssignmentVideo) => video.homeworkId === lesson?.chapterId
            )

            return (
              <Fragment key={lesson.chapterId}>
                <Card
                  activity={'assignment'}
                  content={{
                    videos
                  }}
                  endPoint={'assignmentInstruction'}
                  header={
                    lesson?.chapterNo
                      ? `Lesson ${lesson?.chapterNo} Assignment ${homework.homeworkId}:`
                      : 'Lesson:'
                  }
                  linkTitle={`Do Assignment: ${homework.homeworkName}`}
                  pathId={lesson?.chapterId?.toString() || ''}
                  title={lesson?.chapterName || ''}
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

  getAllAssignments = (): IHomeworkProgress[] => {
    const { lessons } = this.props
    const allAssignments: IHomeworkProgress[] = []

    lessons.map((lesson: ILesson) => {
      return allAssignments.push(...lesson.homeworkProgress)
    })

    return allAssignments
  }
}

export default Assignment
