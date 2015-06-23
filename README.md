Barrow
======

Description
-----------
* Barrow aims to enable a manual testing framework through Behavior Driven Development.
* By utilizing Cucumber feature files to provide scenarios for manual features that need to be tested, Barrow is an add-on to Cucumber.js
* Barrow utilizes Cucumber to de-serialize the feature files and subsequently generates a HTML report, containing results of all the Feature files containing manual scenarios, with an overall test status summary table.

Feature File Formatting
-----------------------

Barrow de-serializes and serializes scenarios from Feature files that are meant for manual testing.

For this, when a Feature file is written, a scenario must have the tag `@manual` in order for the serializer to process it, and deduce the state for that particular Feature file.

**Example**:

    @manual
    Scenario: ...
        When ...
        Then ...
Every Scenario must contain steps that have a test result table attached to it below. Otherwise, the step would be deemed **incomplete**. Test results should be attached to steps as follows:

    When ...
        |<Result>|<Version>|<Tester>|<Defect>|
**Results** can be:

* PASS
* FAIL
* SKIPPED

Usage
-----
Barrow is an npm module, and thus so, it should be included in your dependencies for `package.json` 

    "devDependencies": {
        "barrow": "git+https://github.com/seeq12/barrow.git
     }

It should then be instantiated in your Javascript file.

    var Barrow = require('barrow')
    var barrow = new Barrow()

The Barrow module has three in-built commands:

* `deserializer`
* `serializer`
* `renderHTML`

**The `deserializer` function**

*Input*: `directory`: folder in which feature files are contained

*Functions*: 

* `.deserialize()`: calls all the other functions and returns collection of all Feature files as an object in memory
* `.files()`: returns array of names of all Feature files in a directory
* `.getSources()`: returns array of all Feature files read into memory
* `.readFeatures()`: feeds in array of Feature files as String and uses Cucumber to parse into Feature file objects, and stores it in memory
* `.getFeatures()`: returns collection of all Feature files as an object in memory
* `.addTestResults()`: adds test result object in a test result table to each step


**The `serializer` function**

*Input*: 

* `feature`: Cucumber Feature object as outlined by Cucumber.js AST
* `fileName`: name for output Feature file

*Functions*: 

* `.write()`: calls all the other functions and writes Feature file
* `.writeDescription()`: returns stringified Description object
* `.writeBackground()`: returns stringified Background object
* `.writeScenario()`: returns stringified Scenario object
* `.writeStep()`: returns stringified Step object
* `.writeRawTable()`: returns stringified data table object
* `.writeTest()`: returns stringified test result object
* `.checkForDescription()`: checks if Cucumber AST object has a non-empty description object, and then calls `.writeDescription()`
* `.checkForBackground()`: checks if Cucumber AST object has a non-empty background object, and then calls `.writeBackground()`
* `.writeFirstLine()`: returns string that contains the Cucumber AST object's keyword, and name properties

**The `renderHTML` function**

*Input*: 

* `payload`: Javascript object that contains two items:
    * `version`: RegExp object that specifies versions to be filtered for HTML rendering
    * `directory`: directory string that contains directories that contain Feature files to be processed

*Output*: 

* `html`: html string after all directories are processed




Third-party libraries
---------------------

The following third-party libraries are used by this module:

* cucumber-js: https://github.com/cucumber/cucumber-js -  to handle parsing of Cucumber Feature files
* ejs: https://github.com/tj/ejs - for dynamic HTML processing of multiple Javascript objects