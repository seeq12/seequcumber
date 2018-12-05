import { io } from 'cucumber-messages';
import { fromPaths } from 'gherkin';
import glob from 'glob';
import Wrapper = io.cucumber.messages.Wrapper;
import IFeature = io.cucumber.messages.IFeature;
import IScenario = io.cucumber.messages.IScenario;
import * as Stream from 'stream';
import * as util from 'util';
import * as _ from 'lodash';

/**
 * Transform a list of feature files into a sorted list of Gherkin Features 
 *      Sort attributes: feature.name,scenario.name
 * @param directory Root directories to search recursively for feature files
 * @returns         List of Gherkin Features
 */
export async function getFeatures(
  rootDirectory: string
): Promise<IFeature[]> {
  const files = await findAllFeatureFiles(rootDirectory);
  const messages = await streamToArray(parseFeatureFiles(files));
  const validFeatures = messages
    //extract documents
    .map(message => message.gherkinDocument)
    //keep only valid features
    .filter(document => !!document && !!document.feature)
    //extract features
    .map(document => document.feature);
  return _.orderBy(validFeatures, ['name', 'scenario.name']);
}

/**
 * Parse a feature file into a Stream of cucumber messages
 * @param featureFiles    List of feature files
 * @returns               Stream of cucumber messages
 */
export function parseFeatureFiles(featureFiles: string[]): Stream.Readable {
  const options = {
    includeGherkinDocument: true,
    includePickles: false,
    includeSource: false
  };
  return fromPaths(featureFiles, options);
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
 * Recursively find all features in a root folder
 * @param directory Root folder (example: /testdata)
 * @returns Arrays of feature files
 */
export async function findAllFeatureFiles(
  directory: string
): Promise<string[]> {
  const pattern = directory + '/**/*.feature';
  const globAsync = util.promisify(glob);
  const files = await globAsync(pattern);
  return files;
}

export function getScenariosFromFeature (feature: IFeature): IScenario[] {
  return feature.children
      .map(child => child.scenario)
      .filter(scenario => !!scenario);
}


