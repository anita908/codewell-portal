import colorVariables from './borderColors'

describe('Test borderColors', () => {
  it('colorVariables should match', () => {
    expect(colorVariables).toEqual([
      '--illustration-purple',
      '--illustration-chocolate',
      '--illustration-brightOrange',
      '--illustration-dustPink',
      '--illustration-turquoise',
      '--illustration-brightYellow',
      '--illustration-skyBlue'
    ])
  })
})
