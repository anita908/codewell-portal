import React, { Component, ReactElement } from 'react'
import Assignment from './Assignment/Assignment'
import AssignmentPresenter from './Assignment/AssignmentPresenter'
import Fetcher from '../../Drivers/Fetcher'
import HomePresenter from './HomePresenter'
import IAssignmentVideo from './Interfaces/IAssignmentVideo'
import ILesson from './Interfaces/ILesson'
import Lesson from './Lesson'
import Profile from './Profile'
import SideNav from '../../Common/SideNav'
import './style.css'

type State = {
  name: string
  lessons: ILesson[]
  videos: { homeworkId: number; video: IAssignmentVideo[] }[]
}

class Home extends Component<{}, State> {
  state = {
    name: '',
    lessons: [],
    videos: []
  }

  async componentDidMount(): Promise<void> {
    await this.getHomeData()
    await this.getAssignmentVideos()
  }

  render(): ReactElement {
    const { lessons, name, videos } = this.state

    if (!name || !lessons) {
      return this.renderLoadingState()
    }

    return (
      <div id='home'>
        <SideNav name={name} />
        <div className='home-content'>
          <Profile name={name} />
          <Assignment
            lessons={lessons}
            userName={name}
            presenter={new AssignmentPresenter(new Fetcher())}
            videos={videos}
          />
          <Lesson lessons={lessons} userName={name} />
        </div>
      </div>
    )
  }

  getHomeData = async (): Promise<void> => {
    const presenter = new HomePresenter(new Fetcher())
    await presenter.getHomeData()

    this.setState({
      name: presenter.firstName,
      lessons: presenter.lessons
    })
  }

  getAssignmentVideos = async () => {
    const { lessons } = this.state

    lessons.forEach(async (lesson: ILesson) => {
      const { homeworkId } = lesson

      const response = await new AssignmentPresenter(new Fetcher()).getHomeworkVideos(homeworkId)
      this.setState((prevState) => ({
        videos: [...prevState.videos, { homeworkId, video: response }]
      }))
    })
  }

  renderLoadingState = (): ReactElement => {
    const { name } = this.state

    return (
      <div id='home'>
        <SideNav name={name} />
        <div className='home-content'>
          <Profile name={name} />
          <Assignment
            lessons={[]}
            presenter={new AssignmentPresenter(new Fetcher())}
            userName={name}
            videos={[]}
          />
          <Lesson lessons={[]} userName={name} />
        </div>
      </div>
    )
  }
}

export default Home
