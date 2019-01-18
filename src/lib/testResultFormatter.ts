import ejs from "ejs";
import fs from "fs";
import { groupBy } from "lodash";
import { TestReport } from "./testResult";
import { writeContentToFile } from "./fileUtilities";
import path from "path";

export enum Format {
   HTML,
}

/**
 * Create Test Result exported file
 */
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

export async function exportToHtml(
   testReport: TestReport,
   filename: string
): Promise<string> {
   // Group results to faciliate HTML export
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

   const INDEX_FILE = path.join(__dirname, "ejs", "index.ejs");
   const template = fs.readFileSync(INDEX_FILE, "utf-8");

   const data = {
      completed: completed,
      todo: todo,
      notRequired: notRequired,
      versionToTest: testReport.versionToTest,
   };
   const options = {
      filename: INDEX_FILE,
   };

   const html = ejs.render(template, data, options);
   await writeContentToFile(filename, html);
   return html;
}
