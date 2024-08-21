/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  testEnvironment: "node",
  transform: {
    "^.+.tsx?$": ["ts-jest", {}],
    "^.+\\.vue$": "vue3-jest",
  },
  moduleFileExtensions: ["json", "js", "jsx", "ts", "tsx", "vue"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1", // Map the @ alias to src
  },
  testMatch: ["**/tests/unit/**/*.spec.[jt]s"],
};
