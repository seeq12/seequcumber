#!/usr/bin/env node

import { hydrateFeatures } from './lib/featureProcessor';

async function main(): Promise<void> {
  await hydrateFeatures('');
}

main();
