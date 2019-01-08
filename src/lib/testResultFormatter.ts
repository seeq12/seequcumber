import ejs from "ejs";
import fs from "fs";
import { groupBy } from "lodash";
import { TestReport } from "./testResult";
import { writeContentToFile } from "./fileUtilities";

export enum Format {
   HTML,
}

export async function exportTo(
   format: Format,
   testReport: TestReport,
   filename: string
): Promise<string> {
   switch (format) {
      case Format.HTML:
      default: {
         return exportToHtml(testReport, filename);
      }
   }
}

/**
 * Oragnize test result and create html file
 * @param testReport
 * @param filename
 * @returns HTML content
 */

export async function exportToHtml(
   testReport: TestReport,
   filename: string
): Promise<string> {
   const completed = groupBy(
      testReport.testResults.filter(
         result =>
            // The html template requires the presence of the parent feature (with no scenario name)
            // whenever a scenario is completed
            (result.scenarioName === "" && result.isRequired) ||
            (!!result.scenarioName && result.isRequired && result.isCompleted)
      ),
      "groupedFeatureName"
   );

   const todo = groupBy(
      testReport.testResults.filter(
         // only include feature that contain required scenarios
         result =>
            !!result.scenarioName && result.isRequired && !result.isCompleted
      ),
      "groupedFeatureName"
   );

   const notRequired = groupBy(
      testReport.testResults.filter(result => !result.isRequired),
      "groupedFeatureName"
   );

   const template = fs.readFileSync("./src/lib/ejs/index.ejs", "utf-8");

   const data = {
      completed: completed,
      todo: todo,
      notRequired: notRequired,
      versionToTest: testReport.versionToTest,
   };
   const options = { filename: "./src/lib/ejs/index.ejs" };

   const html = ejs.render(template, data, options);
   await writeContentToFile(filename, html);
   return html;
}
