#!/usr/bin/env node

import { getFeatures } from './lib/featureProcessor';

async function main(): Promise<void> {
  await getFeatures('');
}

main();
