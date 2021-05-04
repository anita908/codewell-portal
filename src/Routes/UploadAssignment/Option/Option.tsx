import React, { Component, ReactElement } from 'react'

type Props = {
  selected?: boolean
  value: string
}

class Option extends Component<Props, {}> {
  render = (): ReactElement => {
    return <option selected={this.props.selected}>{this.props.value}</option>
  }
}

export default Option
