import fs from "fs";
import glob from "glob";
import mkdirp from "mkdirp";
import path from "path";
import { promisify } from "util";

const globAsync = promisify(glob);
const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);
const mkdirpAsync = promisify(mkdirp);

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
   const fileFindingExpression = path.join(directory, pattern);
   return globAsync(fileFindingExpression);
}

export async function writeContentToFile(
   filename: string,
   data: string
): Promise<void> {
   const dir = path.dirname(filename);
   await mkdirpAsync(dir);
   writeFileAsync(filename, data);
}

export async function readContentFromFile(filename: string): Promise<string> {
   const buffer = await readFileAsync(filename);
   const data = buffer.toString();

   if (!data) {
      throw new Error(`Cannot read test plan: ${filename}`);
   }
   return data;
}

export function getFilename(name: string) {
   return path.basename(name, ".csv");
}
