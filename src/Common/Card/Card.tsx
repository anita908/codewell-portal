import React, { Component, Fragment, ReactElement } from 'react'
import { Link } from 'react-router-dom'
import colorVariables from './borderColors'
import './style.css'

type Props = {
  activity: string
  content?: any
  endPoint: string
  header: string
  linkTitle: string
  pathId: string
  title?: string
  userName: string
}

class Card extends Component<Props, {}> {
  render(): ReactElement {
    const { activity, content, endPoint, header, linkTitle, pathId, title, userName } = this.props
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
        {linkTitle && (
          <Link
            to={{
              pathname: `/${endPoint}/${pathId}`,
              state: {
                content,
                lessonId: pathId,
                lessonName: title,
                userName
              }
            }}
            className='card-link'
            style={{ color: `var(${cardBorderColor})` }}
          >
            {linkTitle}
          </Link>
        )}
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
