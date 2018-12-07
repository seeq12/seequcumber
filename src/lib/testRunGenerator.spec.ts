import { hydrateTestCases, generateTestReport } from "./testRunGenerator";
import { findAllTestPlanFiles } from "./testPlanGenerator";

test("extract test plan from file", async () => {
  const testCases = await hydrateTestCases(
    "./test_data/test_plans/TestPlanFeatureFirstDir.csv"
  );
  const firstTestCase = testCases[0];
  expect(firstTestCase.featureName).toBe("Capsule Time");
  expect(firstTestCase.scenarioName).toBe("Basic Capsule Time");
});

test("generate report for one test plan", async () => {
  const report = await generateTestReport(
    "0.40.00-v201811141000",
    "./test_data/features/first_feature_dir",
    "./test_data/test_plans/TestPlanFeatureFirstDir.csv"
  );
  const completed = report.testCaseResults.filter(
    item => item.isRequired && item.isCompleted
  );
  expect(completed.length).toBe(3);
});

test("find all test plans", async () => {
  const files = await findAllTestPlanFiles("./test_data/test_plans");
  expect(files.length).toBe(2);
});
