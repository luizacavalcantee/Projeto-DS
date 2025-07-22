/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'],
    clearMocks: true,
    collectCoverage: true,
    collectCoverageFrom: [
        'src/**/*.ts',
        '!src/server.ts',
        '!src/app.ts',
        '!src/routes/**',
        '!src/database/**',
        '!src/env/**',
    ],
    coverageProvider: 'v8',
    moduleNameMapper: {
  '^@controllers(.*)$': '<rootDir>/src/controllers$1',
  '^@DTOs(.*)$': '<rootDir>/src/DTOs$1',
  '^@repositories(.*)$': '<rootDir>/src/repositories$1',
  '^@database(.*)$': '<rootDir>/src/database$1',
},
};
