module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{ts,tsx}'],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "identity-obj-proxy",
    "^.+\\.svg$": "jest-transformer-svg",
    "@components/(.*)$": "<rootDir>/src/components/$1",
    "@pages/(.*)$": "<rootDir>/src/pages/$1",
    "@theme/(.*)$": "<rootDir>/src/theme/$1",
    "@markdown/(.*)$": "<rootDir>/src/markdown/$1"
  },

  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  transformIgnorePatterns: ['<rootDir>/node_modules/(?!@docusaurus)'],
};
