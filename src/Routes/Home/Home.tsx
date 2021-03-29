import React, { Component, Fragment, ReactElement } from 'react'
import { Redirect } from 'react-router-dom'
import ISubscriber from 'UseCases/ISubscriber'
import LocalStorageHelper from 'Utilities/LocalStorageHelper'
import Assignment from './Assignment'
import assignmentDataStore from 'Model/AssignmentDataStore'
import AssignmentPresenter from './Assignment/AssignmentPresenter'
import Card from '../../Common/Card/Card'
import Cookies from '../../Utilities/Cookies'
import Fetcher from 'Drivers/Fetcher'
import homeDataStore from 'Model/HomeDataStore'
import HomePresenter from './HomePresenter'
import IAssignmentVideo from './Interfaces/IAssignmentVideo'
import ISessionProgress from './Interfaces/ISessionProgress'
import ISession from './Interfaces/ISession'
import Lesson from './Lesson'
import Profile from './Profile'
import SideNav from '../../Common/SideNav'
import './style.css'

type State = {
  lessons: ISessionProgress[]
  name: string
  videos: IAssignmentVideo[]
}

const assignmentPresenter = new AssignmentPresenter(assignmentDataStore)
const presenter = new HomePresenter(homeDataStore)
class Home extends Component<{}, State> implements ISubscriber {
  state = {
    lessons: [],
    name: '',
    videos: []
  }

  async componentDidMount(): Promise<void> {
    presenter.subscribe(this)
    assignmentPresenter.subscribe(this)
    await this.getHomeData()
  }

  render(): ReactElement {
    const { lessons, name } = this.state
    const username = LocalStorageHelper.getUsername()

    if (!Cookies.get('auth')) {
      return <Redirect to={'/login'} />
    }

    if (!username) {
      return this.renderLoadingState()
    }

    if (presenter.currentSession.sessionId < 0) {
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
      </div>
    )
  }

  update = () => {
    this.setState({})
  }

  getHomeData = async (): Promise<void> => {
    await presenter.getHomeData()
  }

  renderChooseOneSession = (): ReactElement => {
    return (
      <div id='home'>
        <SideNav pendingTab />
        <div className='home-content'>
          <h1>Please choose the session you'd like to view</h1>
          <div className='home-sessionList'>
            {presenter.sessions.map((session: ISession) => {
              return (
                <Fragment key={session.sessionId}>
                  <Card
                    header={session.courseName}
                    endPoint={''}
                    linkTitle={'Go To This Session'}
                    onClick={() => this.setCurrentSession(session.sessionId)}
                    pathId={'path id'}
                  />
                </Fragment>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  setCurrentSession = (sessionId: number): void => {
    presenter.setCurrentSession(sessionId)
    const name = LocalStorageHelper.getUsername()

    this.setState(
      {
        name,
        lessons: presenter.lessons
      },
      () => this.getAssignmentVideos()
    )
  }

  getAssignmentVideos = async () => {
    const response = await assignmentPresenter.getHomeworkVideosByCourseId(
      presenter.courseId,
      new Fetcher()
    )
    this.setState({ videos: response })
  }

  renderLoadingState = (): ReactElement => {
    const { name } = this.state

    return (
      <div id='home'>
        <SideNav />
        <div className='home-content'>
          <Profile />
          <Lesson homePresenter={new HomePresenter(homeDataStore)} lessons={[]} userName={name} />
          <Assignment
            courseVideos={[]}
            homePresenter={new HomePresenter(homeDataStore)}
            lessons={[]}
            presenter={new AssignmentPresenter(assignmentDataStore)}
          />
        </div>
      </div>
    )
  }
}

export default Home
