module.exports = {
    "roots": [
      "src"
    ],
    "testMatch": [
      "**/*.jest.(ts|tsx|js|jsx)",
    ],
    "transform": {
      "^.+\\.(js|jsx)$": "babel-jest",
      ".+\\.(css|scss|png|jpg|svg|gif)$": "jest-transform-stub"
    },
  }