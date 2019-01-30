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
export interface FeatureResults {
   name: string;
   version: string;
   scenarios: ScenarioResults[];
}
export interface ScenarioResults {
   name: string;
   version: string;
   steps: StepResults[];
}

export interface StepResults {
   version: string;
   status: Status;
   defect: string;
}
