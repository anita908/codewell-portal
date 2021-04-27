import { BrowserRouter } from 'react-router-dom'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { fireEvent, render } from '@testing-library/react'
import IconButton from './IconButton'
import React from 'react'

const Props = {
  icon: faBars,
  className: '',
  onClick: jest.fn()
}

function getContainer() {
  return render(
    <BrowserRouter>
      <IconButton {...Props} />
    </BrowserRouter>
  )
}

describe('Test IconButton', () => {
  it('Should simulate onClick', () => {
    const { getByTestId } = getContainer()
    const button = getByTestId('iconButton')
    fireEvent.click(button)
  })
})
