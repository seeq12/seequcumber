import * as featureProcessor from "./featureProcessor";
import { exportTo, Format } from "./testResultFormatter";
import { Feature, TestCase, TestPlan } from "./testPlan";
import { flatten, head, sortBy } from "lodash";
import { io } from "cucumber-messages";
import { loadTestPlanFromFile } from "./testPlanGenerator";
import {
   TestResult,
   TestReport,
   FeatureResults,
   ScenarioResults,
   StepResults,
   Status,
} from "./testResult";
import IScenario = io.cucumber.messages.IScenario;
import IStep = io.cucumber.messages.IStep;
import ITableRow = io.cucumber.messages.ITableRow;
import { get } from "lodash";

/**
 * Generate a test report for test plan
 * If the last version tested is greater than version to test,
 * the item is marked as completed
 *
 */
export async function generateTestReport(
   featureRootDirectory: string,
   testPlanFilename: string,
   reportFilename: string = "TestReport",
   format: Format = Format.HTML
): Promise<TestReport> {
   const testPlan: TestPlan = await loadTestPlanFromFile(testPlanFilename);

   const featureResults: FeatureResults[] = await loadTestResults(
      featureRootDirectory
   );

   const testResults: TestResult[] = evaluateTestResults(
      testPlan.versionToTest,
      testPlan.testCases,
      featureResults
   );

   const testReport = {
      versionToTest: testPlan.versionToTest,
      testResults: testResults,
   };

   exportTo(format, testReport, reportFilename);
   return testReport;
}

/**
 * Gather all the test results from the feature files
 * @param directory
 */
export async function loadTestResults(
   directory: string
): Promise<FeatureResults[]> {
   const features: Feature[] = await featureProcessor.loadFeaturesFrom(
      directory
   );

   return features.map(feature => {
      const scenarioResults = getScenarioResults(feature);
      const version = getFeatureVersion(scenarioResults);

      return {
         name: feature.filename,
         version: version,
         scenarios: scenarioResults,
      };
   });
}

/**
 * Gather test results for this feature's scenarios
 * @param feature
 */
function getScenarioResults(feature: Feature): ScenarioResults[] {
   return (
      sortBy(feature.children, "scenario.name")
         // keep only valid scenarios
         .filter(child => !!child && !!child.scenario)
         .map(child => child.scenario)
         .map(scenario => {
            const name = scenario.name;
            const stepResults = getStepResults(scenario);
            const version = getScenarioVersion(stepResults);
            return {
               name: name,
               version: version,
               steps: stepResults,
            };
         })
   );
}

/**
 * Gather test results for this scenarios's steps
 * which is located in a cucumber table row
 * @param scenario
 */
function getStepResults(scenario: IScenario): StepResults[] {
   return scenario.steps
      .filter(step => get(step, "dataTable.rows.length", 0) > 0)
      .map(step => getLatestStepResult(step));
}

/**
 * Find latest result from the step history
 * FORMAT:
 *    | test step status | version tested | tester Name | defect number  |
 *    example
 *    | FAIL | 0.39.00-v201811141002 | Tester One | defect-1 |
 * @param step
 */
function getLatestStepResult(step: IStep): StepResults {
   const resultRow = step.dataTable.rows;
   const STATUS_INDEX = 0;
   const VERSION_INDEX = 1;
   const DEFECT_INDEX = 3;

   // Keep only the latest test result
   const reducer = (latest: string, row: ITableRow): string => {
      const stepVersion = !!row.cells
         ? row.cells[VERSION_INDEX].value.toString().trim()
         : undefined;
      return !!stepVersion && stepVersion > latest ? stepVersion : latest;
   };
   const latestVersion = resultRow.reduce(reducer, "");

   // Find latest test results
   const latestResult = resultRow.find(row => {
      return row.cells[VERSION_INDEX].value.includes(latestVersion);
   });

   const statusContent =
      !!latestResult && latestResult.cells[STATUS_INDEX].value.trim();
   const status = !!statusContent
      ? Status.getStatusFor(statusContent)
      : Status.UNDEFINED;

   const defect = !!latestResult
      ? latestResult.cells[DEFECT_INDEX].value.trim()
      : "";

   return {
      version: latestVersion,
      status: status,
      defect: defect,
   };
}

/**
 * The feature's version is the earliest when all scenarios were run
 * @param results
 */
function getFeatureVersion(results: ScenarioResults[]): string {
   const versions = results.map(scenario => scenario.version);
   return getLastestVersion(versions);
}

