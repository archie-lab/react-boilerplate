module.exports = {
  setupFiles: ["<rootDir>/config/jest/setupFiles.js"],
  setupFilesAfterEnv: ["<rootDir>/config/jest/setupTests.js"],
  snapshotSerializers: ["enzyme-to-json/serializer"],
  testRegex: "/src/.*?\\.(test|spec)\\.js$",
  transform: {
    "^.+\\.js$": "babel-jest"
    // ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$": "jest-transform-stub"
  },
  verbose: false,
  collectCoverage: false,
  collectCoverageFrom: ["src/**/*.{js,jsx}"],
  coverageReporters: ["json", "lcov", "text-summary"],
  moduleDirectories: ["node_modules", "src"],
  moduleFileExtensions: ["js", "jsx", "json"],
  moduleNameMapper: {
    "^.+.(css|sass)$": "<rootDir>/config/jest/__mocks__/styleMock.js",
    "^.+.(png|jpg|ttf|woff|woff2)$": "<rootDir>/config/jest/__mocks__/fileMock.js"
  },
  watchPlugins: ["jest-watch-typeahead/filename", "jest-watch-typeahead/testname"],
  testEnvironment: "jest-environment-jsdom-global",
  testEnvironmentOptions: {
    resources: "usable"
  },
  globals: {
    __DEV__: true
  }
};
