import React, { Component, ReactElement } from 'react'
import { ChangeEvent } from 'react'
import './style.css'

type Props = {
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void
}

class Dropdown extends Component<Props, {}> {
  render = (): ReactElement => {
    return (
      <form>
        <select id='services' name='services' onChange={this.props.onChange}>
          {this.props.children}
        </select>
      </form>
    )
  }
}

export default Dropdown
