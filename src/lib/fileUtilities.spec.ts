import { findAllFilesForPattern } from "./fileUtilities";

describe("File Utilities", () => {

test("should find files following a feature pattermn", async () => {
  const files = await findAllFilesForPattern(
    "./test_data/features/first_feature_dir",
    "/**/*.feature"
  );
  expect(files.length).toBe(5);
});
})



