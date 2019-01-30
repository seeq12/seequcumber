module.exports = {
   transform: {
      "^.+\\.ts$": "ts-jest",
   },
   testRegex: "^.+\\.spec\\.ts$",
   moduleFileExtensions: ["ts", "js"],
   collectCoverage: true,
   testEnvironment: "node",
};
