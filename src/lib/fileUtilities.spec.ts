import { findAllFilesForPattern } from "./fileUtilities";

describe("fileUtilities", () => {
   const goodFeatureDir = "./test_data/features/first";
   const goodTestPlanDir = "./test_data/test_plans";

   it("find features files with pattern", async () => {
      const files = await findAllFilesForPattern(
         goodFeatureDir,
         "/**/*.feature"
      );
      expect(files.length).toBe(5);
   });

   it("finds test plans with pattern", async () => {
      const files = await findAllFilesForPattern(
         goodTestPlanDir,
         "/**/*TestPlan*.csv"
      );
      expect(files.length).toBe(2);
   });
});
