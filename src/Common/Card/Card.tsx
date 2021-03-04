import React, { Component, ReactElement } from 'react'
import './style.css'

type Props = {
  header: string
}

class Card extends Component<Props, {}> {
  render(): ReactElement {
    const { header } = this.props
    return (
      <div className='card'>
        <p>{header}</p>
      </div>
    )
  }
}

export default Card
