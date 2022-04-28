/**  @type {import('@jest/types').Config.ProjectConfig} */
const config = {
  transform: {
    "\\.[jt]sx?$": "ts-jest",
  },
  "globals": {
    "ts-jest": {
      "useESM": true
    }
  },
  moduleNameMapper: {
    "(.+)\\.js": "$1"
  }
};

export default config;