#!/usr/bin/env node
import { getFeaturesFromDirectory } from "./lib/featureProcessor";

async function main(): Promise<void> {
  await getFeaturesFromDirectory("./test_data");
}

main();
