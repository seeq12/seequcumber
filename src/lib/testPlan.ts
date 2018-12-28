import { sortBy } from "lodash";

export interface TestCase {
   featureName: string;
   scenarioName: string;
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
   return findIndexForTestCase(testCase, testCases) > 0;
}

export function findIndexForTestCase(
   testCase: TestCase,
   testCases: TestCase[]
): number {
   return testCases.findIndex(
      item =>
         item.featureName === testCase.featureName &&
         item.scenarioName === testCase.scenarioName
   );
}

export function sortTestCases(testCases: TestCase[]): TestCase[] {
   return sortBy(testCases, ["featureName", "scenarioName"]);
}
