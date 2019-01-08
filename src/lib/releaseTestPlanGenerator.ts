import parse from "csv-parse/lib/sync";
import { exportTestPlan } from "./testPlanFormatter";
import {
   findAllFilesForPattern,
   getFilename,
   readContentFromFile,
} from "./fileUtilities";
import {
   TestCase,
   TestPlan,
   testCaseExists,
   findIndexForTestCase,
   sortTestCases,
} from "./testPlan";

const RECORD_DELIMITER = ["\n", "\r\n", "\r"];

/**
 * Iterate over multiple test plans to extract all common required test cases
 * and merge them into a consolidated release test plan
 * @param filename
 * @param testPlans
 */
export async function generateReleaseTestPlan(
   filename: string,
   version: string,
   testPlanDir: string
): Promise<string> {
   const files = await findTestPlanFiles(testPlanDir);

   const testPlans = await Promise.all(
      files.map(filename => loadTestPlanFromFile(filename))
   );

   const mergedTestCases: TestCase[] = [];
   testPlans
      .filter(testPlan => !!testPlan.testCases)
      .map(testPlan => {
         testPlan.testCases
            .filter(testCase => !!testCase)
            .map(testCase =>
               mergeTestCase(
                  testCase,
                  getFilename(testPlan.name),
                  mergedTestCases
               )
            );
      });

   const mergedTestPlan: TestPlan = {
      testCases: mergedTestCases,
      name: filename,
      versionToTest: version,
   };
   return await exportTestPlan(mergedTestPlan);
}

/**
 * Merge Test Case when it has already been required by another Test Plan
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
         groupedFeatureName: testCase.groupedFeatureName,
         isRequired: testCase.isRequired,
         requiredBy: newRequiredBy,
      });
   } else {
      // Test case exists, requires merging
      const index = findIndexForTestCase(testCase, mergedTestCases);

      if (testCase.isRequired) {
         if (mergedTestCases[index].isRequired) {
            // Existing test case was required by another test plan, augment requiredBy with this one
            mergedTestCases[index].requiredBy =
               mergedTestCases[index].requiredBy + " " + requiredByTestPlanName;
         } else {
            // Existing test case was not previously required, add only this requireBy
            mergedTestCases[index].requiredBy = requiredByTestPlanName;
         }
         mergedTestCases[index].isRequired = true;
      }
   }
}

function findTestPlanFiles(directory: string): Promise<string[]> {
   return findAllFilesForPattern(directory, "/**/*TestPlan*.csv");
}

/**
 * Load the content of the test plan to gather test cases
 * @param filename
 */
export async function loadTestPlanFromFile(
   filename: string
): Promise<TestPlan> {
   const data = await readContentFromFile(filename);

   if (!data) {
      new Error(`Cannot read test plan: ${filename}`);
   }

   const version = loadVersionToTest(data);

   if (!version) {
      new Error(`Cannot read Version to Test in ${filename}`);
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
      fromLine: 1,
      to_line: 2,
      skip_empty_lines: true,
      record_delimiter: RECORD_DELIMITER,
   };
   const versionFields = parse(data, options);

   return !!versionFields[1] && versionFields[1][0].trim();
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
      columns: ["groupedFeatureName", "isRequired", "requiredBy"],
      // The first 3 are not test cases (versionToTest header, versionToTest value, column headers),
      from_line: 4,
      skip_empty_lines: true,
      record_delimiter: RECORD_DELIMITER,
   };

   const testPlanScenarios: TestCase[] = parse(data, options);
   const valid = testPlanScenarios.filter(item => !!item.groupedFeatureName);
   return sortTestCases(valid);
}
