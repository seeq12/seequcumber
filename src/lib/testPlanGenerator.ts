import { exportTestPlan as exportTestPlanToCsv } from "./testPlanFormatter";
import { loadFeaturesFrom } from "./featureProcessor";
import { TestCase, Feature } from "./testPlan";

/**
 * Traverse a feature file directory, collect test cases (scenarios)
 * and write test plan template to csv file
 * @param features
 */
export async function generateTemplate(
   featureDirectory: string,
   filename: string,
   versionToTest: string
): Promise<string> {
   const features = await loadFeaturesFrom(featureDirectory);
   const testCases = generateTestCases(features);
   return await exportTestPlanToCsv({
      versionToTest,
      name: filename,
      testCases,
   });
}

/**
 * Generate a list of unique Test Cases  from a list of Features
 * @param features
 */
export function generateTestCases(features: Feature[]): TestCase[] {
   const testCases: TestCase[] = [];

   features.map(feature => {
      testCases.push({
         groupedFeatureName: feature.filename,
         isRequired: false,
         requiredBy: "",
      });
   });
   return testCases;
}
