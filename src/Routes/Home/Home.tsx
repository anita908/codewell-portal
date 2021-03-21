import React, { Component, ReactElement } from 'react'
import Assignment from './Assignment'
import Fetcher from '../../Drivers/Fetcher'
import HomePresenter from './HomePresenter'
import ILesson from './Interfaces/ILesson'
import ISession from './Interfaces/ISession'
import Lesson from './Lesson'
import Profile from './Profile'
import SideNav from './SideNav'
import './style.css'

type State = {
  name: string
  lessons: ILesson[]
  sessions: ISession[]
}

class Home extends Component<{}, State> {
  state = {
    name: '',
    lessons: [],
    sessions: []
  }

  async componentDidMount(): Promise<void> {
    await this.getHomeData()
  }

  render(): ReactElement {
    const { lessons, name, sessions } = this.state

    if (!name || !lessons) {
      return this.renderLoadingState()
    }

    return (
      <div id='home'>
        <SideNav name={name} session={sessions} />
        <div className='home-content'>
          <Profile name={name} />
          <Assignment lessons={lessons} />
          <Lesson lessons={lessons} />
        </div>
      </div>
    )
  }

  getHomeData = async (): Promise<void> => {
    const presenter = new HomePresenter(new Fetcher())
    await presenter.getHomeData()

    this.setState({
      name: presenter.firstName,
      lessons: presenter.lessons,
      sessions: presenter.sessions
    })
  }

  renderLoadingState = (): ReactElement => {
    const { name, sessions } = this.state

    return (
      <div id='home'>
        <SideNav name={name} session={sessions} />
        <div className='home-content'>
          <Profile name={name} />
          <Assignment lessons={[]} />
          <Lesson lessons={[]} />
        </div>
      </div>
    )
  }
}

export default Home
