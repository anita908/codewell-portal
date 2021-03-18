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
}

class Home extends Component<{}, State> {
  state = {
    name: '',
    lessons: []
  }

  async componentDidMount(): Promise<void> {
    await this.getHomeData()
  }

  render(): ReactElement {
    const { lessons, name } = this.state

    if (!name) {
      return this.renderLoadingState()
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
    })
  }

  renderLoadingState = (): ReactElement => {
    const { name } = this.state

    return (
      <div id='home'>
        <SideNav name={name} />
        <div className='home-content'>
          <Profile name={name} />
          <p>loading</p>
        </div>
      </div>
    )
  }
}

export default Home
