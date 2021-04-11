import React from 'react'
import { render } from '@testing-library/react'
import Profile from './Profile'
import LocalStorageHelper from 'Utilities/LocalStorageHelper'

function getContainer(currentChapterName: string) {
  return render(<Profile currentChapterName={currentChapterName} />).container
}

describe('Test dynamic user profile', () => {
  const originalGetUserFirstName = LocalStorageHelper.getUserFirstName

  beforeEach(() => {
    LocalStorageHelper.getUserFirstName = jest.fn().mockReturnValue('Sunni')
  })

  afterEach(() => {
    LocalStorageHelper.getUserFirstName = originalGetUserFirstName
  })

  it('Should be able to display current lesson name dynamically', () => {
    const container = getContainer('current chapter name')
    const profileText = container.querySelector('.profile-content')?.innerHTML

    expect(profileText).toEqual(
      'Hi <span class="profile-studentName">Sunni!</span> Great job on completing current chapter name! Keep up the great work :)'
    )
  })
})
