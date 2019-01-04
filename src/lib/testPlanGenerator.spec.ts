import { exportTestPlan } from "./testPlanFormatter";
import { generateTemplate, generateTestCases } from "./testPlanGenerator";
import { loadFeaturesFrom } from "./featureProcessor";
import { TestPlan } from "./testPlan";

const TEST_DATA_DIR = "./test_data";

describe("testPlanGenerator", () => {
   const goodFeatureDir = TEST_DATA_DIR + "/features/first_feature_dir";

   const version = "0.40.00";

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

   it("generates a test plan template", async () => {
      const testPlanContent = await generateTemplate(
         goodFeatureDir,
         "./test_results/generatedTemplateTestPlan.csv",
         version
      );
      const lines = testPlanContent.split("\n");
      expect(lines.length).toBe(8);
      expect(lines[3]).toBe("/first_feature_dir/First,no,");
   });

   it("generates test cases from a directory of feature files", async () => {
      const features = await loadFeaturesFrom(goodFeatureDir);
      const testCases = generateTestCases(features);
      expect(testCases.length).toBe(4);
      expect(testCases[0].featureName).toBe("/first_feature_dir/First");
      expect(testCases[0].isRequired).toBe(false);
   });

   it("exports test cases to csv format", async () => {
      const features = await loadFeaturesFrom(goodFeatureDir);
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
      expect(result[3]).toBe("/first_feature_dir/First,no,");
      expect(result[4]).toBe(
         "/first_feature_dir/second_feature_dir/Fourth,no,"
      );
      expect(result[5]).toBe(
         "/first_feature_dir/second_feature_dir/Second,no,"
      );
   });

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
