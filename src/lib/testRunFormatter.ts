import fs from "fs";
import { groupBy } from "lodash";
import { TestReport } from "./testResult";
import { writeContentToFile } from "./fileUtilities";
import ejs from "ejs";

export enum Format {
   HTML,
}

export async function exportTo(
   format: Format,
   testReport: TestReport,
   filename: string
): Promise<string> {
   switch (format) {
      case Format.HTML: {
         return exportToHtml(testReport, filename);
      }

      default: {
         return exportToHtml(testReport, filename);
      }
   }
}

export async function exportToHtml(
   testReport: TestReport,
   filename: string
): Promise<string> {
   const completed = groupBy(
      testReport.testResults.filter(run => run.isRequired && run.isCompleted),
      "groupedFeatureName"
   );

   const todo = groupBy(
      testReport.testResults.filter(run => run.isRequired && !run.isCompleted),
      "groupedFeatureName"
   );

   const notRequired = groupBy(
      testReport.testResults.filter(run => !run.isRequired),
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
