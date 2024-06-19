import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "node",
  moduleNameMapper: {
    // Uncomment to provides the Next.js cache function
    //react: "next/dist/compiled/react/cjs/react.development.js",
    "^@/(.*)$": "<rootDir>/$1",
  },
  setupFilesAfterEnv: ["./jest.setup.ts"],
  testPathIgnorePatterns: ["src/__tests__/config.test.ts", "src/__tests__/api/helper.js", "src/__tests__/playwright"]
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);