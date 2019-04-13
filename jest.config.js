module.exports = {
  testRegex: "/test/.*?\\.(test|spec)\\.js$",
  transform: {
    ".*": "babel-jest"
  },
  verbose: false,
  collectCoverage: false,
  collectCoverageFrom: ["src/**/*.{js,jsx}"],
  coverageReporters: ["json", "lcov", "text-summary"],
  moduleDirectories: ["node_modules", "src"],

  watchPlugins: ["jest-watch-typeahead/filename", "jest-watch-typeahead/testname"],
  testEnvironment: "jest-environment-jsdom-global",
  testEnvironmentOptions: {
    resources: "usable"
  }
};
