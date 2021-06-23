/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line node/no-unpublished-require

// const { pathsToModuleNameMapper } = require("ts-jest/utils");
// const { compilerOptions } = require("./tsconfig.json");

// module.exports = {
// 	preset: "ts-jest",
// 	testEnvironment: "node",
// 	roots: ["<rootDir>/src"],
// 	transform: {
// 		"^.+\\.tsx?$": "ts-jest",
// 	},
// 	moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: "<rootDir>/src" }),
// };

// module.exports = {
// 	moduleFileExtensions: ["ts", "tsx", "js"],
// 	transform: {
// 		"^.+\\.(ts|tsx)$": "ts-jest",
// 	},
// 	globals: {
// 		"ts-jest": {
// 			tsConfigFile: "tsconfig.json",
// 		},
// 	},
// 	testMatch: ["**/__tests__/*.+(ts|tsx|js)"],
// };

module.exports = {
	testEnvironment: "node",
	moduleFileExtensions: ["js", "ts", "tsx"],
	transform: {
		"^.+\\.(t|j)s$": "ts-jest",
	},
	globals: {
		"ts-jest": {
			tsconfig: "tsconfig.json",
		},
	},
	testMatch: ["**/__tests__/*.+(ts|tsx|js)"],
	preset: "ts-jest",
	testPathIgnorePatterns: ["<rootDir>/dist"],
};
