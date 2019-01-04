import * as gherkinParser from "gherkin";
import { findAllFilesForPattern } from "./fileUtilities";
import { flatten, sortBy } from "lodash";
import { io } from "cucumber-messages";
import Wrapper = io.cucumber.messages.Wrapper;
import { Feature } from "./testPlan";
import path from "path";

/**
 * Recursively traverses a directory to tranform all feature files into a sorted list of Gherkin Features
 *      sorted by the feature.name
 * @param directory Root directories to search recursively
 * @returns         List of Gherkin Features
 */
export async function loadFeaturesFrom(
   rootDirectory: string
): Promise<Feature[]> {
   const files = await findAllFeatureFiles(rootDirectory);

   const messages: Wrapper[] = flatten(
      await Promise.all(files.map(file => parseFeatureFile(file)))
   );

   const errors = messages
      // extract parsing errors
      .filter(message => !!message.attachment && !!message.attachment.data)
      .map(
         message =>
            `File: ${message.attachment.source.uri}\r\n ${
               message.attachment.data
            }\r\n`
      );

   if (errors.length > 0) {
      throw new Error(`Gherkin Parsing Error\r\n${errors.join("\r\n")}`);
   }

   if (!messages.length) {
      throw new Error(`Feature file is empty: in ${rootDirectory}`);
   }

   const validFeatures: Feature[] = messages
      .map(message => message.gherkinDocument)
      // keep only valid features
      .filter(document => !!document && !!document.feature)
      .map(document => {
         return {
            ...document.feature,
            // Used to group features by their directory location
            filename: formatFeatureName(document.uri),
         };
      });

   return sortBy(validFeatures, "filename");
}

function formatFeatureName(name: string): string {
   return name
      .replace(".feature", "")
      .replace("features", "")
      .replace("behavior", "")
      .replace(new RegExp("\\.+", "g"), "")
      .replace("manual", "")
      .replace("test_data", "")
      .replace(new RegExp("/+", "g"), "/")
      .replace(new RegExp(`${path.sep}+`, "g"), path.sep);
}

/**
 * Parse a feature file into a list of cucumber message wrappers
 * @param featureFiles    List of feature files
 * @returns               List of cucumber message wrappers
 */
export async function parseFeatureFile(
   featureFiles: string
): Promise<Wrapper[]> {
   const options = {
      includeGherkinDocument: true,
      includePickles: false,
      includeSource: false,
   };

   // Parsing multiple paths triggers a race condition in gherkin-parser
   // Parse one at a time
   const messageStream = gherkinParser.fromPaths([featureFiles], options);

   // Transform Stream.Readable to Array
   return new Promise<Wrapper[]>(
      (
         resolve: (wrappers: Wrapper[]) => void,
         reject: (error: Error) => void
      ) => {
         const messages: Wrapper[] = [];
         messageStream.on(
            "data",
            (message: Wrapper) => !!message && messages.push(message)
         );
         messageStream.on("error", (error: Error) => reject(error));
         messageStream.on("end", () => resolve(messages));
      }
   );
}

/**
 * Recursively find all features in a root folder
 * @param directory Root folder
 * @returns Arrays of feature files
 */
export function findAllFeatureFiles(directory: string): Promise<string[]> {
   return findAllFilesForPattern(directory, "/**/*.feature");
}
