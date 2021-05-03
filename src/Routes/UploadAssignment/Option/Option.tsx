import React, { Component, ReactElement } from 'react'
import './style.css'

type Props = {
  selected?: boolean
  value: string
}

class Dropdown extends Component<Props, {}> {
  render = (): ReactElement => {
    return <option selected={this.props.selected}>{this.props.value}</option>
  }
}

export default Dropdown
