import React, { Component, ReactElement } from 'react'
import './style.css'

type Props = {
  content?: any
  header: string
  title?: string
}

class Card extends Component<Props, {}> {
  render(): ReactElement {
    const { content, title, header } = this.props

    return (
      <div className='card'>
        <h3 className='card-header'>{header}</h3>
        <p>{title}</p>
        <p>{content}</p>
      </div>
    )
  }
}

export default Card
