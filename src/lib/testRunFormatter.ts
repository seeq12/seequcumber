import fs from "fs";
import stringify from "csv-stringify/lib/sync";
import { groupBy } from "lodash";
import { Status, TestReport, TestResult } from "./testResult";
import { writeContentToFile } from "./fileUtilities";
import ejs from "ejs";

export enum Format {
   CSV,
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
         return exportToCsv(testReport, filename);
      }
   }
}

export async function exportToCsv(
   testReport: TestReport,
   filename: string
): Promise<string> {
   const version = exportVersionToTest({
      versionToTest: testReport.versionToTest,
   });

   const results = groupBy(testReport.testResults, result => result.status);

   const fail = !!results["FAIL"]
      ? exportTestResults(Status.FAIL, results[Status.FAIL])
      : "";

   const skip = !!results["SKIP"]
      ? exportTestResults(Status.SKIP, results[Status.SKIP])
      : "";

   const pass = !!results["PASS"]
      ? exportTestResults(Status.PASS, results[Status.PASS])
      : "";

   const data = version + fail + skip + pass;
   await writeContentToFile(filename, data);
   return data;
}

function exportTestResults(status: Status, testCases: TestResult[]): string {
   const options = {
      cast: {
         boolean(value: boolean): string {
            if (value) {
               return "yes";
            } else {
               return "no";
            }
         },
      },
      columns: [
         { key: "featureName", header: "Feature" },
         { key: "scenarioName", header: "Scenario" },
         { key: "isCompleted", header: "Completed" },
         { key: "status", header: "Status" },
         { key: "defect", header: "Defect" },
      ],
      header: true,
   };
   return (
      exportStatusHeader({
         runStatus: status,
      }) + stringify(testCases, options)
   );
}

function exportVersionToTest(version: { versionToTest: string }): string {
   const options = {
      columns: [{ key: "versionToTest", header: "Version To Test" }],
      header: true,
   };
   return stringify([version], options);
}

function exportStatusHeader(status: { runStatus: Status }): string {
   const options = {
      columns: [{ key: "runStatus", header: "Status" }],
   };
   return stringify([status], options);
}

export async function exportToHtml(
   testReport: TestReport,
   filename: string
): Promise<string> {
   const completed = groupBy(
      testReport.testResults.filter(
         run => run.isRequired && run.isCompleted && run.status != Status.SKIP
      ),
      "featureName"
   );

   const skip = groupBy(
      testReport.testResults.filter(
         run => run.isRequired && run.isCompleted && run.status === Status.SKIP
      ),
      "featureName"
   );

   const todo = groupBy(
      testReport.testResults.filter(run => run.isRequired && !run.isCompleted),
      "featureName"
   );

   const notRequired = groupBy(
      testReport.testResults.filter(run => !run.isRequired),
      "featureName"
   );

   const template = fs.readFileSync("./src/lib/ejs/index.ejs", "utf-8");

   const data = {
      completed: completed,
      skip: skip,
      todo: todo,
      notRequired: notRequired,
      versionToTest: testReport.versionToTest,
   };
   const options = { filename: "./src/lib/ejs/index.ejs" };

   const html = ejs.render(template, data, options);

   await writeContentToFile(filename, html);
   return html;
}
