import * as _ from "lodash";
import { findAllFilesForPattern } from "./fileUtilities";
import { fromPaths } from "gherkin";
import { io } from "cucumber-messages";
import Wrapper = io.cucumber.messages.Wrapper;
import IFeature = io.cucumber.messages.IFeature;

const FEATURE_SORT_PATTERN =  ['name', 'scenario.name'];

/**
 * Recursively traverses a directory to tranform all feature files into a sorted list of Gherkin Features
 *      Sort attributes: feature.name,scenario.name
 * @param directory Root directories to search recursively
 * @returns         List of Gherkin Features
 */
export async function getFeaturesFromDirectory(
  rootDirectory: string
): Promise<IFeature[]> {

  const files = await findAllFeatureFiles(rootDirectory);
  const messages = await parseFeatureFiles(files);

  const errors = messages
    //extract parsing errors
    .filter(message => !!message.attachment && !!message.attachment.data)
    //provide readable error message
    .map(message => `File: ${message.attachment.source.uri}\n ${message.attachment.data}\n`);

  if  (errors.length > 0) {
    throw new Error(`Gherkin Parsing Error\n${errors.join('\n')}`);
  }

  const validFeatures = messages
    //extract documents
    .map(message => message.gherkinDocument)
    //keep only valid features
    .filter(document => !!document && !!document.feature)
    //extract features
    .map(document => document.feature);

    return _.orderBy(validFeatures, FEATURE_SORT_PATTERN);
}



/**
 * Parse a feature file into a list of cucumber message wrappers
 * @param featureFiles    List of feature files
 * @returns               List of cucumber message wrappers
 */
export async function parseFeatureFiles(featureFiles: string[]): Promise<Wrapper[]> {
  const options = {
    includeGherkinDocument: true,
    includePickles: false,
    includeSource: false
  };
  const messageStream = fromPaths(featureFiles, options);

  // Transform Stream.Readable to Array
  return await new Promise<Wrapper[]>(
    (resolve: (wrappers: Wrapper[]) => void, reject: (error: Error) => void) => {
      const messages: Wrapper[] = [];
      messageStream.on('data', (message:Wrapper) => messages.push(message));
      messageStream.on('error', (error: Error) => reject(error));
      messageStream.on('end', () => resolve(messages));
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
  return await findAllFilesForPattern(directory, "/**/*.feature");
}

export function getScenariosFromFeature(feature: IFeature): IScenario[] {
  return feature.children
    .map(child => child.scenario)
    .filter(scenario => !!scenario);
}
