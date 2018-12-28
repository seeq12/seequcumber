import { generateReleaseTestPlan } from "./releaseTestPlanGenerator";
import { TestCase, sortTestCases } from "./testPlan";

describe("releaseTestPlanGenerator", () => {
   const versionToTest = "0.40.00-v201811141000";
   const goodTestPlanDir = "./test_data/test_plans";
   const testCaseOne = {
      featureName: "My Feature A",
      scenarioName: "My Scenario A",
      isRequired: true,
      requiredBy: "story-2",
   };
   const testCaseTwo = {
      featureName: "My Feature B",
      scenarioName: "My Scenario a",
      isRequired: true,
      requiredBy: "story-2",
   };
   const testCaseThree = {
      featureName: "My Feature A",
      scenarioName: "My Scenario b",
      isRequired: false,
      requiredBy: "story-2",
   };

   it("sorts test cases", () => {
      const sortedTestCases: TestCase[] = sortTestCases([
         testCaseThree,
         testCaseTwo,
         testCaseOne,
      ]);

      expect(sortedTestCases.length).toBe(3);
      expect(sortedTestCases[0].featureName).toBe(testCaseOne.featureName);
      expect(sortedTestCases[0].scenarioName).toBe(testCaseOne.scenarioName);

      expect(sortedTestCases[1].featureName).toBe(testCaseThree.featureName);
      expect(sortedTestCases[1].scenarioName).toBe(testCaseThree.scenarioName);

      expect(sortedTestCases[2].featureName).toBe(testCaseTwo.featureName);
      expect(sortedTestCases[2].scenarioName).toBe(testCaseTwo.scenarioName);
   });

   it("generates test plans from directory of test plans", async () => {
      const testPlan = await generateReleaseTestPlan(
         "./test_results/releaseTestPlan.csv",
         versionToTest,
         goodTestPlanDir
      );

      const results = testPlan.split("\n");
      expect(results[0]).toBe("Version To Test");
      expect(results[1]).toBe(versionToTest);
      expect(results[2]).toBe("Feature,Scenario,Required,Required By");
      expect(results[5]).toContain("First Feature");
      expect(results[5]).toContain("Basic Capsule Time");
      expect(results[5]).toContain("story-1-GoodTestPlan");
      expect(results[16]).toContain("Second Feature");
      expect(results[16]).toContain("Function documentation");
      expect(results[16]).toContain("story-2-AnotherGoodTestPlan");
   });
});
