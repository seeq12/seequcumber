import { loadTestCases } from "./testPlanGenerator";
import { generateTestReport } from "./testRunGenerator";
import { TestResult, Status } from "./testResult";
import { some } from "lodash";
import { Format } from "./testRunFormatter";

describe("testRunGenerator", () => {
   const goodFeatureDir = "./test_data/features/first_feature_dir";

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
         "2.1.2\n" +
         "Feature,Scenario,Required,Required By\n" +
         "Capsule Time,Basic Capsule Time,yes,\n" +
         "Capsule Time,Capsule Time Alignments,yes,\n";
      const testCases = await loadTestCases(data);

      const firstTestCase = testCases[0];
      expect(firstTestCase.featureName).toBe("Capsule Time");
      expect(firstTestCase.scenarioName).toBe("Basic Capsule Time");

      const secondTestCase = testCases[1];
      expect(secondTestCase.featureName).toBe("Capsule Time");
      expect(secondTestCase.scenarioName).toBe("Capsule Time Alignments");

      const thirdTestCase = testCases[1];
      expect(thirdTestCase.featureName).toBe("Capsule Time");
      expect(thirdTestCase.scenarioName).toBe("Capsule Time Alignments");
   });

   it("generates a test report", async () => {
      const report = await generateTestReport(
         goodFeatureDir,
         "./test_data/release_test_plans/release-1-TestPlan.csv",
         "./test_results/testReport.csv",
         Format.CSV
      );
      expect(report.versionToTest).toBe("0.40.00-v201811141000");
      const testCaseOne: TestResult = {
         featureName: "First Feature",
         scenarioName: "",
         requiredBy: "story-1-GoodTestPlan",
         isRequired: true,
         isCompleted: true,
         defects: "defect-1 defect-2",
         status: Status.FAIL,
      };

      const testCaseTwo: TestResult = {
         featureName: "First Feature",
         scenarioName: "Capsule Time Alignments",
         requiredBy: "story-1-GoodTestPlan",
         isRequired: true,
         isCompleted: true,
         defects: "",
         status: Status.SKIP,
      };

      const testCaseThree: TestResult = {
         featureName: "First Feature",
         scenarioName: "Capsule Time Alignments",
         requiredBy: "story-1-GoodTestPlan",
         isRequired: true,
         isCompleted: true,
         defects: "",
         status: Status.UNDEFINED,
      };

      expect(some(report.testResults, testCaseOne)).toBe(true);
      expect(some(report.testResults, testCaseTwo)).toBe(true);
   });
});
