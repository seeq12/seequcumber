import {
   findAllFilesForPattern,
   readContentFromFile,
   getFilename,
} from "./fileUtilities";
import path from "path";

describe("fileUtilities", () => {
   const GOOD_FEATURE_DIR = "./test_data/features/first";
   const GOOD_TEST_PLAN_DIR = "./test_data/test_plans";
   const BAD_TEST_PLAN_DIR = "./test_data/bad_test_plans";

   it("find features files with pattern", async () => {
      const files = await findAllFilesForPattern(
         GOOD_FEATURE_DIR,
         "**/*.feature"
      );
      expect(files.length).toBe(5);
   });

   it("finds test plans with pattern", async () => {
      const files = await findAllFilesForPattern(
         GOOD_TEST_PLAN_DIR,
         "**/*TestPlan*.csv"
      );
      expect(files.length).toBe(1);
   });

   it("error: try to read inexistant test plan", async () => {
      let errorMessage;
      try {
         await readContentFromFile(
            path.join(BAD_TEST_PLAN_DIR, "EmptyTestPlan.csv")
         );
      } catch (error) {
         errorMessage = error.toString();
      }
      expect(errorMessage).toContain("Cannot read test plan");
   });

   it("can get a csv filename", () => {
      getFilename(path.join(GOOD_TEST_PLAN_DIR, "Story-q-GooTestPlan.csv"));
   });
});
