import { BrowserRouter } from 'react-router-dom'
import { render } from '@testing-library/react'
import Footer from './Footer'
import React from 'react'

function getContainer() {
  return render(
    <BrowserRouter>
      <Footer />
    </BrowserRouter>
  )
}

describe('Test Footer', () => {
  it('Should return footer', () => {
    const container = getContainer()
    expect(container).toBeDefined()
  })
})
