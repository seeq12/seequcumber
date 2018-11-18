#!/usr/bin/env node

export * from './lib/async';
export * from './lib/hash';
export * from './lib/number';

import * as Path from 'path';
import { CLI, Shim } from 'clime';

// The second parameter is the path to folder that contains command modules.
let cli = new CLI('seequcumber', Path.join(__dirname, 'commands'));

// Clime in its core provides an object-based command-line infrastructure.
// To have it work as a common CLI, a shim needs to be applied:
let shim = new Shim(cli);
shim.execute(process.argv).then(() => {
  // Do nothing when all is said and done. (Gets rid of IntelliJ warning.)
});


