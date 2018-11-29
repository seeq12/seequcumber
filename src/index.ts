#!/usr/bin/env node

import { getGherkinDocument } from './lib/featureProcessor';

async function main(): Promise<void> {
  // TODO pass in arguments from command line
  await getGherkinDocument('');
}

main();
