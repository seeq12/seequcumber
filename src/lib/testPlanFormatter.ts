import stringify from "csv-stringify/lib/sync";
import { TestCase, TestPlan } from "./testPlan";
import { writeContentToFile } from "./fileUtilities";

/**
 * Export test plan to csv file
 * @returns the content of the csv file
 */
export async function exportTestPlan(testPlan: TestPlan): Promise<string> {
   const data =
      exportVersionToTest({ versionToTest: testPlan.versionToTest }) +
      exportTestCases(testPlan.testCases);
   await writeContentToFile(testPlan.name, data);
   return data;
}

function exportTestCases(testCases: TestCase[]): string {
   const options = {
      cast: {
         boolean(value: boolean): string {
            return value ? "yes" : "no";
         },
      },
      columns: [
         { key: "featureName", header: "Feature" },
         { key: "isRequired", header: "Required" },
         { key: "requiredBy", header: "Required By" },
      ],
      header: true,
   };
   return stringify(testCases, options);
}

function exportVersionToTest(version: { versionToTest: string }): string {
   const options = {
      columns: [{ key: "versionToTest", header: "Version To Test" }],
      header: true,
   };
   return stringify([version], options);
}
