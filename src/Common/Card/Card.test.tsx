import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import Card from './Card'

const onClick = jest.fn()
let Props = {
  activity: 'Test activity',
  content: 'Test content',
  endPoint: 'TestEndPoint',
  header: 'Test header',
  linkTitle: 'Test linkTitle',
  onClick: onClick,
  pathId: 'TestPathId',
  title: 'Test title'
}

function getContainer() {
  return render(
    <BrowserRouter>
      <Card {...Props} />
    </BrowserRouter>
  )
}

describe('Test Card component', () => {
  it('Should return Card: when endPoint is not empty', async () => {
    const container = getContainer()
    expect(container).toBeDefined()
    expect(screen.getByTestId('card')).toHaveTextContent('Test header')
    expect(screen.getByTestId('card')).toHaveTextContent('Test title')
    expect(screen.getByTestId('card')).toHaveTextContent('linkTitle')
  })
  it('Should return Card: when endPoint is empty', async () => {
    Props = {
      activity: 'activity',
      content: '',
      endPoint: '',
      header: 'header',
      linkTitle: 'linkTitle',
      onClick: onClick,
      pathId: '',
      title: 'title'
    }
    const container = getContainer()
    expect(container).toBeDefined()

    const { getByText } = render(<a onClick={onClick} />)
    fireEvent.click(getByText('linkTitle'))
    expect(onClick).toHaveBeenCalled()
  })
  it('Should return renderLoadingState', async () => {
    Props = {
      activity: '',
      content: '',
      endPoint: '',
      header: '',
      linkTitle: '',
      onClick: onClick,
      pathId: '',
      title: ''
    }
    const container = getContainer()
    expect(container).toBeDefined()
  })
})
