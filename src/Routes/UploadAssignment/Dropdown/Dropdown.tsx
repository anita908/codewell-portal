import React, { Component, ReactElement } from 'react'
import { ChangeEvent } from 'react'
import './style.css'

type Props = {
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void
}

class Dropdown extends Component<Props, {}> {
  render = (): ReactElement => {
    return (
      <select id='assignmentType' name='assignmentType' onChange={this.props.onChange}>
        {this.props.children}
      </select>
    )
  }
}

export default Dropdown
