import React, { Component, Fragment, ReactElement } from 'react'
import { Link } from 'react-router-dom'
import colorVariables from './borderColors'
import './style.css'

type Props = {
  activity: string
  content?: any
  endPoint: string
  header: string
  pathId: string
  title?: string
}

class Card extends Component<Props, {}> {
  render(): ReactElement {
    const { activity, endPoint, header, pathId, title } = this.props
    const cardBorderColor = this.getRandomColor()

    if (!activity && !header && !title) {
      return this.renderLoadingState()
    }

    return (
      <div
        className='card'
        style={{ border: `var(--card-border-width) solid var(${cardBorderColor})` }}
      >
        <h4 className='card-header'>{header}</h4>
        <h4 className='card-title'>{title}</h4>
        <Link
          to={{
            pathname: `/${endPoint}/${pathId}`,
            state: {
              lessonId: pathId,
              lessonName: title
            }
          }}
          className='assignment-link'
        >
          Go To Assignment Instruction
        </Link>
      </div>
    )
  }

  getRandomColor = (): string => {
    const randomColorIndex = Math.floor(Math.random() * (colorVariables.length - 1 - 0 + 1)) + 0

    return colorVariables[randomColorIndex]
  }

  renderLoadingState = (): ReactElement => {
    return (
      <Fragment>
        <div className='card card-loading' />
        <div className='card card-loading' />
      </Fragment>
    )
  }
}

export default Card
