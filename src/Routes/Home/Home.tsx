import React, { Component, ReactElement } from 'react'
import Assignment from './Assignment'
import Fetcher from '../../Drivers/Fetcher'
import HomePresenter from './HomePresenter'
import ILesson from './Interfaces/ILesson'
import Lesson from './Lesson'
import Profile from './Profile'
import SideNav from './SideNav'
import './style.css'

type State = {
  name: string
  lessons: ILesson[]
  // sessions: ISession[]
}

class Home extends Component<{}, State> {
  state = {
    name: '',
    lessons: []
    // sessions: []
  }

  async componentDidMount(): Promise<void> {
    await this.getHomeData()
  }

  render(): ReactElement {
    const { lessons, name } = this.state

    if (!name) {
      return <p>loading</p>
    }

    return (
      <div id='home'>
        <SideNav name={name} />
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
      lessons: presenter.lessons
      // sessions: presenter.sessions
    })
  }
}

export default Home
