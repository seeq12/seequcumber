import { io } from 'cucumber-messages';
import IGherkinDocument = io.cucumber.messages.IGherkinDocument;
import {getScenariosFromFeature} from './featureProcessor';
export class TestCase {
    featureName: string;
    scenarioName : string;
    lastRunDate:string;
    required: boolean;
    completed: boolean;

    constructor(featureName:string, scenarioName:string, required:boolean, lastRunDate:string, completed: boolean)  {
        this.featureName = featureName;
        this.scenarioName = scenarioName;
        this.required = required;
        this.lastRunDate = lastRunDate;
        this.completed = completed;
    }   
}

export function generateTestCases(documents: IGherkinDocument[]) : TestCase[] {
    for (const document of documents) {
        console.log(document.uri);
        console.log(getScenariosFromFeature(document.feature));  
    }  
    
    return [new TestCase('','',true,'',true)];
}
