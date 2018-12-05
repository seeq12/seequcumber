import stringify  from 'csv-stringify/lib/sync';
import { io } from 'cucumber-messages';
import IFeature = io.cucumber.messages.IFeature;
import fs from 'fs';
import path from 'path';
import mkdirp from 'mkdirp';
import {getScenariosFromFeature} from './featureProcessor';
import * as util from 'util';

export class TestCase {
    constructor(public featureName:string,
        public scenarioName:string,
        public required:boolean,
        public completed:boolean
    ) {}   
}

export function generateStarterTestCases(features: IFeature[]) : TestCase[] {
    const testCases : TestCase[] = [];
    for (const feature of features) {
       const scenarios = getScenariosFromFeature(feature);
        for (const scenario of scenarios)   {
           testCases.push(new TestCase(feature.name, scenario.name, false,false));
        }     
    }
    return testCases;
}

export async function exportToCsv(testCases: TestCase[], filename: string):Promise<void> {
    const options = {
        header: true,
        columns:  {
            featureName:'Feature',
            scenarioName:'Scenario',
            required:'Required',
            completed:'Completed'
        },
        cast: { 
            boolean: function(value:boolean) {
                 if (value) return 'yes'
                 else return 'no' ; 
            }
        }
    }

    const data = stringify(testCases, options);

    //validate target directory
    const dir = path.dirname(filename);
    const mkdirpAsyn = util.promisify(mkdirp);
    await mkdirpAsyn(dir);

    const asyncWriteFile = util.promisify(fs.writeFile);
    return await asyncWriteFile(filename, data);
}
