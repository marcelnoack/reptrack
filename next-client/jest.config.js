const nextJest = require("next/jest");
const createJestConfig = nextJest({
    dir: "./",
});
const customJestConfig = {
    moduleDirectories: ["node_modules", "<rootDir>/"],
    // testPathIgnorePatterns: ["/cypress/"],
    testRegex: "(/__tests__/.*|(\\.|/)(test))\\.[jt]sx?$",
    testEnvironment: "jest-environment-jsdom",
};
module.exports = createJestConfig(customJestConfig);