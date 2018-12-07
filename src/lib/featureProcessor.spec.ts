import {
  findAllFeatureFiles,
  getFeaturesFromFiles,
  parseFeatureFiles,
  streamToArray
} from "./featureProcessor";

test("get stream from file", () => {
  const stream = parseFeatureFiles(["./test_data/features/good.feature"]);
  expect(stream.readableHighWaterMark).toBe(16);
});

test("stream to array", async () => {
  const stream = parseFeatureFiles(["./test_data/features/good.feature"]);
  const array = await streamToArray(stream);
  expect(array.length).toBe(1);
});

test("read and parse good.feature file", async () => {
  const result = await getFeaturesFromFiles("./test_data");
  expect(result[0].name).toBe("Capsule Time");
});

test("error: parse inexistent feature file", async () => {
  const result = await getFeaturesFromFiles("./test_data/nope.feature");
  expect(result.length).toBe(0);
});

test("find all feature files recursively", async () => {
  const result = await findAllFeatureFiles(
    "./test_data/features/first_feature_dir"
  );
  expect(result.length).toBe(5);
});

test("error: look for files in an inexistent directory", async () => {
  const result = await findAllFeatureFiles("./nope");
  expect(result.length).toBe(0);
});

test("error: skip empty feature file ", async () => {
  const result = await getFeaturesFromFiles(
    "./test_data/features/first_feature_dir"
  );
  expect(result.length).toBe(4);
});

test("get valid Gherkin Documents from list of feature files", async () => {
  const features = await getFeaturesFromFiles(
    "./test_data/features/first_feature_dir"
  );
  expect(features[0].name).toBe("Capsule Time");
  expect(features[1].name).toBe("Formula Tool Variables");
  expect(features[2].name).toBe("Journal Entry Access");
  expect(features[3].name).toBe("Journal Search");
});