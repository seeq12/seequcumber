import { sortBy } from "lodash";
import { io } from "cucumber-messages";
import IFeature = io.cucumber.messages.IFeature;

export interface Feature extends IFeature {
   filename: string;
}
export interface TestCase {
   featureName: string;
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
   return findIndexForTestCase(testCase, testCases) >= 0;
}

export function findIndexForTestCase(
   testCase: TestCase,
   testCases: TestCase[]
): number {
   return testCases.findIndex(
      item => item.featureName === testCase.featureName
   );
}

export function sortTestCasesByFeatureName(testCases: TestCase[]): TestCase[] {
   return sortBy(testCases, ["featureName"]);
}
