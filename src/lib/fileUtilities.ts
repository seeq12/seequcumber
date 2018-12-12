import { promisify } from "util";
import glob from "glob";
import fs from "fs";
import mkdirp from "mkdirp";
import path from "path";

const globAsync = promisify(glob);

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
  return await globAsync(fileFindingExpression);
}

export async function writeContentToFile(filename: string, data: string) {
  const dir = path.dirname(filename);
  const mkdirpAsyn = promisify(mkdirp);
  await mkdirpAsyn(dir);

  const asyncWriteFile = promisify(fs.writeFile);
  return await asyncWriteFile(filename, data);
}

export async function readContentFromFile(filename: string): Promise<string> {
  const asyncReadFile = promisify(fs.readFile);
  const buffer = await asyncReadFile(filename);
  return buffer.toString();
}
