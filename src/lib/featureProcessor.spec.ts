import {
  findAllFeatureFiles,
  parseFeatureFiles,
  streamToArray,
  getFeatures
} from './featureProcessor';

test('get stream from file', () => {
  const stream = parseFeatureFiles(['./testdata/good.feature']);
  expect(stream.readableHighWaterMark).toBe(16);
});

test('stream to array', async () => {
  const stream = parseFeatureFiles(['./testdata/good.feature']);
  const array = await streamToArray(stream);
  expect(array.length).toBe(1);
});

test('read and parse good.feature file', async () => {
  const result = await getFeatures('./testdata');
  expect(result[0].name).toBe('Capsule Time');
});

test('error: parse inexistent feature file', async () => {
  const result = await getFeatures('./testdata/nope.feature');
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
  const result = await getFeatures('./testdata/firstDirectory');
  expect(result.length).toBe(4);
});

test('get valid Gherkin Documents from list of feature files', async () => {
  const features = await getFeatures('./testdata/firstDirectory');
  expect(features[0].name).toBe('Capsule Time');
  expect(features[1].name).toBe('Formula Tool Variables');
  expect(features[2].name).toBe('Journal Entry Access');
  expect(features[3].name).toBe('Journal Search');
});


