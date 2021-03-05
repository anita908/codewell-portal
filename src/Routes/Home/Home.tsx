import React, { Component, ReactElement } from 'react'
import Assignment from './Assignment'
import Fetcher from '../../Drivers/Fetcher'
import Lesson from './Lesson'
import Profile from './Profile'
import SideNav from './SideNav'
import HomePresenter from './HomePresenter'

type State = {
  name: string
}

class Home extends Component<{}, State> {
  state = {
    name: ''
  }

  async componentDidMount(): Promise<void> {
    await this.getHomeData()
  }

  render(): ReactElement {
    const { name } = this.state

    if (!name) {
      return <p>loading</p>
    }

    return (
      <div id='home'>
        <SideNav name={name} />
        <Profile name={name} />
        <Assignment />
        <Lesson />
      </div>
    )
  }

  getHomeData = async (): Promise<void> => {
    const presenter = new HomePresenter(new Fetcher())
    const response = await presenter.getHomeData()
    this.setState({ name: response.firstName })
  }
}

export default Home
