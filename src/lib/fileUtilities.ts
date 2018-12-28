import fs from "fs";
import glob from "glob";
import mkdirp from "mkdirp";
import path from "path";
import { promisify } from "util";

const globAsync = promisify(glob);
const asyncReadFile = promisify(fs.readFile);
const asyncWriteFile = promisify(fs.writeFile);
const mkdirpAsyn = promisify(mkdirp);

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

export async function writeContentToFile(
   filename: string,
   data: string
): Promise<void> {
   const dir = path.dirname(filename);
   await mkdirpAsyn(dir);
   await asyncWriteFile(filename, data);
}

export async function readContentFromFile(filename: string): Promise<string> {
   const buffer = await asyncReadFile(filename);
   return buffer.toString();
}

export function getFilename(name: string) {
   return path.basename(name, ".csv");
}
