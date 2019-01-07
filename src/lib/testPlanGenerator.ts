import { exportTestPlan as exportTestPlanToCsv } from "./testPlanFormatter";
import { loadFeaturesFrom } from "./featureProcessor";
import { TestCase, Feature } from "./testPlan";

/**
 * Traverse a feature file directory, collect test cases
 * and write test plan template to csv file
 */
export async function generateTemplate(
   featureDirectory: string,
   filename: string,
   versionToTest: string
): Promise<string> {
   const features = await loadFeaturesFrom(featureDirectory);
   const testCases = generateTestCases(features);
   return exportTestPlanToCsv({
      versionToTest,
      name: filename,
      testCases,
   });
}

/**
 * Generate a list of Features to be used as Test Cases
 */
export function generateTestCases(features: Feature[]): TestCase[] {
   return features.map(feature => ({
     groupedFeatureName: feature.filename,
      isRequired: false,
      requiredBy: "",
   }));
}