/**
 * The scenario's version is the earliest where all steps were run
 * @param results
 */
function getScenarioVersion(results: StepResults[]): string {
   const versions = results.map(step => step.version);
   return getLastestVersion(versions);
}

/**
 * Extract the latest version from a list of versions
 * @param versions
 */
function getLastestVersion(versions: string[]): string {
   return head(versions.sort().reverse());
}

/**
 * Construct test results for all test cases
 * @param versionToTest
 * @param testCases
 * @param featureResults
 */
function evaluateTestResults(
   versionToTest: string,
   testCases: TestCase[],
   featureResults: FeatureResults[]
): TestResult[] {
   // Test Results can be both Features and Scenarios
   const results: TestResult[] = [];

   for (const testCase of testCases) {
      const featureResult = featureResults.find(feature =>
         testCase.groupedFeatureName.includes(feature.name)
      );
      results.push(getResultForFeature(versionToTest, testCase, featureResult));

      if (!!featureResult) {
         for (const scenario of featureResult.scenarios) {
            results.push(
               getResultForScenario(versionToTest, testCase, scenario)
            );
         }
      }
   }
   return results;
}

function getResultForFeature(
   versionToTest: string,
   testCase: TestCase,
   results: FeatureResults
): TestResult {
   return {
      ...testCase,
      scenarioName: "",
      isCompleted: !!results
         ? isCompleted(results.version, versionToTest)
         : false,
      status: !!results
         ? getFeatureStatus(versionToTest, results)
         : Status.UNDEFINED,
      defects: !!results ? getFeatureDefects(results) : "",
   };
}

function getResultForScenario(
   versionToTest: string,
   testCase: TestCase,
   results: ScenarioResults
): TestResult {
   return {
      ...testCase,
      scenarioName: results.name,
      isCompleted: !!results
         ? isCompleted(results.version, versionToTest)
         : false,
      status: !!results
         ? getScenarioStatus(versionToTest, results)
         : Status.UNDEFINED,
      defects: !!results ? getScenarioDefects(results) : "",
   };
}

/**
 * A test case is complete when result version is later than the version to test
 * @param result
 * @param versionToTest
 */
function isCompleted(result: string, versionToTest: string): boolean {
   return result >= versionToTest;
}

/**
 * A feature's status is the summary of scenarios statuses
 * @param results
 */
function getFeatureStatus(
   versionToTest: string,
   results: FeatureResults
): Status {
   // Only keep results relevant to the version under test
   const relevantResults = results.scenarios.filter(
      scenario => !!scenario.version && scenario.version > versionToTest
   );

   const scenarioStatuses: Status[] = flatten(
      relevantResults.map(scenario =>
         getScenarioStatus(versionToTest, scenario)
      )
   );
   return getSummaryStatus(scenarioStatuses);
}

/**
 * A scenario's status is the summary of step statuses
 * @param results
 */
function getScenarioStatus(
   versionToTest: string,
   results: ScenarioResults
): Status {
   // Only keep results relevant to the version under test
   const relevantResults = results.steps.filter(
      step => !!step.version && step.version > versionToTest
   );

   const statuses: Status[] = flatten(relevantResults.map(step => step.status));
   return getSummaryStatus(statuses);
}

/**
 * Compute the status based on priority (Fail, Skip, Pass or undefined)
 * @param statuses
 */
function getSummaryStatus(statuses: Status[]): Status {
   const hasFailed = statuses.some(
      status => !!status && status === Status.FAIL
   );

   const hasSkipped = statuses.some(
      status => !!status && status == Status.SKIP
   );

   const hasPassed = statuses.every(
      status => !!status && status === Status.PASS
   );

   if (hasFailed) {
      return Status.FAIL;
   } else if (hasSkipped) {
      return Status.SKIP;
   } else if (statuses.length > 0 && hasPassed) {
      return Status.PASS;
   }
   return Status.UNDEFINED;
}

/**
 * Compile defects from scenarios
 * @param results
 */
function getFeatureDefects(results: FeatureResults): string {
   const defects: string[] = results.scenarios.map(scenario =>
      getScenarioDefects(scenario)
   );
   return formatDefects(defects);
}

/**
 * Compile defects from steps
 * @param results
 */
function getScenarioDefects(results: ScenarioResults): string {
   const defects: string[] = flatten(results.steps.map(step => step.defect));
   return formatDefects(defects);
}

/**
 * Concatenate multiple defects
 * @param defects
 */
function formatDefects(defects: string[]): string {
   return defects.filter(item => item.length > 0).join(" ");
}
