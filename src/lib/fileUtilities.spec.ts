import { findAllFilesForPattern } from "./fileUtilities";

test("test feature pattern", async () => {
  const files = await findAllFilesForPattern(
    "./test_data/features/first_feature_dir",
    "/**/*.feature"
  );
  expect(files.length).toBe(5);
});

test("test test plan pattern", async () => {
  const files = await findAllFilesForPattern(
    "./test_data/test_plans",
    "/**/*TestPlan*.csv"
  );
  expect(files.length).toBe(2);
});
