const { pathsToModuleNameMapper } = require('ts-jest');

const { compilerOptions } = require('./tsconfig.base');

module.exports = {
  preset: 'ts-jest',
  transform: {
    "\\.tsx?$": ["ts-jest", { tsConfig: "tsconfig.dev.json" }],
    "^.+\\.svg$": "./test/fileTransformer"
  },
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
};
