import { generateTestPlanFromFeatures, exportToCsv } from "./testPlanGenerator";

import { hydrateFeatures } from "./featureProcessor";

test("generate test cases from a directory of feature files", async () => {
  const features = await hydrateFeatures(
    "./test_data/features/first_feature_dir"
  );
  const testCases = generateTestPlanFromFeatures(features);
  expect(testCases.length).toBe(14);
  expect(testCases[0].featureName).toBe("Capsule Time");
  expect(testCases[0].scenarioName).toBe("Basic Capsule Time");
  expect(testCases[0].isRequired).toBe(false);
});

test("export a list of test cases to csv format", async () => {
  const features = await hydrateFeatures(
    "./test_data/features/first_feature_dir"
  );
  const testCases = generateTestPlanFromFeatures(features);
  await exportToCsv(testCases, "./test_results/TestPlanFeatureFirstDir.csv");
});

test("export test cases with non-default values", async () => {
  const testCase = {
    featureName: "feature_a",
    scenarioName: "scenario_a",
    isRequired: true
  };

  await exportToCsv([testCase], "./test_results/TestPlanTestCast.csv");
});
