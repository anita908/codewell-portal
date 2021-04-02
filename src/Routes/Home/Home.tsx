import React, { Component, Fragment, ReactElement } from 'react'
import { Redirect } from 'react-router-dom'
import Assignment from './Assignment'
import assignmentDataStore from 'Model/AssignmentDataStore'
import AssignmentPresenter from './Assignment/AssignmentPresenter'
import Card from '../../Common/Card/Card'
import Cookies from '../../Utilities/Cookies'
import Fetcher from 'Drivers/Fetcher'
import Footer from '../../Common/Footer'
import HomeDataStore from 'Model/HomeDataStore'
import HomePresenter from './HomePresenter'
import IAssignmentVideo from './Interfaces/IAssignmentVideo'
import ISessionProgress from './Interfaces/ISessionProgress'
import ISession from './Interfaces/ISession'
import ISubscriber from 'UseCases/ISubscriber'
import Lesson from './Lesson'
import LocalStorageHelper from 'Utilities/LocalStorageHelper'
import Profile from './Profile'
import SideNav from '../../Common/SideNav'
import './style.css'

type State = {
  lessons: ISessionProgress[]
  name: string
  videos: IAssignmentVideo[]
}

const assignmentPresenter = new AssignmentPresenter(assignmentDataStore)
const homeDataStore = new HomeDataStore(new Fetcher())
const homePresenter = new HomePresenter(homeDataStore)
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

    if (!Cookies.get('auth')) {
      return <Redirect to={'/login'} />
    }

    if (!userName) {
      return this.renderLoadingState()
    }

    if (homePresenter.selectedSession.sessionId < 0) {
      return this.renderChooseOneSession()
    }

    return (
      <div id='home'>
        <SideNav />
        <div className='home-content'>
          <Profile />
          <Lesson
            homePresenter={new HomePresenter(homeDataStore)}
            lessons={lessons}
            userName={name}
          />
          <Assignment
            courseVideos={[]}
            homePresenter={new HomePresenter(homeDataStore)}
            lessons={lessons}
            presenter={new AssignmentPresenter(assignmentDataStore)}
          />
        </div>
        <Footer />
      </div>
    )
  }

  getHomeData = async (): Promise<void> => {
    await homePresenter.getHomeData()
  }

  renderLoadingState = (): ReactElement => {
    const { name } = this.state

    return (
      <div id='home'>
        <SideNav />
        <div className='home-content'>
          <Profile />
          <Lesson
            homePresenter={new HomePresenter(new HomeDataStore(new Fetcher()))}
            lessons={[]}
            userName={name}
          />
          <Assignment
            courseVideos={[]}
            homePresenter={new HomePresenter(new HomeDataStore(new Fetcher()))}
            lessons={[]}
            presenter={new AssignmentPresenter(assignmentDataStore)}
          />
        </div>
        <Footer />
      </div>
    )
  }

  renderChooseOneSession = (): ReactElement => {
    return (
      <div id='home'>
        <SideNav pendingTab />
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
        <Footer />
      </div>
    )
  }

  setSelectedSession = (session: ISession): void => {
    homePresenter.setSelectedSession(session)
    const name = LocalStorageHelper.getUserFirstName()

    this.setState(
      {
        name,
        lessons: homePresenter.lessons
      },
      () => this.getAssignmentVideos()
    )
  }

  getAssignmentVideos = async () => {
    const response = await assignmentPresenter.getHomeworkVideosByCourseId(
      homePresenter.selectedSession.courseId,
      new Fetcher()
    )
    this.setState({ videos: response })
  }

  update = () => {
    this.setState({})
  }
}

export default Home
