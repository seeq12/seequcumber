import { sortTestCases, TestCase } from "./testPlan";
import {
   generateReleaseTestPlan,
   loadTestPlanFromFile,
} from "./releaseTestPlanGenerator";

const TEST_DATA_DIR = "./test_data";

describe("releaseTestPlanGenerator", () => {
   const versionToTest = "0.40.00-v201811141000";
   const goodTestPlanDir = "./test_data/test_plans";
   const testCaseOne = {
      featureName: "My Feature A",
      isRequired: true,
      requiredBy: "story-2",
   };
   const testCaseTwo = {
      featureName: "My Feature B",
      isRequired: true,
      requiredBy: "story-2",
   };
   const testCaseThree = {
      featureName: "My Feature A",
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

      expect(sortedTestCases[1].featureName).toBe(testCaseThree.featureName);

      expect(sortedTestCases[2].featureName).toBe(testCaseTwo.featureName);
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
      expect(results[2]).toBe("Feature,Required,Required By");
      expect(results[3]).toContain("First Feature");
      expect(results[3]).toContain("Story-1-GoodTestPlan");
      expect(results[3]).toContain("Story-2-AnotherGoodTestPlan");
      expect(results[6]).toContain("Third Feature");
      expect(results[6]).toContain("Story-2-AnotherGoodTestPlan");
   });

   it("throws error on invalid test plan", async () => {
      try {
         await loadTestPlanFromFile(
            TEST_DATA_DIR + "/bad_test_plan/emptyTestPlan.csv"
         );
      } catch (error) {
         expect(error.toString()).toContain("Cannot find test plan:");
      }
   });

   it("throws error on invalid version to test", async () => {
      try {
         await loadTestPlanFromFile(
            TEST_DATA_DIR + "/bad_test_plan/emptyVersionToTest.csv"
         );
      } catch (error) {
         expect(error.toString()).toContain("Cannot find test plan:");
      }
   });
});
