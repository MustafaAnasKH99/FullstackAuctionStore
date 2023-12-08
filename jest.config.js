module.exports = {
    testMatch: ["**/__tests__/*.test.js", "!**/app/**"],
    transform: {
       "^.+\\.js$": "babel-jest",
    },
    setupFiles: ["<rootDir>/.jest/env.js"],
 };