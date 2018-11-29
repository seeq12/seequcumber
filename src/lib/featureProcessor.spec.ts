import * as featureProcessor from './featureProcessor';

test('get stream from file', () => {
  const stream = featureProcessor.parseFeatureFiles('./testdata/good.feature');
  expect(stream.readableHighWaterMark).toBe(16);
});

test('stream to array', async () => {
  const stream = featureProcessor.parseFeatureFiles('./testdata/good.feature');
  const array = await featureProcessor.streamToArray(stream);
  expect(array.length).toBe(1);
});

test('read and parse good.feature file', async () => {
  const result = await featureProcessor.getGherkinDocument(
    './testdata/good.feature'
  );
  expect(result.feature.name).toBe('Formula Tool Variables');
});

test('error: parse inexistent feature file', async () => {
  const result = await featureProcessor.getGherkinDocument(
    './testdata/nope.feature'
  );
  expect(result).toBe(undefined);
});

test('find all feature files recursively', async () => {
  const result = await featureProcessor.findAllFeatureFiles(
    '/Users/EliseLebeau/git/seequcumber/testdata/someDirectory'
  );
  expect(result.length).toBe(2);
});

test('error: find files in an inexistent directory', async () => {
  const result = await featureProcessor.findAllFeatureFiles(
    '/Users/EliseLebeau/git/seequcumber/nope'
  );
  expect(result.length).toBe(0);
});
