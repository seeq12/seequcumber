import parse from "csv-parse/lib/sync";
import { exportTestPlan } from "./testPlanFormatter";
import { io } from "cucumber-messages";
import { loadFeaturesFrom } from "./featureProcessor";
import { readContentFromFile } from "./fileUtilities";
import { sortTestCases, TestCase, TestPlan } from "./testPlan";
import IFeature = io.cucumber.messages.IFeature;
import IScenario = io.cucumber.messages.IScenario;

const RECORD_DELIMITER = ["\n", "\r\n", "\r"];

/**
 * Traverse a feature file director, collect test cases (scenarios)
 * and write test plan templare to csv file
 * @param features
 */
export async function generateTemplate(
   featureDirectory: string,
   filename: string,
   versionToTest: string
): Promise<string> {
   const features = await loadFeaturesFrom(featureDirectory);
   const testCases = generateTestCases(features);
   return await exportTestPlan({
      versionToTest,
      name: filename,
      testCases,
   });
}

/**
 * Generate a list of unique Test Cases (Scenarios) from a list of Features
 * @param features
 */
export function generateTestCases(features: IFeature[]): TestCase[] {
   const testCases: TestCase[] = [];

   features.map(feature => {
      // Add the entire feature as the first test case
      testCases.push({
         featureName: feature.name,
         isRequired: false,
         scenarioName: "",
         requiredBy: "",
      });

      // Add each scenario
      const scenarios = generateScenarios(feature);
      scenarios.map(scenario => {
         const testCase = {
            featureName: feature.name,
            isRequired: false,
            scenarioName: scenario.name,
            requiredBy: "",
         };

         testCases.push(testCase);
      });
   });
   return testCases;
}

export async function loadTestPlanFromFile(
   filename: string
): Promise<TestPlan> {
   const data = await readContentFromFile(filename);

   if (!data) {
      new Error(`Cannot read test plan: ${filename}`);
   }

   const version = loadVersionToTest(data);

   if (!version) {
      new Error(`Cannot read Version to Test in: ${filename}`);
   }

   const testPlanScenarios = await loadTestCases(data);

   return {
      versionToTest: version,
      testCases: testPlanScenarios,
      name: filename,
   };
}

export function loadVersionToTest(data: string) {
   const options = {
      header: true,
      columns: ["versionToTest"],
      from_line: 1,
      to_line: 2,
      skip_empty_lines: true,
      record_delimiter: RECORD_DELIMITER,
   };
   const versionFields = parse(data, options);

   const isValid = !!versionFields[1];

   return isValid && versionFields[1].versionToTest.trim();
}

export async function loadTestCases(data: string): Promise<TestCase[]> {
   const options = {
      cast: (value: any, _context: any) => {
         if (value === "no") {
            return false;
         }
         if (value === "yes") {
            return true;
         }
         return value;
      },
      columns: ["featureName", "scenarioName", "isRequired", "requiredBy"],
      // The first 3 are not test cases (versionToTest header, versionToTest value, column headers),
      from_line: 4,
      skip_empty_lines: true,
      record_delimiter: RECORD_DELIMITER,
   };

   const testPlanScenarios: TestCase[] = parse(data, options);
   const valid = testPlanScenarios.filter(item => !!item.featureName);
   return sortTestCases(valid);
}

export function generateScenarios(feature: IFeature): IScenario[] {
   return feature.children
      .map(child => child.scenario)
      .filter(scenario => !!scenario);
}
