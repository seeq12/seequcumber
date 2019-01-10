import parse from "csv-parse/lib/sync";
import { exportTestPlan } from "./testPlanFormatter";
import {
   findAllFilesForPattern,
   getFilename as getFilenameFromCsv,
   readContentFromFile,
} from "./fileUtilities";
import {
   TestCase,
   TestPlan,
   testCaseExists,
   findTestCase,
   sortTestCasesByFeatureName,
} from "./testPlan";

const RECORD_DELIMITER = ["\n", "\r\n", "\r"];

/**
 * Iterate over multiple test plans to extract all test cases
 * and export them into a consolidated release test plan
 * @param filename      Filename for the generated Release Test Plan
 * @param versionToTest Version under test for the Release Test Plan
 * @param testPlanDir   Source directory that contains the test plans to be merged
 */
export async function generateReleaseTestPlan(
   filename: string,
   versionToTest: string,
   testPlanDir: string
): Promise<string> {
   const files = await findTestPlanFiles(testPlanDir);

   const testPlans = await Promise.all(
      files.map(filename => loadTestPlanFromFile(filename))
   );

   // Multiple test plans might require the same test case
   // which requires merging to consolidate their required status
   const mergedTestCases: TestCase[] = [];

   for (const testPlan of testPlans) {
      if (!!testPlan.testCases) {
         for (const testCase of testPlan.testCases) {
            mergeTestCase(
               testCase,
               getFilenameFromCsv(testPlan.name),
               mergedTestCases
            );
         }
      }
   }

   const mergedTestPlan: TestPlan = {
      testCases: mergedTestCases,
      name: filename,
      versionToTest: versionToTest,
   };
   return exportTestPlan(mergedTestPlan);
}

/**
 * Merge a Test Case when it has already been required by another Test Plan
 * @param testCase   Test Case to be merged
 * @param requiredByTestPlanName The name of the Test Plan that requires this test case
 * @param mergedTestCases The current merged test cases that will be updated
 */
export function mergeTestCase(
   testCase: TestCase,
   requiredByTestPlanName: string,
   mergedTestCases: TestCase[]
): void {
   // Test case does not exists, add it
   if (!testCaseExists(testCase, mergedTestCases)) {
      var newRequiredBy = testCase.isRequired ? requiredByTestPlanName : "";

      mergedTestCases.push({
         featureName: testCase.featureName,
         isRequired: testCase.isRequired,
         requiredBy: newRequiredBy,
      });
   } else {
      // Test case exists, requires merging
      const existingTestCase = findTestCase(testCase, mergedTestCases);

      if (testCase.isRequired) {
         if (existingTestCase.isRequired) {
            // Existing test case was required by another test plan, augment requiredBy with this one
            existingTestCase.requiredBy =
               existingTestCase.requiredBy + " " + requiredByTestPlanName;
         } else {
            // Existing test case was not previously required, add only this requireBy
            existingTestCase.requiredBy = requiredByTestPlanName;
         }

         // Ensure the test case is now required
         existingTestCase.isRequired = true;
      }
   }
}

/**
 * Parse the content of a Test Plan that was previously saved to cvs file
 * @returns Hydrated Test Plan
 */
export async function loadTestPlanFromFile(
   filename: string
): Promise<TestPlan> {
   const data = await readContentFromFile(filename);
   const version = parseVersionToTest(data);
   const testPlanScenarios = await loadTestCases(data);

   return {
      versionToTest: version,
      testCases: testPlanScenarios,
      name: filename,
   };
}

/**
 * Parse csv content to get the version to test
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
 * Parse cvs content to get a list of Test Case
 */
async function loadTestCases(data: string): Promise<TestCase[]> {
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
      columns: ["featureName", "isRequired", "requiredBy"],
      // The first 3 are not test cases (versionToTest header, versionToTest value, column headers),
      from_line: 4,
      skip_empty_lines: true,
      record_delimiter: RECORD_DELIMITER,
   };

   const testPlanScenarios: TestCase[] = parse(data, options);
   const valid = testPlanScenarios.filter(item => !!item.featureName);
   return sortTestCasesByFeatureName(valid);
}

/**
 * Recursively traverse a directory to gather all Test Plan filename
 * @returns List of Test Plan filenames
 */
function findTestPlanFiles(directory: string): Promise<string[]> {
   return findAllFilesForPattern(directory, "**/*TestPlan*.csv");
}
