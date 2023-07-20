import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const sharedConfig = {
  // Add more setup options before each test is run
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],

  moduleNameMapper: {
    '^@/lib/(.*)$': '<rootDir>/src/lib/$1',
    '^@/components/(.*)$': '<rootDir>/src/components/$1',
    '^@/helpers/(.*)$': '<rootDir>/src/helpers/$1',
    '^@/styles/(.*)$': '<rootDir>/src/styles/$1',
    '^@/prisma/(.*)$': '<rootDir>/prisma/$1',
  },
};

const clientTestConfig = {
  ...sharedConfig,
  testEnvironment: 'jest-environment-jsdom',
  testMatch: ['**/src/{app,components,helpers}/**/*.spec.ts?(x)'],
};

const serverTestConfig = {
  ...sharedConfig,
  testEnvironment: 'node',
  testMatch: [
    '**/src/{lib,pages}/**/*.spec.[jt]s?(x)',
    '**/src/middleware.spec.ts',
  ],
};

const config = {
  // Add more setup options before each test is run
  projects: [
    await createJestConfig(clientTestConfig)(),
    await createJestConfig(serverTestConfig)(),
  ],
};
// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default config;
