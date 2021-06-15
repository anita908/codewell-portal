import React, { Component, Fragment, ReactElement } from 'react'
import { Link } from 'react-router-dom'
import Card from '../../Common/Card'
import Footer from 'Common/Footer'
import homeDataStore from 'Model/HomeDataStore'
import HomePresenter from 'Routes/Home/HomePresenter'
import IChapterProgress from '../Home/Interfaces/IChapterProgress'
import IHomeworkProgress from '../Home/Interfaces/IHomeworkProgress'
import SideNav from 'Common/SideNav'
import './style.css'

type State = {
  allAssignments: IHomeworkProgress[]
}

const homePresenter = new HomePresenter(homeDataStore)

class AssignmentSubmission extends Component<State> {
  state = {
    allAssignments: []
  }

  async componentDidMount(): Promise<void> {
    const allAssignments = this.getAllAssignments()

    if (allAssignments && !allAssignments.length) {
      await homePresenter.getHomeData()
    }

    this.setState({ allAssignments: this.getAllAssignments() })
  }

  render(): ReactElement {
    const { selectedSession } = homePresenter
    const { sessionProgressModel } = selectedSession
    const { allAssignments } = this.state
    let displayAssignments: IHomeworkProgress[]

    if (allAssignments && allAssignments.length) {
      displayAssignments = allAssignments

      return (
        <div id='assignmentSubmission'>
          <SideNav username={localStorage.getItem('firstname') || ''} />
          <div className='assignmentSubmission-content'>
            <div className='assignmentSubmission-header'>Assignment Submissions</div>
            <div className='assignmentSubmission-links'>
              {displayAssignments?.map((homework: IHomeworkProgress) => {
                const lesson = sessionProgressModel.find((l: IChapterProgress) =>
                  l.homeworkProgress.find(
                    (homeworkProgress: IHomeworkProgress) =>
                      homeworkProgress.homeworkName === homework.homeworkName
                  )
                ) as IChapterProgress

                return (
                  <Fragment key={homework.homeworkId}>
                    <Link
                      className='assignmentSubmission-link'
                      to={{
                        pathname: '/uploadAssignment',
                        state: {
                          chapterName: lesson.chapterName,
                          homeworkId: homework.homeworkId,
                          lessonNumber: lesson.chapterNo,
                          sessionId: selectedSession.sessionId
                        }
                      }}
                    >
                      Lesson {lesson.chapterNo}: {lesson.chapterName} -- {homework.homeworkName}
                    </Link>
                  </Fragment>
                )
              })}
            </div>
          </div>
          <Footer />
        </div>
      )
    }

    return this.renderLoadingState()
  }

  renderLoadingState = (): ReactElement => {
    return (
      <div id='assignment'>
        <div>
          <h3>Assignments</h3>
        </div>
        <div>
          <Card activity={''} endPoint={''} header={''} linkTitle={''} pathId={''} title={''} />
        </div>
      </div>
    )
  }

  getAllAssignments = (): IHomeworkProgress[] => {
    const { sessionProgressModel } = homePresenter.selectedSession
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

export default AssignmentSubmission
