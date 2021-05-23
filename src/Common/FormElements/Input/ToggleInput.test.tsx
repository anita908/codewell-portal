import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { render } from '@testing-library/react'
import ToggleInput from './ToggleInput'

let Props = {
  active: true,
  type: 'checkbox',
  value: '',
  checked: true,
  onChange: jest.fn()
}

function getContainer() {
  return render(
    <BrowserRouter>
      <ToggleInput {...Props} />
    </BrowserRouter>
  ).container
}

describe('Test ToggleInput', () => {
  it('return when type equal checkbox', () => {
    const container = getContainer()
    expect(container).toBeDefined()
  })

  it('return when type equal is not checkbox and active is true', () => {
    Props = {
      active: true,
      type: '',
      value: '',
      checked: true,
      onChange: jest.fn()
    }
    const container = getContainer()
    expect(container).toBeDefined()
  })

  it('return when type equal is not checkbox and active is false', () => {
    Props = {
      active: false,
      type: '',
      value: 'Test value',
      checked: true,
      onChange: jest.fn()
    }
    const container = getContainer()
    expect(container).toBeDefined()
  })
})
