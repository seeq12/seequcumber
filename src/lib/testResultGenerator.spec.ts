import { generateTestReport } from "./testResultGenerator";
import { TestResult, Status } from "./testResult";
import { some } from "lodash";
import { loadTestCases } from "./releaseTestPlanGenerator";
import { Format } from "./testResultFormatter";

describe("testRunGenerator", () => {
   const goodFeatureDir = "./test_data/features/first";

   const failed: TestResult = {
      groupedFeatureName: "/first/First",
      scenarioName: "Basic Capsule Time",
      requiredBy: "Story-1",
      isRequired: true,
      isCompleted: true,
      defects: "defect-1",
      status: Status.FAIL,
   };

   const passed: TestResult = {
      groupedFeatureName: "/first/First",
      scenarioName: "Adjusting Conditions in the Details Panel",
      requiredBy: "Story-1",
      isRequired: true,
      isCompleted: true,
      defects: "",
      status: Status.PASS,
   };

   const todo: TestResult = {
      groupedFeatureName: "/first/First",
      scenarioName: "Limiting the number of capsule series for performance",
      requiredBy: "Story-1",
      isRequired: true,
      isCompleted: false,
      defects: "",
      status: Status.PASS,
   };

   const skipped: TestResult = {
      groupedFeatureName: "/first/First",
      scenarioName: "Capsule Time Alignments",
      requiredBy: "Story-1",
      isRequired: true,
      isCompleted: true,
      defects: "",
      status: Status.SKIP,
   };

   const notRequired: TestResult = {
      groupedFeatureName: "/first/second/Fourth",
      scenarioName:
         "Searching for Name should not match journal entry/annotations",
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

      const failStatus = Status.getStatusFor(Status.FAIL);
      expect(failStatus).toBe("FAIL");
   });

   it("loads test cases from csv rows", async () => {
      const data =
         "Version To Test\n" +
         "0.40.00\n" +
         "Feature,Required,Required By\n" +
         "First Feature,yes,\n";
      const testCases = await loadTestCases(data);

      const firstTestCase = testCases[0];
      expect(firstTestCase.groupedFeatureName).toBe("First Feature");
   });

   it("generates a HTML test report", async () => {
      const report = await generateTestReport(
         goodFeatureDir,
         "./test_data/release_test_plans/Release-1-TestPlan.csv",
         "./test_results/testReportByGenerator.html",
         Format.HTML
      );
      expect(report.versionToTest).toBe("0.40.00");
      expect(some(report.testResults, failed)).toBe(true);
      expect(some(report.testResults, passed)).toBe(true);
      expect(some(report.testResults, todo)).toBe(true);
      expect(some(report.testResults, skipped)).toBe(true);
      expect(some(report.testResults, notRequired)).toBe(true);
   });
});
