import React, { Component, MouseEvent, ReactElement } from 'react'
import { IconDefinition } from '@fortawesome/fontawesome-common-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './style.css'

type Props = {
  icon: IconDefinition
  disabled?: boolean
  className?: string
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void
}

class IconButton extends Component<Props, {}> {
  render = (): ReactElement => {
    const { disabled, icon, className, onClick } = this.props

    return (
      <button
        className={`icon-button ${className}`}
        onClick={onClick}
        style={{ cursor: disabled ? 'default' : 'pointer' }}
        data-testid='iconButton'
      >
        <FontAwesomeIcon icon={icon} />
      </button>
    )
  }
}

export default IconButton
