#!/usr/bin/env node
import { generateTemplate } from "././testPlanGenerator";
import { generateTestReport } from "./testResultGenerator";
import program from "commander";

program
   .option("-tp, --testPlan ", "Create a new Test Plan")
   .option("-tr, --testReport", "Create a new Test Report")
   .option("-d, --featureDir <dir>", "Directory of feature files")
   .option(
      "-f, --testPlanFilename <filename>",
      "Filename of the Test Plan used to generate a Test Report"
   );

program.on("--help", function() {
   console.log("");
   console.log("");
   console.log("Examples:");
   console.log('--testPlan --featureDir ""');
   console.log(
      '--testReport --testPlanFilename "myTestPlan.csv" --featureDir "/dir/features/"'
   );
});

program.parse(process.argv);

if (!program.testPlan && !program.testReport) {
   console.log("Missing required argument --testPlan or --testReport");
}

if (!program.featureDir) {
   console.log("Missing required argument --featureDir");
}

if (program.testReport && !program.testPlanFilename) {
   console.log("Missing --testPlanFilename");
}

if (program.testPlan) {
   generateTemplate(program.featureDir);
}

if (program.testReport) {
   generateTestReport(program.featureDir, program.testPlanFilename);
}
