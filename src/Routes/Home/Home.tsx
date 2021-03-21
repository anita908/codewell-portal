import React, { Component, ReactElement } from 'react'
import { Redirect } from 'react-router-dom'
import Assignment from './Assignment'
import AssignmentPresenter from './Assignment/AssignmentPresenter'
import Cookies from '../../Utilities/Cookies'
import Fetcher from '../../Drivers/Fetcher'
import HomePresenter from './HomePresenter'
import IAssignmentPresenter from './Assignment/IAssignmentPresenter'
import IAssignmentVideo from './Interfaces/IAssignmentVideo'
import ILesson from './Interfaces/ILesson'
import Lesson from './Lesson'
import Profile from './Profile'
import SideNav from '../../Common/SideNav'
import './style.css'

type State = {
  lessons: ILesson[]
  name: string
  videos: IAssignmentVideo[]
}

class Home extends Component<{}, State> {
  state = {
    lessons: [],
    name: '',
    videos: []
  }

  async componentDidMount(): Promise<void> {
    await this.getHomeData()
  }

  render(): ReactElement {
    const { lessons, name, videos } = this.state

    if (!Cookies.get('auth')) {
      return <Redirect to={'/login'} />
    }

    if (!name || !lessons || !videos) {
      return this.renderLoadingState()
    }

    return (
      <div id='home'>
        <SideNav name={name} />
        <div className='home-content'>
          <Profile name={name} />
          <Lesson lessons={lessons} userName={name} />
          <Assignment
            courseVideos={videos}
            lessons={lessons}
            userName={name}
            presenter={new AssignmentPresenter(new Fetcher())}
          />
        </div>
      </div>
    )
  }

  getHomeData = async (): Promise<void> => {
    const presenter = new HomePresenter(new Fetcher())
    const assignmentPresenter = new AssignmentPresenter(new Fetcher())
    await presenter.getHomeData()

    this.setState(
      {
        name: presenter.firstName,
        lessons: presenter.lessons
      },
      () => this.getAssignmentVideos(assignmentPresenter)
    )
  }

  getAssignmentVideos = async (assignmentPresenter: IAssignmentPresenter) => {
    const response = await assignmentPresenter.getHomeworkVideosByCourseId(1) // TODO
    this.setState({ videos: response })
  }

  renderLoadingState = (): ReactElement => {
    const { name } = this.state

    return (
      <div id='home'>
        <SideNav name={name} />
        <div className='home-content'>
          <Profile name={name} />
          <Lesson lessons={[]} userName={name} />
          <Assignment
            courseVideos={[]}
            lessons={[]}
            presenter={new AssignmentPresenter(new Fetcher())}
            userName={name}
          />
        </div>
      </div>
    )
  }
}

export default Home
