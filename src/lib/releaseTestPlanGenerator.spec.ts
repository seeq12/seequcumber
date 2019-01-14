import { sortTestCasesByFeatureName, TestCase } from "./testPlan";
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
      const sortedTestCases: TestCase[] = sortTestCasesByFeatureName([
         testCaseThree,
         testCaseTwo,
         testCaseOne,
      ]);

      expect(sortedTestCases.length).toBe(3);
      expect(sortedTestCases.map(feature => feature.featureName)).toEqual([
         testCaseOne.featureName,
         testCaseThree.featureName,
         testCaseTwo.featureName,
      ]);
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
      let errorMessage;
      try {
         await loadTestPlanFromFile(
            TEST_DATA_DIR + "/bad_test_plan/emptyTestPlan.csv"
         );
      } catch (error) {
         errorMessage = error.toString();
      }
      expect(errorMessage).toContain("Cannot read test plan");
   });

   it("throws error on invalid version to test", async () => {
      let errorMessage;
      try {
         await loadTestPlanFromFile(
            TEST_DATA_DIR + "/bad_test_plan/EmptyVersionToTest.csv"
         );
      } catch (error) {
         errorMessage = error.toString();
      }
      expect(errorMessage).toContain("Cannot read Version to Test");
   });
});
