import { io } from 'cucumber-messages';
import { fromPaths } from 'gherkin';
import glob from 'glob';
import Wrapper = io.cucumber.messages.Wrapper;
import IGherkinDocument = io.cucumber.messages.IGherkinDocument;
import * as Stream from 'stream';
import * as util from 'util';
import * as _ from 'lodash';

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
 * Transform a Stream of cucumber messages into a list of messages
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
 * Transform a list of feature files into a list of Gherkin Documents
 * @param directory List of directories with feature files
 * @returns         List of Gherkin Documents
 */
export async function getGherkinDocuments(
  ...directory: string[]
): Promise<IGherkinDocument[]> {
  const messages = await streamToArray(parseFeatureFiles(...directory));
  const validDocuments = messages
    .map(message => message.gherkinDocument)
    .filter(document => !!document && !!document.feature)
  return _.orderBy(validDocuments, ['feature.name', 'scenario.name']);
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

