import React, { ChangeEvent, Component, ReactElement } from 'react'
import './style.css'

type Props = {
  classname: string
  disabled?: boolean
  size?: string
  value?: string | number
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void
}

class Select extends Component<Props, {}> {
  render = (): ReactElement => {
    const { classname, disabled, size, value, onChange, children } = this.props
    return (
      <select
        disabled={disabled}
        className={`select ${size} ${classname}`}
        onChange={onChange}
        value={value}
      >
        {children}
      </select>
    )
  }
}

export default Select
