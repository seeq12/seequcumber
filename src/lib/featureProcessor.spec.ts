import {
  findAllFeatureFiles,
  getFeaturesFromDirectory,
  parseFeatureFiles
} from "./featureProcessor";

describe("feature processor", () => {
  const goodFeatureFile = './test_data/features/good.feature';
  const badFeatureDir = './test_data/features/bad_features';
  const goodFeatureDir = './test_data/features/first_feature_dir';

  it("parses a good feature file", async () => {
    const result = await parseFeatureFiles([goodFeatureFile]);
    expect(result.length).toBe(1);
  });

  it("handles feature file with parsing errors", async () => {
     try {
       await getFeaturesFromDirectory(badFeatureDir);
     } catch (error) {
      expect(error.toString()).toContain('Gherkin Parsing Error');
     }

  });

  it("gets feature objects from a file", async () => {
    const result = await getFeaturesFromDirectory(goodFeatureDir);
    expect(result[0].name).toBe("Capsule Time");
  });

  it("handles an inexistent feature file", async () => {
    const result = await getFeaturesFromDirectory("./test_data/nope.feature");
    expect(result.length).toBe(0);
  });

  it("finds all feature files recursively", async () => {
    const result = await findAllFeatureFiles(
      "./test_data/features/first_feature_dir"
    );
    expect(result.length).toBe(5);
  });

  it("handles inexistent feature directory", async () => {
    const result = await findAllFeatureFiles("./nope");
    expect(result.length).toBe(0);
  });

  it("handles empty feature file ", async () => {
    const result = await getFeaturesFromDirectory(
      "./test_data/features/first_feature_dir"
    );
    expect(result.length).toBe(4);
  });


  it("gets valid Gherkin Documents from list of feature files", async () => {
    const features = await getFeaturesFromDirectory(
      "./test_data/features/first_feature_dir"
    );
    expect(features[0].name).toBe("Capsule Time");
    expect(features[1].name).toBe("Formula Tool Variables");
    expect(features[2].name).toBe("Journal Entry Access");
    expect(features[3].name).toBe("Journal Search");
  });
});
