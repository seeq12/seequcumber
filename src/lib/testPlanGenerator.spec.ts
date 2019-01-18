import { exportTestPlan } from "./testPlanFormatter";
import {
   generateTemplate,
   generateTestCases,
   loadTestPlanFromFile,
} from "./testPlanGenerator";
import { loadFeaturesFrom } from "./featureProcessor";
import { TestPlan } from "./testPlan";
import path from "path";

const TEST_DATA_DIR = "./test_data";

describe("testPlanGenerator", () => {
   const GOOD_FEATURE_DIR = path.join(TEST_DATA_DIR, "/features/first");
   const BAD_TEST_PLAN_DIR = path.join(TEST_DATA_DIR, "/bad_test_plans");

   const version = "0.40.00";

   const testCaseOne = {
      featureName: "My Feature A",
      groupedFeatureName: "/dir/My Feature A",
      scenarioName: "My Scenario A",
      isRequired: true,
      requiredBy: "story-4567",
   };

   const testCaseTwo = {
      featureName: "My Feature B",
      groupedFeatureName: "/dir/My Feature A",
      scenarioName: "My Scenario A",
      isRequired: false,
      requiredBy: "story-1234",
   };

   it("generates a test plan template", async () => {
      const testPlanContent = await generateTemplate(
         GOOD_FEATURE_DIR,
         "./test_results/generatedTemplateTestPlan.csv",
         version
      );
      const lines = testPlanContent.split("\n");
      expect(lines.length).toBe(8);
      expect(lines[3]).toBe("/first/First,no,");
   });

   it("generates test cases from a directory of feature files", async () => {
      const features = await loadFeaturesFrom(GOOD_FEATURE_DIR);
      const testCases = generateTestCases(features);
      expect(testCases.length).toBe(4);
      expect(testCases[0].groupedFeatureName).toBe("/first/First");
      expect(testCases[0].isRequired).toBe(false);
   });

   it("exports test cases to csv format", async () => {
      const features = await loadFeaturesFrom(GOOD_FEATURE_DIR);
      const goodTestCases = generateTestCases(features);
      const filename = "./test_results/generateFromGoodFeatures.csv";

      const testPlan: TestPlan = {
         name: filename,
         versionToTest: version,
         testCases: goodTestCases,
      };

      const content = await exportTestPlan(testPlan);
      const result = content.split("\n");
      expect(result[0]).toBe("Version To Test");
      expect(result[1]).toBe(version);
      expect(result[2]).toBe("Feature,Required,Required By");
      expect(result[3]).toBe("/first/First,no,");
      expect(result[4]).toBe("/second/Fourth,no,");
      expect(result[5]).toBe("/second/Second,no,");
   });

   it("exports a test plan to csv ", async () => {
      const testPlan: TestPlan = {
         versionToTest: version,
         name: "./test_results/generateFromTestCasesTestPlan.csv",
         testCases: [testCaseOne, testCaseTwo],
      };

      const exported = await exportTestPlan(testPlan);
      const lines: string[] = exported.split("\n");
      expect(lines.length).toBe(6);
      expect(lines[3]).toContain(`${testCaseOne.featureName}`);
   });

   it("error: throws error if versionToTest is not present", async () => {
      let errorMessage;

      try {
         await loadTestPlanFromFile(
            path.join(BAD_TEST_PLAN_DIR, "EmptyVersionToTest.csv")
         );
      } catch (error) {
         errorMessage = error.toString();
      }
      expect(errorMessage).toContain("Cannot read Version to Test");
   });
});
