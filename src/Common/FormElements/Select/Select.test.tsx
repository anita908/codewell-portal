import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { fireEvent, render } from '@testing-library/react'
import Select from './Select'

let Props = {
  size: '',
  value: '',
  onChange: jest.fn()
}

function getContainer() {
  return render(
    <BrowserRouter>
      <Select {...Props} />
    </BrowserRouter>
  )
}

describe('Test Select component', () => {
  it('onChange should be called', async () => {
    const container = getContainer()
    expect(container).toBeDefined()

    const { getByText } = render(<select onChange={Props.onChange}>Test</select>)
    fireEvent.change(getByText('Test'))
    expect(Props.onChange).toHaveBeenCalled()
  })
})
