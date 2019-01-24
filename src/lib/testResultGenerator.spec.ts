import { generateTestReport } from "./testResultGenerator";
import { TestResult, Status, TestReport } from "./testResult";
import { Format } from "./testResultFormatter";

describe("testResultGenerator", () => {
   const goodFeatureDir = "./test_data/features/first";

   const failed: TestResult = {
      groupedFeatureName: "/first/First",
      scenarioName: "Scenario 3 failed with defect",
      requiredBy: "Story-1",
      isRequired: true,
      isCompleted: true,
      defects: "defect-1",
      status: Status.FAIL,
   };

   const passed: TestResult = {
      groupedFeatureName: "/first/First",
      scenarioName: "Scenario 1 passed",
      requiredBy: "Story-1",
      isRequired: true,
      isCompleted: true,
      defects: "",
      status: Status.PASS,
   };

   const todo: TestResult = {
      groupedFeatureName: "/first/First",
      scenarioName: "Scenario 8 all steps incomplete",
      requiredBy: "Story-1",
      isRequired: true,
      isCompleted: false,
      defects: "",
      status: Status.UNDEFINED,
   };

   const skipped: TestResult = {
      groupedFeatureName: "/first/First",
      scenarioName: "Scenario 2",
      requiredBy: "Story-1",
      isRequired: true,
      isCompleted: true,
      defects: "",
      status: Status.SKIP,
   };

   const notRequired: TestResult = {
      groupedFeatureName: "/first/second/Fourth",
      scenarioName: "A non required feature scenario",
      requiredBy: "",
      isRequired: false,
      isCompleted: false,
      defects: "",
      status: Status.UNDEFINED,
   };

   it("derives status", () => {
      const undefinedStatus = Status.getStatusFor(Status.UNDEFINED);
      expect(undefinedStatus).toBe("UNDEFINED");

      const passStatus = Status.getStatusFor(Status.PASS);
      expect(passStatus).toBe("PASS");
      const passedStatus = Status.getStatusFor("passed");
      expect(passedStatus).toBe("PASS");

      const failStatus = Status.getStatusFor(Status.FAIL);
      expect(failStatus).toBe("FAIL");
      const failedStatus = Status.getStatusFor("FAILED");
      expect(failedStatus).toBe("FAIL");

      const skipStatus = Status.getStatusFor(Status.SKIP);
      expect(skipStatus).toBe("SKIP");
      const skippedStatus = Status.getStatusFor("passed");
      expect(skippedStatus).toBe("PASS");
   });

   it("generates a HTML test report", async () => {
      const report = await generateTestReport(
         goodFeatureDir,
         "./test_data/test_plans/Story-1-TestPlan.csv",
         "./test_results/TestReportByGenerator.html",
         Format.HTML
      );
      expect(report.versionToTest).toBe("0.40.00");

      expect(getResult(failed.scenarioName, report)).toEqual(failed);
      expect(getResult(passed.scenarioName, report)).toEqual(passed);
      expect(getResult(todo.scenarioName, report)).toEqual(todo);
      expect(getResult(skipped.scenarioName, report)).toEqual(skipped);
      expect(getResult(notRequired.scenarioName, report)).toEqual(notRequired);
   });
});

function getResult(scenarioName: string, report: TestReport): TestResult {
   return report.testResults.find(
      scenario => scenario.scenarioName === scenarioName
   );
}
