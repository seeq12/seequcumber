import { io } from 'cucumber-messages';
import { fromPaths } from 'gherkin';
import glob from 'glob';
import Wrapper = io.cucumber.messages.Wrapper;
import IGherkinDocument = io.cucumber.messages.IGherkinDocument;
import * as Stream from 'stream';
import * as util from 'util';

/**
 * Parse a feature file into a Stream of cucumber messages
 * @param directory    List of directories with feature files
 * @returns            Stream of cucumber messages
 */
export function parseFeatureFiles(...directory: string[]): Stream.Readable {
  const options = {
    includeGherkinDocument: true,
    includePickles: false,
    includeSource: false
  };
  return fromPaths(directory, options);
}

/**
 * Transform a Stream of cucumber messages into an Array
 * @param readableStream  Stream of cucumber messages
 * @returns               List of cucumber messages
 */
export async function streamToArray(
  readableStream: Stream.Readable
): Promise<Wrapper[]> {
  return new Promise<Wrapper[]>(
    (resolve: (wrappers: Wrapper[]) => void, reject: (err: Error) => void) => {
      const items: Wrapper[] = [];
      readableStream.on('data', items.push.bind(items));
      readableStream.on('error', (err: Error) => reject(err));
      readableStream.on('end', () => resolve(items));
    }
  );
}

/**
 * Parse a feature file into a Gherkin Document
 * @param directory List of directories with feature files
 * @returns         Gherkin Document
 */
export async function getGherkinDocument(
  ...directory: string[]
): Promise<IGherkinDocument> {
  const messages = await streamToArray(parseFeatureFiles(...directory));
  const gherkinMessage = messages.find(message => !!message);
  return gherkinMessage ? gherkinMessage.gherkinDocument : undefined;
}

/**
 * Recursively find all features in a root folder
 * @param directory Root folder (example: /Users/Me/testdata)
 * @returns Arrays of  feature files
 */
export async function findAllFeatureFiles(
  directory: string
): Promise<string[]> {
  const pattern = directory + '/**/*.feature';
  const globAsync = util.promisify(glob);
  const files = await globAsync(pattern);
  return files;
}
