import { hydrateFeatures } from "./featureProcessor";
import { io } from "cucumber-messages";
import IFeature = io.cucumber.messages.IFeature;
import IFeatureChild = io.cucumber.messages.IFeatureChild;
import IScenario = io.cucumber.messages.IScenario;
import parse from "csv-parse/lib/sync";
import { readContentFromFile } from "./fileUtilities";
import { TestCase, TestPlan } from "./testPlanGenerator";

export interface TestCaseResult extends TestCase {
  isCompleted: boolean;
}

export interface TestReport {
  versionToTest: string;
  testCaseResults: TestCaseResult[];
}

/**
 * Generate a report of test results all test plans
 * If the last run version is greater than versionToTest, the item is marked as completed
 *
 */
export async function generateTestReport(
  versionToTest: string,
  featureRootDirectory: string,
  testPlanFilename: string
): Promise<TestReport> {
  //hydrate Test Plan from csv file
  const testPlan: TestPlan = await hydrateTestPlan(testPlanFilename);

  //load all features recursively from root directory to gather last run dates
  const features = await hydrateFeatures(featureRootDirectory);

  //for each test cases, generate test result by looking up the feature file
  const results = evaluateTestResults(
    versionToTest,
    testPlan.testCases,
    features
  );

  return {
    versionToTest: versionToTest,
    testCaseResults: results
  };
}

export async function hydrateTestPlan(testPlanFile: string): Promise<TestPlan> {
  const testPlanScenarios = await hydrateTestCases(testPlanFile);
  return {
    testPlanFilename: testPlanFile,
    testCases: testPlanScenarios
  };
}

export async function hydrateTestCases(
  testPlanFile: string
): Promise<TestCase[]> {
  const data = await readContentFromFile(testPlanFile);

  const options = {
    skip_empty_lines: true,
    columns: ["featureName", "scenarioName", "isRequired"],
    // skips header row
    // would be preferable to use column:true which skips the header but it doesn't return the right keys.
    from: 2,
    cast: (value: any, _context: any) => {
      if (value === "no") return false;
      if (value === "yes") return true;
      return value;
    }
  };
  const testPlanScenarios: TestCase[] = parse(data, options);

  return testPlanScenarios;
}

function evaluateTestResults(
  versionToTest: string,
  testCases: TestCase[],
  features: IFeature[]
): TestCaseResult[] {
  const results: TestCaseResult[] = [];
  for (const testCase of testCases) {
    // extract last run version for this test case
    const lastRunVersion = getLastRunVersion(testCase, features);

    //compare to version to test
    const testCaseResultNotCompleted = {
      ...testCase,
      isCompleted: false
    };
    const testCaseResultCompleted = {
      ...testCase,
      isCompleted: true
    };
    lastRunVersion >= versionToTest
      ? results.push(testCaseResultCompleted)
      : results.push(testCaseResultNotCompleted);
  }
  return results;
}

export function getLastRunVersion(
  testCase: TestCase,
  features: IFeature[]
): string {
  const scenario = findFeatureWithScenario(
    testCase.featureName,
    testCase.scenarioName,
    features
  );
  return scenario ? getLastRunVersionFromScenario(scenario) : undefined;
}

export function findFeatureWithScenario(
  featureName: string,
  scenarioName: string,
  features: IFeature[]
): IScenario {
  const feature = features.find(item => !!item && item.name === featureName);
  return feature ? findScenario(scenarioName, feature) : undefined;
}

export function findScenario(
  scenarioName: string,
  feature: IFeature
): IScenario {
  const scenario: IFeatureChild = feature.children.find(
    child => !!child.scenario && child.scenario.name === scenarioName
  );
  return scenario ? scenario.scenario : undefined;
}

export function getLastRunVersionFromScenario(scenario: IScenario): string {
  // The table contains the run result with version and status
  //
  // Scenario: Function documentation formatting
  // When the Formula pane is expanded
  // | PASS | 0.38.00-v201804061001 | Tester Name   |  |
  const stepsWithResults = scenario.steps.filter(
    step =>
      !!step &&
      !!step.dataTable &&
      !!step.dataTable.rows &&
      step.dataTable.rows.length > 0
  );

  const allRunVersionForStep: string[] = [];
  for (const step of stepsWithResults) {
    // check for presence of test results on this step
    const version = getLastRunVersionForStep(step);
    // do not add duplicates
    allRunVersionForStep.includes(version)
      ? allRunVersionForStep
      : allRunVersionForStep.push(version);
  }

  // Get the oldest version where all tests were run.
  // This eliminate newer test runs where some steps were not executed
  allRunVersionForStep.sort((left, right) => (left > right ? 1 : -1));
  return allRunVersionForStep[0];
}

function getLastRunVersionForStep(step: io.cucumber.messages.IStep) {
  const validRows =
    !!step &&
    !!step.dataTable &&
    !!step.dataTable.rows &&
    step.dataTable.rows.length > 0
      ? step.dataTable.rows
      : undefined;

  // Find the lastest version of a scenario where all steps were run.
  // get lastest version from all the result rows for this step
  var latestStepVersion = "";

  for (const row of validRows) {
    // check for last run version
    const version =
      !!row && !!row.cells ? row.cells[1].value.toString() : undefined;
    if (!!version) {
      version > latestStepVersion
        ? (latestStepVersion = version)
        : latestStepVersion;
    }
  }
  return latestStepVersion;
}
