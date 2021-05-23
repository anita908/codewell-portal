process.env.TZ = 'MST'

module.exports = {
  coverageDirectory: '<rootDir>/coverage',
  roots: ['<rootDir>/src'],
  moduleNameMapper: {
    '~(.*)$': '<rootDir>/src/$1',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/src/images',
    '\\.(css|less)$': 'identity-obj-proxy',
    'images/(.*)': ['<rootDir>/images/$1']
  },
  testMatch: ['**/__tests__/**/*.+(ts|tsx|js)', '**/?(*.)+(spec|test).+(ts|tsx|js)'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '^.+\\.m?js$': 'babel-jest'
  }
}
