import React, { Component, ReactElement } from 'react'
import colorVariables from './borderColors'
import './style.css'

type Props = {
  activity: string
  content?: any
  header: string
  link?: string
  title?: string
}

class Card extends Component<Props, {}> {
  render(): ReactElement {
    const { activity, header, title } = this.props
    const cardBorderColor = this.getRandomColor()

    return (
      <div
        className='card'
        style={{ border: `var(--card-border-width) solid var(${cardBorderColor})` }}
      >
        <h4 className='card-header'>{header}</h4>
        <h4 className='card-title'>{title}</h4>
        <a href='https://editor.p5js.org/' target='blank'>
          <p>{activity}</p>
        </a>
      </div>
    )
  }

  getRandomColor = (): string => {
    const randomColorIndex = Math.floor(Math.random() * (colorVariables.length - 1 - 0 + 1)) + 0

    return colorVariables[randomColorIndex]
  }
}

export default Card
