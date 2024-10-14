module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    setupFiles: ["dotenv/config"],
    coverageReporters: ["json", "html", "lcov", "text", "text-summary"],
    collectCoverageFrom: ["./app/**"],
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coverageThreshold: {
        global: {
            statements: 85,
            branches: 85,
            functions: 85,
            lines: 85,
        },
    },
    moduleFileExtensions: ["js", "json", "ts", "node", "jsx", "tsx"],
    transformIgnorePatterns: [
        '/node_modules/',
    ],
    testRegex: "(/tests/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
    transform: {
        "^.+\\.(t|j)s$": "ts-jest",
    },
    roots: ["<rootDir>/tests"],
    verbose: true,
};
