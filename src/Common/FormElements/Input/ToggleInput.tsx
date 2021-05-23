import React, { ChangeEvent, Component, ReactElement } from 'react'

type Props = {
  active: boolean
  type?: string
  value?: string | number | null
  checked?: boolean
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
}

class ToggleInput extends Component<Props, {}> {
  render = (): ReactElement => {
    const { active, type, value, checked, onChange } = this.props

    if (type === 'checkbox') {
      return (
        <input
          type={type}
          value={value || ''}
          checked={checked}
          onChange={onChange}
          disabled={!active}
        />
      )
    } else {
      return active ? (
        <input type={type} value={value || ''} onChange={onChange} />
      ) : (
        <span>{value}</span>
      )
    }
  }
}

export default ToggleInput
