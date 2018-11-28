#!/usr/bin/env node

import glob from 'glob';
const Glob = glob.Glob;
import { getGherkinDocument } from './lib/featureProcessor';

async function main(): Promise<void> {
  // TODO pass in arguments from command line

   await getGherkinDocument('');
  
}

main();
