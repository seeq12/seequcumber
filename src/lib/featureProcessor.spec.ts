import {
   findAllFeatureFiles,
   loadFeaturesFrom,
   parseFeatureFile,
} from "./featureProcessor";

describe("featureProcessor", () => {
   const goodFeatureFile = "./test_data/features/good.feature";
   const badFeatureDir = "./test_data/features/bad_features";
   const goodFeatureDir = "./test_data/features/first";

   it("parses a good feature file", async () => {
      const result = await parseFeatureFile(goodFeatureFile);
      expect(result.length).toBe(1);
   });

   it("handles feature file with parsing errors", async () => {
      let errorMessage;
      try {
         await loadFeaturesFrom(badFeatureDir);
      } catch (error) {
         errorMessage = error.toString();
      }
      expect(errorMessage).toContain("Gherkin Parsing Error");
   });

   it("gets feature objects from a file", async () => {
      const result = await loadFeaturesFrom(goodFeatureDir);
      expect(result[0].name).toBe("First Feature");
   });

   it("handles an inexistent feature file", async () => {
      try {
         await loadFeaturesFrom("./test_data/inexistent.feature");
      } catch (e) {
         expect(e.toString()).toContain("Feature file is empty");
      }
   });

   it("finds all feature files recursively", async () => {
      const result = await findAllFeatureFiles("./test_data/features/first");
      expect(result.length).toBe(5);
   });

   it("handles inexistent feature directory", async () => {
      const result = await findAllFeatureFiles("./inexistent");
      expect(result.length).toBe(0);
   });

   it("handles empty feature file ", async () => {
      const result = await loadFeaturesFrom(goodFeatureDir);
      expect(result.length).toBe(4);
   });

   it("gets valid Gherkin Documents from list of feature files", async () => {
      const features = await loadFeaturesFrom(goodFeatureDir);
      expect(features[0].name).toBe("First Feature");
      expect(features[1].name).toBe("Fourth Feature");
      expect(features[2].name).toBe("Second Feature");
      expect(features[3].name).toBe("Third Feature");
   });

   it("produces error on invalid gherkin", async () => {
      try {
         await loadFeaturesFrom(badFeatureDir);
      } catch (e) {
         expect(e.toString()).toContain("Gherkin Parsing Error");
      }
   });
});
