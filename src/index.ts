#!/usr/bin/env node

import { getGherkinDocuments } from './lib/featureProcessor';

async function main(): Promise<void> {
  await getGherkinDocuments('');
}

main();
