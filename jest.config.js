module.exports = {
  preset: "ts-jest",
  setupFiles: ["<rootDir>/config/jest/setupFiles.ts"],
  setupFilesAfterEnv: ["<rootDir>/config/jest/setupTests.ts"],
  snapshotSerializers: ["enzyme-to-json/serializer"],
  testRegex: "/src/.*?\\.(test|spec)\\.(ts|tsx)$",
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": "ts-jest"
    // ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$": "jest-transform-stub"
  },
  verbose: false,
  collectCoverage: false,
  collectCoverageFrom: ["src/**/*.{ts,tsx}"],
  coverageReporters: ["json", "lcov", "text-summary"],
  moduleDirectories: ["node_modules", "src"],
  moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json"],
  moduleNameMapper: {
    "^.+.(css|sass)$": "<rootDir>/config/jest/__mocks__/styleMock.ts",
    "^.+.(png|jpg|ttf|woff|woff2)$": "<rootDir>/config/jest/__mocks__/fileMock.ts"
  },
  // watchPlugins: ["jest-watch-typeahead/filename", "jest-watch-typeahead/testname"],
  testEnvironment: "node",
  // testEnvironment: "jest-environment-jsdom-global",
  // testEnvironmentOptions: {
  //   resources: "usable"
  // },
  globals: {
    __DEV__: true
  }
};
