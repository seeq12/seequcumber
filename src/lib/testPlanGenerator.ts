import parse from "csv-parse/lib/sync";
import { exportTestPlan as exportTestPlanToCsv } from "./testPlanFormatter";
import {
   Feature,
   TestCase,
   TestPlan,
   sortTestCasesByFeatureName,
} from "./testPlan";
import { loadFeaturesFrom } from "./featureProcessor";
import { readContentFromFile } from "./fileUtilities";

const RECORD_DELIMITER = ["\n", "\r\n", "\r"];

/**
 * Traverse a feature file directory, collect test cases
 * and write test plan template to csv file
 */
export async function generateTemplate(
   featureDirectory: string,
   filename: string = "TestPlan",
   versionToTest: string = ""
): Promise<string> {
   const features = await loadFeaturesFrom(featureDirectory);
   const testCases = generateTestCases(features);
   return exportTestPlanToCsv({
      versionToTest,
      name: filename.endsWith("csv") ? filename : filename.concat(".csv"),
      testCases,
   });
}

/**
 * Generate a list of Features to be used as Test Cases
 */
export function generateTestCases(features: Feature[]): TestCase[] {
   return features.map(feature => ({
      groupedFeatureName: feature.filename,
      isRequired: false,
      requiredBy: "",
   }));
}

/**
 * Parse the content of a Test Plan that was previously saved to cvs file
 */
export async function loadTestPlanFromFile(
   filename: string
): Promise<TestPlan> {
   const data = await readContentFromFile(filename);
   const version = parseVersionToTest(data);
   const testPlanScenarios = await parseTestCases(data);

   return {
      versionToTest: version,
      testCases: testPlanScenarios,
      name: filename,
   };
}

/**
 * Parse CSV content to get the version to test
 */
function parseVersionToTest(data: string): string {
   const options = {
      header: true,
      columns: ["versionToTest"],
      from_line: 1,
      to_line: 2,
      skip_empty_lines: true,
      record_delimiter: RECORD_DELIMITER,
   };
   const versionFields = parse(data, options);
   const version = !!versionFields[1] && versionFields[1].versionToTest.trim();

   if (!version) {
      throw new Error(`Cannot read Version to Test`);
   }
   return version;
}

/**
 * Parse CSV content to get a list of Test Case
 */
async function parseTestCases(data: string): Promise<TestCase[]> {
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
      columns: ["groupedFeatureName", "isRequired", "requiredBy"],
      // The first 3 are not test cases (versionToTest header, versionToTest value, column headers),
      from_line: 4,
      skip_empty_lines: true,
      record_delimiter: RECORD_DELIMITER,
   };

   const testPlanScenarios: TestCase[] = parse(data, options);
   const valid = testPlanScenarios.filter(item => !!item.groupedFeatureName);
   return sortTestCasesByFeatureName(valid);
}
