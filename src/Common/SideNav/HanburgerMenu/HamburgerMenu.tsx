import React, { Component, MouseEvent, ReactElement } from 'react'
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './style.css'

type Props = {
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void
  open: boolean
}

class HamburgerMenu extends Component<Props, {}> {
  render = (): ReactElement => {
    const icon = this.props.open ? (
      <FontAwesomeIcon icon={faTimes} />
    ) : (
      <FontAwesomeIcon icon={faBars} />
    )
    const { onClick } = this.props

    return (
      <button className='hamburgerMenu-icon' onClick={onClick} data-testid='hamburgerMenu-icon'>
        {icon}
      </button>
    )
  }
}

export default HamburgerMenu
