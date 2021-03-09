import React, { Component, ReactElement } from 'react'
import colorVariables from './borderColors'
import './style.css'

type Props = {
  activity: string
  content?: any
  header: string
  link?: string
}

class Card extends Component<Props, {}> {
  render(): ReactElement {
    const { activity, header } = this.props
    const cardBorderColor = this.getRandomColor()

    return (
      <div
        className='card'
        style={{ border: `var(--card-border-width) solid var(${cardBorderColor})` }}
      >
        <h3 className='card-header'>{header}</h3>
        <a href='https://editor.p5js.org/' target='blank'>
          <p>{activity}</p>
        </a>
        {/* <p>{content}</p> */}
      </div>
    )
  }

  getRandomColor = (): string => {
    const randomColorIndex = Math.floor(Math.random() * (colorVariables.length - 1 - 0 + 1)) + 0

    return colorVariables[randomColorIndex]
  }
}

export default Card
