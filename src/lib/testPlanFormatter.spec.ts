import { exportTestPlan } from "./testPlanFormatter";
import { TestPlan } from "./testPlan";

describe("testPlaFormatter", () => {
   const version = "v201811141000";

   const testCaseOne = {
      featureName: "My Feature A",
      isRequired: true,
      requiredBy: "story-4567",
   };

   const testCaseTwo = {
      featureName: "My Feature B",
      isRequired: false,
      requiredBy: "story-1234",
   };

   it("exports a test plan to csv ", async () => {
      const testPlan: TestPlan = {
         versionToTest: version,
         name: "./test_results/generateFromTestCasesTestPlan.csv",
         testCases: [testCaseOne, testCaseTwo],
      };

      const exported = await exportTestPlan(testPlan);
      const lines: string[] = exported.split("\n");
      expect(lines[3]).toContain(`${testCaseOne.featureName}`);
   });
});
