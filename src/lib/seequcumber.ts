import { generateTemplate } from "././testPlanGenerator";
import { generateTestReport } from "./testResultGenerator";
import { Format } from "./testResultFormatter";

/**
 * Generate a Test Plan from a directory of Gherkin files
 * @param featureDir Directory of Gherkin feature files
 * @param testPlanFilename Filename of generated Test Plan
 * @param versionToTest Target version of the software to test
 */
export async function generateTestPlan(
   featureDirectory: string,
   testPlanFilename: string,
   versionToTest: string
) {
   return generateTemplate(featureDirectory, testPlanFilename, versionToTest);
}

/**
 * Generate a Test Report from a Test Plan and directory containing Gherkin files
 * @param featureDirectory Directory of Gherkin feature files
 * @param testPlanFilename Filename of Test Plan
 * @param reportFilenme  Filename of HTML report
 */
export async function generateHtmlReport(
   featureDirectory: string,
   testPlanFilename: string,
   reportFilenme: string
) {
   return generateTestReport(
      featureDirectory,
      testPlanFilename,
      reportFilenme,
      Format.HTML
   );
}
