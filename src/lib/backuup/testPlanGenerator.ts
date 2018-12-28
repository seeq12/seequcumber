import { exportTestPlan } from "./testPlanFormatter";
import { io } from "cucumber-messages";
import { loadFeaturesFrom } from "./featureProcessor";
import { TestCase } from "./testPlan";
import IFeature = io.cucumber.messages.IFeature;
import IScenario = io.cucumber.messages.IScenario;

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
   return await exportTestPlan({
      versionToTest,
      name: filename,
      testCases,
   });
}

/**
 * Generate a list of unique Test Cases (Scenarios) from a list of Features
 * @param features
 */
export function generateTestCases(features: IFeature[]): TestCase[] {
   const testCases: TestCase[] = [];

   features.map(feature => {
      // Add the entire feature as the first test case
      testCases.push({
         featureName: feature.name,
         isRequired: false,
         scenarioName: "",
         requiredBy: "",
      });

      // Add each scenario
      const scenario = generateScenarios(feature);
      scenario.map(scenario => {
         const testCase = {
            featureName: feature.name,
            isRequired: false,
            scenarioName: scenario.name,
            requiredBy: "",
         };
         testCases.push(testCase);
      });
   });
   return testCases;
}

export function generateScenarios(feature: IFeature): IScenario[] {
   return feature.children
      .map(child => child.scenario)
      .filter(scenario => !!scenario);
}
