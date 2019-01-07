import * as featureProcessor from "./featureProcessor";
import { flatten, head, sortBy } from "lodash";
import { io } from "cucumber-messages";
import { TestCase, TestPlan, Feature } from "./testPlan";
import {
   TestResult,
   TestReport,
   FeatureRun,
   ScenarioRun,
   StepRun,
   Status,
} from "./testResult";
import IFeature = io.cucumber.messages.IFeature;
import IScenario = io.cucumber.messages.IScenario;
import IStep = io.cucumber.messages.IStep;
import ITableRow = io.cucumber.messages.ITableRow;
import { loadTestPlanFromFile } from "./releaseTestPlanGenerator";
import { exportTo, Format } from "./testRunFormatter";

/**
 * Generate test results for test plan
 * If the last run version is greater than version to test of the test, the item is marked as completed
 *
 */
export async function generateTestReport(
   featureRootDirectory: string,
   testPlanFilename: string,
   reportFilename: string,
   format: Format
): Promise<TestReport> {
   const testPlan: TestPlan = await loadTestPlanFromFile(testPlanFilename);
   const testRuns: FeatureRun[] = await loadTestRuns(featureRootDirectory);
   const results: TestResult[] = evaluateTestResults(
      testPlan.versionToTest,
      testPlan.testCases,
      testRuns
   );

   const testReport = {
      versionToTest: testPlan.versionToTest,
      testResults: results,
   };

   exportTo(format, testReport, reportFilename);
   return testReport;
}

export async function loadTestRuns(directory: string): Promise<FeatureRun[]> {
   const features: Feature[] = await featureProcessor.loadFeaturesFrom(
      directory
   );

   return features.map(feature => {
      const scenarioRuns = getScenarioRuns(feature);
      const version = getFeatureVersion(scenarioRuns);

      return {
         name: feature.filename,
         version: version,
         scenarios: scenarioRuns,
      };
   });
}

function getScenarioRuns(feature: IFeature): ScenarioRun[] {
   const sorted = sortBy(feature.children, "scenario.name");
   return sorted
      .filter(child => !!child && !!child.scenario)
      .map(child => child.scenario)
      .map(scenario => {
         const name = scenario.name;
         const stepRuns = getStepRuns(scenario);
         const version = getScenarioVersion(stepRuns);

         return {
            name: name,
            version: version,
            steps: stepRuns,
         };
      });
}

function getStepRuns(scenario: IScenario): StepRun[] {
   return scenario.steps
      .filter(
         step =>
            !!step.dataTable &&
            !!step.dataTable.rows &&
            step.dataTable.rows.length > 0
      )
      .map(step => getLatestStepRun(step));
}

function getFeatureVersion(runs: ScenarioRun[]): string {
   // The feature's version is the earliest where all scenarios were run
   const versions = runs.map(scenario => scenario.version);
   return getLastestVersion(versions);
}

function getScenarioVersion(runs: StepRun[]): string {
   // The scenario's version is the earliest where all steps were run
   const versions = runs.map(step => step.version);
   return getLastestVersion(versions);
}
function getLastestVersion(versions: string[]): string {
   return head(versions.sort((left, right) => (left > right ? 1 : -1)));
}

function getLatestStepRun(step: IStep): StepRun {
   const validRows =
      !!step &&
      !!step.dataTable &&
      !!step.dataTable.rows &&
      step.dataTable.rows.length > 0
         ? step.dataTable.rows
         : undefined;

   // Keep only the latest run
   const reducer = (latest: string, row: ITableRow): string => {
      const stepVersion = !!row.cells
         ? row.cells[1].value.toString().trim()
         : undefined;
      return !!stepVersion && stepVersion > latest ? stepVersion : latest;
   };
   const latestVersion = validRows.reduce(reducer, "");

   // Find result for the latest run
   const run = validRows.find(row => {
      return !!row && !!row.cells && row.cells[1].value.includes(latestVersion);
   });

   const statusContent =
      !!run && !!run.cells ? run.cells[0].value.trim() : undefined;

   const defect = !!run && !!run.cells ? run.cells[3].value.trim() : undefined;

   return {
      version: latestVersion,
      status: Status.getStatusFor(statusContent),
      defect: defect,
   };
}

function evaluateTestResults(
   versionToTest: string,
   testCases: TestCase[],
   featureRuns: FeatureRun[]
): TestResult[] {
   const results: TestResult[] = [];

   for (const testCase of testCases) {
      const featureRun = featureRuns.find(
         feature => feature.name === testCase.groupedFeatureName
      );

      results.push(getResultForFeature(versionToTest, testCase, featureRun));

      if (!!featureRun) {
         for (const scenario of featureRun.scenarios) {
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
   featureRun: FeatureRun
): TestResult {
   if (!!featureRun) {
      return {
         ...testCase,
         scenarioName: "",
         isCompleted: getFeatureCompleted(featureRun, versionToTest),
         status: getFeatureStatus(featureRun),
         defects: getFeatureDefects(featureRun),
      };
   }

   return {
      ...testCase,
      scenarioName: "",
      isCompleted: false,
      status: Status.UNDEFINED,
      defects: "",
   };
}

function getResultForScenario(
   versionToTest: string,
   testCase: TestCase,
   run: ScenarioRun
): TestResult {
   return {
      ...testCase,
      scenarioName: run.name,
      isCompleted: !!run && run.version >= versionToTest ? true : false,
      status: getScenarioStatus(run),
      defects: getScenarioDefects(run),
   };
}

function getFeatureStatus(run: FeatureRun): Status {
   const statuses: Status[] = flatten(
      run.scenarios.map(scenario => getScenarioStatus(scenario))
   );
   return getStatus(statuses);
}

function getFeatureCompleted(run: FeatureRun, version: string): boolean {
   return run.version >= version ? true : false;
}

function getScenarioStatus(run: ScenarioRun): Status {
   const statuses: Status[] = flatten(run.steps.map(step => step.status));
   return getStatus(statuses);
}

function getStatus(statuses: Status[]): Status {
   if (!!statuses) {
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
      } else if (hasPassed) {
         return Status.PASS;
      }
   }
   return Status.UNDEFINED;
}

function getFeatureDefects(run: FeatureRun): string {
   const defects: string[] = run.scenarios.map(scenario =>
      getScenarioDefects(scenario)
   );
   return formatDefects(defects);
}

function getScenarioDefects(run: ScenarioRun): string {
   const defects: string[] = flatten(run.steps.map(step => step.defect));
   return formatDefects(defects);
}

// Defect concatenator
function formatDefects(defects: string[]): string {
   const defectReducer = (all: string, current: string): string =>
      !!current ? `${all} ${current}` : all;

   return defects.reduce(defectReducer, "").trim();
}
