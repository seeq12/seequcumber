import { exportTo, Format } from "./testRunFormatter";
import { Status, TestReport, TestResult } from "./testResult";

describe("testRunFormatter", () => {
   const version = "v201811141000";

   const results: TestResult[] = [
      {
         groupedFeatureName: "FirstFeature",
         scenarioName: "",
         isCompleted: true,
         defects: "defect-1",
         status: Status.FAIL,
         isRequired: true,
         requiredBy: "TestPlanOne",
      },
      {
         groupedFeatureName: "FirstFeature",
         scenarioName: "First Scenario",
         isCompleted: true,
         defects: "defect-1",
         status: Status.FAIL,
         isRequired: true,
         requiredBy: "TestPlanOne",
      },
      {
         groupedFeatureName: "FirstFeature",
         scenarioName: "Second Scenario",
         isCompleted: true,
         defects: "",
         status: Status.PASS,
         isRequired: true,
         requiredBy: "TestPlanOne",
      },
      {
         groupedFeatureName: "FirstFeature",
         scenarioName: "Third Scenario",
         isCompleted: true,
         defects: "",
         status: Status.PASS,
         isRequired: true,
         requiredBy: "TestPlanOne",
      },
      {
         groupedFeatureName: "SecondFeature",
         scenarioName: "",
         isCompleted: false,
         defects: "",
         status: Status.UNDEFINED,
         isRequired: true,
         requiredBy: "TestPlanOne",
      },
      {
         groupedFeatureName: "SecondFeature",
         scenarioName: "First Scenario",
         isCompleted: false,
         defects: "",
         status: Status.UNDEFINED,
         isRequired: true,
         requiredBy: "TestPlanOne",
      },
      {
         groupedFeatureName: "SecondFeature",
         scenarioName: "Second Scenario",
         isCompleted: false,
         defects: "",
         status: Status.UNDEFINED,
         isRequired: false,
         requiredBy: "",
      },
      {
         groupedFeatureName: "ThirdFeature",
         scenarioName: "First Scenario",
         isCompleted: false,
         defects: "",
         status: Status.SKIP,
         isRequired: true,
         requiredBy: "",
      },
      {
         groupedFeatureName: "ThirdFeature",
         scenarioName: "",
         isCompleted: false,
         defects: "",
         status: Status.SKIP,
         isRequired: true,
         requiredBy: "",
      },
      {
         groupedFeatureName: "ThirdFeature",
         scenarioName: "Second Scenario",
         isCompleted: false,
         defects: "",
         status: Status.UNDEFINED,
         isRequired: false,
         requiredBy: "",
      },
      {
         groupedFeatureName: "ThirdFeature",
         scenarioName: "Third Scenario",
         isCompleted: false,
         defects: "",
         status: Status.UNDEFINED,
         isRequired: false,
         requiredBy: "",
      },
      {
         groupedFeatureName: "ThirdFeature",
         scenarioName: "Fourth Scenario",
         isCompleted: true,
         defects: "",
         status: Status.SKIP,
         isRequired: true,
         requiredBy: "",
      },
   ];

   it("exports a test run to html ", async () => {
      const filename = "./test_results/testReportByFormattor.html";
      const testReport: TestReport = {
         versionToTest: version,
         testResults: results,
      };

      const exported = await exportTo(Format.HTML, testReport, filename);
      expect(exported).toContain("Todo");
      expect(exported).toContain("Completed");
      expect(exported).toContain("Skip");
      expect(exported).toContain("Not Required");
   });
});
