import { sortBy } from "lodash";
import { io } from "cucumber-messages";
import IFeature = io.cucumber.messages.IFeature;

export interface Feature extends IFeature {
   filename: string;
}
export interface TestCase {
   // Grouped feature include subdirectory names
   // to group related features according to their domain
   groupedFeatureName: string;
   isRequired: boolean;
   requiredBy: string;
}

export interface TestPlan {
   versionToTest: string;
   name: string;
   testCases: TestCase[];
}

export function testCaseExists(
   testCase: TestCase,
   testCases: TestCase[]
): boolean {
   return !!findTestCase(testCase, testCases);
}

export function findTestCase(
   testCase: TestCase,
   testCases: TestCase[]
): TestCase {
   return testCases.find(item => item.groupedFeatureName === testCase.groupedFeatureName);
}

export function sortTestCasesByFeatureName(testCases: TestCase[]): TestCase[] {
   return sortBy(testCases, ["groupedFeatureName"]);
}
