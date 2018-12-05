import {
  generateStarterTestCases,
  exportToCsv,
  TestCase
} from './testPlanGenerator';

import {
  getFeatures
} from './featureProcessor';


test('generate test cases from a directory of feature files', async () => {
  const features = await getFeatures('./testdata/firstDirectory');
  const testCases =  generateStarterTestCases(features);
  expect(testCases.length).toBe(14);
  expect(testCases[0].featureName).toBe('Capsule Time');
  expect(testCases[0].scenarioName).toBe('Basic Capsule Time');
  expect(testCases[0].required).toBe(false);
  expect(testCases[0].completed).toBe(false);
});

test('export a list of test cases to csv format', async () => {
  const features = await getFeatures('./testdata/firstDirectory');
  const testCases =  generateStarterTestCases(features);
  await exportToCsv(testCases,'./test_results/TestPlan_firstDirectory.csv');
});

test('export test cases with non-default values',async () => {
  const requireTestCase = new TestCase('feature_a','scenario_a',true,false);
  const completedTestCase = new TestCase('feature_b','scenario_b',false,true);
  const requiredCompletedTestCase = new TestCase('feature_c','scenario_c',true,true);
   
  await exportToCsv([requireTestCase,completedTestCase,requiredCompletedTestCase],'./test_results/TestPlan_testCast.csv');
})