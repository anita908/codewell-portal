import React, { Component, Fragment, ReactElement } from 'react'
import assignmentDataStore from '../../Model/AssignmentDataStore'
import Assignment from './Assignment'
import AssignmentPresenter from './Assignment/AssignmentPresenter'
import Card from '../../Common/Card/Card'
import Feedback from './Feedback'
import Footer from '../../Common/Footer'
import homeDataStore from '../../Model/HomeDataStore'
import HomePresenter from './HomePresenter'
import IAssignmentVideo from './Interfaces/IAssignmentVideo'
import IChapterProgress from './Interfaces/IChapterProgress'
import ISession from './Interfaces/ISession'
import ISubscriber from '../../UseCases/ISubscriber'
import Lesson from './Lesson'
import LocalStorageHelper from '../../Utilities/LocalStorageHelper'
import Profile from './Profile'
import SideNav from '../../Common/SideNav'
import './style.css'

type State = {
  lessons: IChapterProgress[]
  name: string
  videos: IAssignmentVideo[]
}

const homePresenter = new HomePresenter(homeDataStore)
const assignmentPresenter = new AssignmentPresenter(assignmentDataStore)

class Home extends Component<{}, State> implements ISubscriber {
  state = {
    lessons: [],
    name: '',
    videos: []
  }

  async componentDidMount(): Promise<void> {
    homePresenter.subscribe(this)
    assignmentPresenter.subscribe(this)
    await this.getHomeData()
  }

  render(): ReactElement {
    const { lessons, name } = this.state
    const userName = LocalStorageHelper.getUserFirstName()

    if (!userName) {
      return this.renderLoadingState()
    }

    if (homePresenter.selectedSession.sessionId < 0) {
      return this.renderChooseOneSession()
    }

    return (
      <div id='home'>
        <SideNav username={localStorage.getItem('firstname') || ''} />
        <div className='home-content'>
          <Profile currentChapterName={this.getCurrentChapterName()} />
          <Lesson
            homePresenter={new HomePresenter(homeDataStore)}
            lessons={lessons}
            userName={name}
          />
          <Assignment
            courseId={homeDataStore.home.selectedSession.courseId}
            courseVideos={[]}
            homePresenter={new HomePresenter(homeDataStore)}
            lessons={lessons}
            presenter={new AssignmentPresenter(assignmentDataStore)}
          />
        </div>
        <Feedback />
        <Footer />
      </div>
    )
  }

  renderLoadingState = (): ReactElement => {
    const { name } = this.state

    return (
      <div id='home'>
        <SideNav username={localStorage.getItem('firstname') || ''} />
        <div className='home-content'>
          <Profile currentChapterName={this.getCurrentChapterName()} />
          <Lesson homePresenter={new HomePresenter(homeDataStore)} lessons={[]} userName={name} />
          <Assignment
            courseId={-1}
            courseVideos={[]}
            homePresenter={new HomePresenter(homeDataStore)}
            lessons={[]}
            presenter={new AssignmentPresenter(assignmentDataStore)}
          />
        </div>
        <Feedback />
        <Footer />
      </div>
    )
  }

  renderChooseOneSession = (): ReactElement => {
    return (
      <div id='home'>
        <SideNav pendingTab username={localStorage.getItem('firstname') || ''} />
        <div className='home-content'>
          <h1>Please choose the session you'd like to view</h1>
          <div className='home-sessionList'>
            {homePresenter.enrolledSessions.map((session: ISession) => {
              return (
                <Fragment key={session.sessionId}>
                  <Card
                    header={session.courseName}
                    endPoint={''}
                    linkTitle={'Go To This Session'}
                    onClick={() => this.setSelectedSession(session)}
                    pathId={'path id'}
                  />
                </Fragment>
              )
            })}
          </div>
        </div>
        <Feedback />
        <Footer />
      </div>
    )
  }

  getHomeData = async (): Promise<void> => {
    await homePresenter.getHomeData()
  }

  getCurrentChapterName = (): string => {
    const { lessons } = homePresenter
    const { currentChapter } = homePresenter.selectedSession

    return (
      lessons
        .find((lesson: IChapterProgress) => lesson.chapterNo === currentChapter)
        ?.chapterName?.toLowerCase() || 'your most recent class'
    )
  }

  setSelectedSession = (session: ISession): void => {
    homePresenter.setSelectedSession(session)
    const name = LocalStorageHelper.getUserFirstName()

    this.setState({
      name,
      lessons: homePresenter.lessons
    })
  }

  update = () => {
    this.setState({})
  }
}

export default Home
