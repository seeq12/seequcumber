#!/usr/bin/env node
import { getFeaturesFromFiles } from "./lib/featureProcessor";

async function main(): Promise<void> {
  await getFeaturesFromFiles("./test_data");
}

main();
