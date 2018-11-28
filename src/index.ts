#!/usr/bin/env node

import glob from 'glob';
const Glob = glob.Glob;
import { getGherkinDocument } from './lib/featureProcessor';

async function main(): Promise<void> {
  // TODO pass in arguments from command line
  
  // read all features files recursively
  const pattern = "**/testdata/.feature*";
	const match = new Glob(pattern, (er, matches) => {
    er?   console.log(er.message) : console.log(matches); 
    return matches;
    
   });
  
   await getGherkinDocument(match.found);
  
}

main();
