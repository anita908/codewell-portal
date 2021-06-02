import React, { ChangeEvent, Component, ReactElement } from 'react'

type Props = {
  active: boolean
  className?: string
  type?: string
  value?: string | number | null
  checked?: boolean
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
}

class ToggleInput extends Component<Props, {}> {
  render = (): ReactElement => {
    const { active, checked, className, type, value, onChange } = this.props

    if (type === 'checkbox') {
      return (
        <input
          className={className}
          checked={checked}
          disabled={!active}
          onChange={onChange}
          type={type}
          value={value || ''}
        />
      )
    } else {
      return active ? (
        <input className={className} type={type} value={value || ''} onChange={onChange} />
      ) : (
        <span className={className}>{value}</span>
      )
    }
  }
}

export default ToggleInput
