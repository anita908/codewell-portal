import React, { ChangeEvent, Component, ReactElement } from 'react'
import './style.css'

type Props = {
  size?: string
  value?: string | number
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void
}

class Select extends Component<Props, {}> {
  render = (): ReactElement => {
    const { size, value, onChange, children } = this.props
    return (
      <select className={`select ${size}`} value={value} onChange={onChange}>
        {children}
      </select>
    )
  }
}

export default Select
