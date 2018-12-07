import { promisify } from "util";
import glob from "glob";

/**
 * Recursively find all files using a pattern in a root folder
 * @param directory Root folder
 * @param pattern File search pattern
 * @returns Arrays of files
 */
export async function findAllFilesForPattern(
  directory: string,
  pattern: string
): Promise<string[]> {
  const fileFindingExpression = directory + pattern;
  const globAsync = promisify(glob);
  const files = await globAsync(fileFindingExpression);
  return files;
}

