const { pathsToModuleNameMapper } = require('ts-jest');

const { compilerOptions } = require('./tsconfig.base');

module.exports = {
  preset: 'ts-jest',
  transform: {
    '\\.[jt]sx?$': ['ts-jest', { tsconfig: 'tsconfig.dev.json' }],
    '^.+\\.svg$': './test/fileTransformer',
  },
  moduleNameMapper: {
    ...pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
    '\\.(css|less)$': '<rootDir>/src/__mocks__/styleMock.ts',
  },
  setupFiles: ['./test/setupEnv.js'],
  globalSetup: './test/globalSetup.js',
  testRegex: '\\.spec\\.tsx?$',
  snapshotSerializers: ['@emotion/jest/serializer'],
};
