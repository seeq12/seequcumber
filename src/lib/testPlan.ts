import { sortBy } from "lodash";
import { io } from "cucumber-messages";
import IFeature = io.cucumber.messages.IFeature;

export interface Feature extends IFeature {
   filename: string;
}
export interface TestCase {
   // groupedFeatureName includes one level of subdirectory name
   // to sort related features according to their domain
   groupedFeatureName: string;
   isRequired: boolean;
   requiredBy: string;
}

export interface TestPlan {
   versionToTest: string;
   name: string;
   testCases: TestCase[];
}

export function sortTestCasesByFeatureName(testCases: TestCase[]): TestCase[] {
   return sortBy(testCases, ["groupedFeatureName"]);
}
