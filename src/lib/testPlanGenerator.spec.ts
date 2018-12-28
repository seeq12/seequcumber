import { exportTestPlan } from "./testPlanFormatter";
import { generateTemplate, generateTestCases } from "./testPlanGenerator";
import { loadFeaturesFrom } from "./featureProcessor";
import { TestPlan } from "./testPlan";

const TEST_DATA_DIR = "./test_data";

describe("testPlanGenerator", () => {
   const goodFeatureDir = TEST_DATA_DIR + "/features/first_feature_dir";

   const version = "v201811141000";

   const testCaseOne = {
      featureName: "My Feature A",
      scenarioName: "My Scenario A",
      isRequired: true,
      requiredBy: "story-4567",
   };

   const testCaseTwo = {
      featureName: "My Feature B",
      scenarioName: "My Scenario A",
      isRequired: false,
      requiredBy: "story-1234",
   };

   it("generates a test plan template", async () => {
      const testPlanContent = await generateTemplate(
         goodFeatureDir,
         "./test_results/generatedTemplateTestPlan.csv",
         version
      );
      const lines = testPlanContent.split("\n");
      expect(lines.length).toBe(20);
      expect(lines[4]).toBe("First Feature,Basic Capsule Time,no,");
   });

   it("generates test cases from a directory of feature files", async () => {
      const features = await loadFeaturesFrom(goodFeatureDir);
      const testCases = generateTestCases(features);
      expect(testCases.length).toBe(16);
      expect(testCases[1].featureName).toBe("First Feature");
      expect(testCases[1].scenarioName).toBe("Basic Capsule Time");
      expect(testCases[1].isRequired).toBe(false);
   });

   it("exports a test cases to csv format", async () => {
      const features = await loadFeaturesFrom(goodFeatureDir);
      const goodTestCases = generateTestCases(features);
      const filename = "./test_results/generateFromGoodFeatures.csv";

      const testPlan: TestPlan = {
         name: filename,
         versionToTest: version,
         testCases: goodTestCases,
      };

      await exportTestPlan(testPlan);
   });

   it("exports a test plan to csv ", async () => {
      const testPlan: TestPlan = {
         versionToTest: version,
         name: "./test_results/generateFromTestCasesTestPlan.csv",
         testCases: [testCaseOne, testCaseTwo],
      };

      const exported = await exportTestPlan(testPlan);
      const lines: string[] = exported.split("\n");
      expect(lines[3]).toContain(
         `${testCaseOne.featureName},${testCaseOne.scenarioName}`
      );
   });
});
