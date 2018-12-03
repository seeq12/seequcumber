import {
  findAllFeatureFiles,
  getGherkinDocuments,
  parseFeatureFiles,
  streamToArray
} from './featureProcessor';

test('get stream from file', () => {
  const stream = parseFeatureFiles('./testdata/good.feature');
  expect(stream.readableHighWaterMark).toBe(16);
});

test('stream to array', async () => {
  const stream = parseFeatureFiles('./testdata/good.feature');
  const array = await streamToArray(stream);
  expect(array.length).toBe(1);
});

test('read and parse good.feature file', async () => {
  const result = await getGherkinDocuments('./testdata/good.feature');
  expect(result[0].feature.name).toBe('Formula Tool Variables');
});

test('error: parse inexistent feature file', async () => {
  const result = await getGherkinDocuments('./testdata/nope.feature');
  expect(result.length).toBe(0);
});

test('find all feature files recursively', async () => {
  const result = await findAllFeatureFiles('./testdata/firstDirectory');
  expect(result.length).toBe(5);
});

test('error: look for files in an inexistent directory', async () => {
  const result = await findAllFeatureFiles('./nope');
  expect(result.length).toBe(0);
});

test('error: skip empty feature file ', async () => {
  const files = await findAllFeatureFiles('./testdata/firstDirectory');
  const result = await getGherkinDocuments(...files);
  expect(result.length).toBe(4);
});

test('get valid Gherkin Documents from list of feature files', async () => {
  const files = await findAllFeatureFiles('./testdata/firstDirectory');
  const result = await getGherkinDocuments(...files);
  expect(result[0].feature.name).toBe('Capsule Time');
  expect(result[1].feature.name).toBe('Formula Tool Variables');
  expect(result[2].feature.name).toBe('Journal Entry Access');
  expect(result[3].feature.name).toBe('Journal Search');
});
