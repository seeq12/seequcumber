import { exportTo, Format } from "./testRunFormatter";
import { Status, TestReport, TestResult } from "./testResult";

describe("testRunFormatter", () => {
   const version = "v201811141000";

   const results: TestResult[] = [
      {
         featureName: "FirstFeature",
         scenarioName: "",
         isCompleted: true,
         defects: "defect-1",
         status: Status.FAIL,
         isRequired: true,
         requiredBy: "TestPlanOne",
      },
      {
         featureName: "FirstFeature",
         scenarioName: "First Scenario",
         isCompleted: true,
         defects: "defect-1",
         status: Status.FAIL,
         isRequired: true,
         requiredBy: "TestPlanOne",
      },
      {
         featureName: "FirstFeature",
         scenarioName: "Second Scenario",
         isCompleted: true,
         defects: "",
         status: Status.PASS,
         isRequired: true,
         requiredBy: "TestPlanOne",
      },
      {
         featureName: "FirstFeature",
         scenarioName: "Third Scenario",
         isCompleted: true,
         defects: "",
         status: Status.PASS,
         isRequired: true,
         requiredBy: "TestPlanOne",
      },
      {
         featureName: "SecondFeature",
         scenarioName: "",
         isCompleted: false,
         defects: "",
         status: Status.UNDEFINED,
         isRequired: true,
         requiredBy: "TestPlanOne",
      },
      {
         featureName: "SecondFeature",
         scenarioName: "First Scenario",
         isCompleted: false,
         defects: "",
         status: Status.UNDEFINED,
         isRequired: true,
         requiredBy: "TestPlanOne",
      },
      {
         featureName: "SecondFeature",
         scenarioName: "Second Scenario",
         isCompleted: false,
         defects: "",
         status: Status.UNDEFINED,
         isRequired: false,
         requiredBy: "",
      },
      {
         featureName: "ThirdFeature",
         scenarioName: "First Scenario",
         isCompleted: false,
         defects: "",
         status: Status.SKIP,
         isRequired: true,
         requiredBy: "",
      },
      {
         featureName: "ThirdFeature",
         scenarioName: "",
         isCompleted: false,
         defects: "",
         status: Status.SKIP,
         isRequired: true,
         requiredBy: "",
      },
      {
         featureName: "ThirdFeature",
         scenarioName: "Second Scenario",
         isCompleted: false,
         defects: "",
         status: Status.UNDEFINED,
         isRequired: false,
         requiredBy: "",
      },
      {
         featureName: "ThirdFeature",
         scenarioName: "Third Scenario",
         isCompleted: false,
         defects: "",
         status: Status.UNDEFINED,
         isRequired: false,
         requiredBy: "",
      },
      {
         featureName: "ThirdFeature",
         scenarioName: "Fourth Scenario",
         isCompleted: true,
         defects: "",
         status: Status.SKIP,
         isRequired: true,
         requiredBy: "",
      },
   ];

   it("exports a test run to csv ", async () => {
      const filename = "./test_results/testReportFormatted.csv";
      const testReport: TestReport = {
         versionToTest: version,
         testResults: results,
      };

      const exported = await exportTo(Format.CSV, testReport, filename);
      expect(exported).toContain("PASS");
      expect(exported).toContain("FAIL");
      expect(exported).toContain("SKIP");
   });

   it("exports a test run to html ", async () => {
      const filename = "./test_results/testReportFormatted.html";
      const testReport: TestReport = {
         versionToTest: version,
         testResults: results,
      };

      const exported = await exportTo(Format.HTML, testReport, filename);
      expect(exported).toContain("Todo");
      expect(exported).toContain("Completed");
      expect(exported).toContain("Skipped");
      expect(exported).toContain("Not Required");
   });
});
