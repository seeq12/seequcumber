import { TestCase } from "./testPlan";

export enum Status {
   PASS = "PASS",
   FAIL = "FAIL",
   SKIP = "SKIP",
   UNDEFINED = "UNDEFINED",
}

export namespace Status {
   export function getStatusFor(status: string): Status {
      switch (status.toUpperCase()) {
         case "PASS":
         case "PASSED":
            return Status.PASS;

         case "SKIP":
         case "SKIPPED":
            return Status.SKIP;

         case "FAIL":
         case "FAILED":
            return Status.FAIL;

         default:
            return Status.UNDEFINED;
      }
   }
}

export interface TestReport {
   versionToTest: string;
   testResults: TestResult[];
}

export interface TestResult extends TestCase {
   scenarioName: string;
   isCompleted: boolean;
   status: Status;
   defects: string;
}

// Extracted from Feature file
export interface FeatureRun {
   name: string;
   version: string;
   scenarios: ScenarioRun[];
}
export interface ScenarioRun {
   name: string;
   version: string;
   steps: StepRun[];
}

export interface StepRun {
   version: string;
   status: Status;
   defect: string;
}
