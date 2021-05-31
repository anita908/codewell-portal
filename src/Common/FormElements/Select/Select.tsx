import React, { ChangeEvent, Component, ReactElement } from 'react'
import './style.css'

type Props = {
  classname: string
  size?: string
  value?: string | number
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void
}

class Select extends Component<Props, {}> {
  render = (): ReactElement => {
    const { classname, size, value, onChange, children } = this.props
    return (
      <select className={`select ${size} ${classname}`} value={value} onChange={onChange}>
        {children}
      </select>
    )
  }
}

export default Select
