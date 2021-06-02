import React, { ChangeEvent, Component, ReactElement } from 'react'

type Props = {
  active: boolean
  checked?: boolean
  className?: string
  type?: string
  value?: string | number | null
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
}

class ToggleInput extends Component<Props, {}> {
  render = (): ReactElement => {
    const { active, checked, className, onChange, type, value } = this.props

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
