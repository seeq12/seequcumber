# Seequcumber

## Description

SeeQucumber is a Gherkin based framework to manage manual test cases.

It automatically generates the following artifacts:

-  Test Plan template from existing Gherkin feature files
-  Test Report from the results of manual testing

## Feature File Formatting

Seequcumber extract scenarios from feature files used in manual testing usig the following format:

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
   Scenarios contains steps with a table containing the result of the manual test. The table can contain several rows to indicate multiple executions.
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
   _Example_ `40.00.11`

   >

5. **Tester** (Optional)  
   Name of tester who executed this test case.

   >

6. **Defect** (Optional)
   The ticket number(s) for defects filed for this step
   >

## Usage

Seequcumber is available as an npm module.

Install globally with:

```shell
$ npm install -g seequcumber
```

Install as a development dependency of your application with:

```shell
$ npm install --save-dev seequcumber
```

It should then be instantiated in your Javascript file.

```javascript
let Seequcumber = require("seequcumber");
let seequcumber = new Seequcumber();
```

The Seequcumber module has two commands:

```javascript
/**
 * generateTestPlan
 *
 * Generate a Test Plan from a directory of Gherkin files
 * @param featureDirectory: Directory of Gherkin feature files
 * @param testPlanFilename: Filename of generated Test Plan
 * @param versionToTest: Target version of the software to test
 */
```

```javascript
/**
 * generateHtmlReport
 *
 * Generate a Test Report from a Test Plan and directory containing Gherkin files
 * @param featureDirectory Directory of Gherkin feature files
 * @param testPlanFilename Filename of Test Plan
 * @param reportFilenme  Filename of HTML report
 */
```

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
