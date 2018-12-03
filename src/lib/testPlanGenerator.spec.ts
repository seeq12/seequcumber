import {
  generateTestCases
} from './testPlanGenerator';

import {
  getGherkinDocuments,
  findAllFeatureFiles
} from './featureProcessor';

test('generate test cases from gherkin documents', async  () => {
  const files = await findAllFeatureFiles('./testdata/firstDirectory');
  const documents = await getGherkinDocuments(...files);
  const testCases = generateTestCases(documents);
  expect(testCases.length).toBe(1);

});