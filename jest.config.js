process.env.TZ = 'MST'

module.exports = {
  coverageDirectory: '<rootDir>/coverage',
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.+(ts|tsx|js)', '**/?(*.)+(spec|test).+(ts|tsx|js)'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '^.+\\.m?js$': 'babel-jest'
  }
}
