// jest.config.js
module.exports = {
    testPathIgnorePatterns: ['/node_modules/'],
    verbose: true,
    testRegex: '.*\\.(test|spec)\\.js$',
    transform: {
      '^.+\\.js$': 'babel-jest',
    },
    moduleNameMapper: {},
    preset: 'ts-jest',
    testEnvironment: 'node',
  };
  