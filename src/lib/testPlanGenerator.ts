import stringify from "csv-stringify/lib/sync";
import { findAllFilesForPattern, writeContentToFile } from "./fileUtilities";
import { getScenariosFromFeature } from "./featureProcessor";
import { io } from "cucumber-messages";
import IFeature = io.cucumber.messages.IFeature;

export interface TestCase {
  featureName: string;
  scenarioName: string;
  isRequired: boolean;
}

export interface TestPlan {
  testPlanFilename: string;
  testCases: TestCase[];
}

export function generateTestPlanFromFeatures(features: IFeature[]): TestCase[] {
  const testCases: TestCase[] = [];
  for (const feature of features) {
    const scenarios = getScenariosFromFeature(feature);
    for (const scenario of scenarios) {
      const testCase = {
        featureName: feature.name,
        scenarioName: scenario.name,
        isRequired: false
      };
      testCases.push(testCase);
    }
  }
  return testCases;
}

export async function findAllTestPlanFiles(
  directory: string
): Promise<string[]> {
  return await findAllFilesForPattern(directory, "/**/*TestPlan*.csv");
}

export async function exportToCsv(
  testCases: TestCase[],
  filename: string
): Promise<void> {
  const data = stringifyTestCases(testCases);
  return await writeContentToFile(filename, data);
}

function stringifyTestCases(testCases: TestCase[]): string {
  const options = {
    header: true,
    columns: {
      featureName: 'Feature',
      scenarioName: 'Scenario',
      required: 'Required'
    },
    cast: {
      boolean: function(value: boolean) {
        if (value) return 'yes';
        else return 'no';
      }
    }
  };
  return stringify(testCases, options);
}
