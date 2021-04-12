import React, { Component, MouseEvent, ReactElement } from 'react'
import { IconDefinition } from '@fortawesome/fontawesome-common-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './style.css'

type Props = {
  icon: IconDefinition
  className?: string
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void
}

class IconButton extends Component<Props, {}> {
  render = (): ReactElement => {
    const { icon, className, onClick } = this.props

    return (
      <button className={`icon-button ${className}`} onClick={onClick}>
        <FontAwesomeIcon icon={icon} />
      </button>
    )
  }
}

export default IconButton
