# Seequcumber

## Description

SeeQucumber is a Gherkin based framework to manage manual test cases.

It generates the following artifacts:

-  Test Plan template from existing Gherkin feature files
-  Test Report from the results of manual testing

## Installation

Seequcumber is available as an npm module.

Install:

```shell
$ npm install seequcumber
```

# Usage

Seequcumber CLI has two primary options:

```
seequcumber --testPlan
```

Creates a new Test Plan from a directory of Gherkin files. Once the blank template is generated, it can be found in the current directory as a csv file. It's easily editable to add more required test cases ([example](/test_data/test_plans/Story-1-TestPlan.csv)).

```
seequcumber --testReport
```

Creates a new Test Report from a Test Plan and directory of Gherkin files. Once generated, the html report can be found in the current directory.

To evaluate if a required scenario has been completed, each scenario's "version tested" ([example](/test_data/features/first/First.feature)) is compared the "version to test" from the Test Plan ([example](/test_data/test_plans/Story-1-TestPlan.csv)).

This comparison uses a string sort (as opossed to a natural sort). It is required that the Test Plan's "version to test" matches the format of the feature file "version tested".

For example:
Test Plan version to test: 0.40.0
Feature File version tested: 0.40.20190125 (version 0.40 built on Jan 25th 2019)

## CLI Options

-tp, --testPlan
Create a new Test Plan

-tr, --testReport
Create a new Test Report

-d, --featureDir [dir]  
Directory of feature files

-f, --testPlanFilename [filename]  
Filename of the Test Plan used to generate a Test Report

-h, --help
Usage information

Examples:

```
seequcumber --testPlan --featureDir "./dir"
```

```
seequcumber --testReport --testPlanFilename "./myTestPlan.csv" --featureDir "/dir"
```

## Feature File Formatting

Seequcumber extract scenarios from feature files used in manual testing.  
It requires the following format:

1. **Feature tag** `@manual`
   A tag indicating that this test is manual (as opposed to automated)
   is required.
   _Example_

   ```gherkin
    @manual
    Feature: ...
        Scenario: ...

   ```

   >

2. **Test Run Result**
   Each Scenarios has steps with a table containing the manual test result. The table can contain several rows to indicate multiple executions on different versions.
   _Example_

   ```gherkin
   Scenario: ...
        When ...
            |<Result>|<Version>|<Tester>|<Defect>|
   ```

>

3. **Results**
   The result of the manual test.

   ```gherkin
   PASSED (or PASS)
   FAILED (or FAIL)
   SKIPPED (or SKIP)
   ```

   >

4. **Version**
   The version of the software that was tested.
   _Example_ `0.40.0.20190101 (0.40 version built on January 01 2019)`

>

5. **Tester** (Optional)  
   Name of tester who executed this test case.

   >

6. **Defect** (Optional)
   The ticket number(s) for defects filed for this step
   >

## Third-party libraries

The following third-party libraries are used by this module:

-  cucumber-js: https://github.com/cucumber/cucumber-js - to handle parsing of Cucumber Feature files
-  ejs: https://github.com/tj/ejs - for dynamic HTML processing of multiple Javascript objects

## Seequcumber Development

Clone the repo and install dependencies:

```shell
git clone https://github.com/seeq12/seequcumber.git
cd seequcumber
npm install
```

Run the tests:

```shell
npm test
```

>
