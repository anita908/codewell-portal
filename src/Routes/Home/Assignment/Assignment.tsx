import React, { Component, Fragment, ReactElement } from 'react'
import Card from '../../../Common/Card'
import IAssignmentPresenter from './IAssignmentPresenter'
import IAssignmentVideo from '../Interfaces/IAssignmentVideo'
import IChapterProgress from '../Interfaces/IChapterProgress'
import IHomeworkProgress from '../Interfaces/IHomeworkProgress'
import IHomePresenter from '../IHomePresenter'
import './style.css'

type Prop = {
  courseId: number
  courseVideos: IAssignmentVideo[]
  lessons: IChapterProgress[]
  presenter: IAssignmentPresenter
  homePresenter: IHomePresenter
}

type State = {
  showMore: boolean
}

class Assignment extends Component<Prop, State> {
  state = {
    showMore: false
  }

  render(): ReactElement {
    const { courseId, homePresenter } = this.props
    const { selectedSession } = homePresenter
    const { sessionProgressModel } = selectedSession
    const { showMore } = this.state
    const allAssignments = this.getAllAssignments()
    let displayAssignments: IHomeworkProgress[]

    if (allAssignments && allAssignments.length) {
      displayAssignments = showMore ? allAssignments : [allAssignments[0], allAssignments[1]]

      return (
        <div id='assignment'>
          <div className='assignment-header'>
            <h3>Assignments</h3>
            <details onClick={this.toggleSection} className='assignment-toggleExpandButton'>
              <summary>View More</summary>
            </details>
          </div>
          <div className='assignment-content'>
            {displayAssignments?.map((homework: IHomeworkProgress) => {
              const lesson = sessionProgressModel.find((l: IChapterProgress) =>
                l.homeworkProgress.find(
                  (homeworkProgress: IHomeworkProgress) =>
                    homeworkProgress.homeworkName === homework.homeworkName
                )
              ) as IChapterProgress

              return (
                <Fragment key={homework.homeworkId}>
                  <Card
                    activity={'assignment'}
                    content={{
                      courseId: courseId,
                      homeworkId: homework.homeworkId,
                      lessonNo: lesson.chapterNo,
                      lessonName: lesson.chapterName,
                      sessionId: selectedSession.sessionId
                    }}
                    endPoint={'assignmentInstruction'}
                    header={lesson?.chapterNo ? `Lesson ${lesson?.chapterNo}:` : 'Lesson:'}
                    linkTitle={`Do Assignment: ${homework.homeworkName}`}
                    pathId={lesson?.chapterNo?.toString() || ''}
                    title={lesson?.chapterName || ''}
                  />
                </Fragment>
              )
            })}
          </div>
        </div>
      )
    }

    return this.renderLoadingState()
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
          <Card activity={''} endPoint={''} header={''} linkTitle={''} pathId={''} title={''} />
        </div>
      </div>
    )
  }

  getAllAssignments = (): IHomeworkProgress[] => {
    const { sessionProgressModel } = this.props.homePresenter.selectedSession
    const allAssignments: IHomeworkProgress[] = []

    if (sessionProgressModel.length > 0) {
      sessionProgressModel.map((lesson: IChapterProgress) => {
        return allAssignments.push(...lesson.homeworkProgress)
      })

      return allAssignments
    }

    return []
  }
}

export default Assignment
