#!/usr/bin/env node

import { getGherkinDocuments } from './lib/featureProcessor';

async function main(): Promise<void> {
  // TODO pass in arguments from command line
  await getGherkinDocuments('');
}

main();
