import { loadTestPlanFromFile } from "./testPlanGenerator";
import { findAllFilesForPattern, getFilename } from "./fileUtilities";
import {
   TestCase,
   TestPlan,
   testCaseExists,
   findIndexForTestCase,
} from "./testPlan";
import { exportTestPlan } from "./testPlanFormatter";

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
   // Test case does not exists
   if (!testCaseExists(testCase, mergedTestCases)) {
      var newRequiredBy = testCase.isRequired ? requiredByTestPlanName : "";

      mergedTestCases.push({
         featureName: testCase.featureName,
         scenarioName: testCase.scenarioName,
         isRequired: testCase.isRequired,
         requiredBy: newRequiredBy,
      });
   } else {
      // Test case exists, requires merging
      const existingTestCaseIndex = findIndexForTestCase(
         testCase,
         mergedTestCases
      );

      if (testCase.isRequired) {
         mergedTestCases[existingTestCaseIndex].isRequired = true;

         if (mergedTestCases[existingTestCaseIndex].isRequired) {
            // Existing test case was required by another test plan, augment requiredBy with this one
            mergedTestCases[existingTestCaseIndex].requiredBy =
               mergedTestCases[existingTestCaseIndex].requiredBy +
               " " +
               requiredByTestPlanName;
         } else {
            // Existing test case was not previously required, add only this requireBy
            mergedTestCases[
               existingTestCaseIndex
            ].requiredBy = requiredByTestPlanName;
         }
      }
   }
}

function findTestPlanFiles(directory: string): Promise<string[]> {
   return findAllFilesForPattern(directory, "/**/*TestPlan*.csv");
}
