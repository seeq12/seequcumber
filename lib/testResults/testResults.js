'use strict';

function TestResults(dataTable) {
    var Cucumber = require('cucumber');
    var TestResult = require('./testResult');
    var maximums = [0, 0, 0, 0];

    var testCollection = Cucumber.Type.Collection();

    (function rowToTestResult() {
        var rows = dataTable.getRows();
        rows = rows.sort(function(a, b) {
            return (a.raw()[1]) < (b.raw()[1]);
        });
        
        rows.forEach(function(row) {
            var testResult = new TestResult(row.raw()[0], row.raw()[1], row.raw()[2], row.raw()[3]);
            testCollection.add(testResult);
            row.raw().forEach(function(element, index) {
                if (maximums[index] < element.length) {
                    maximums[index] = element.length;
                }
            });
        });
    })();

    var self = {
        getTestResults: function getTestResults() {
            var newTests = Cucumber.Type.Collection();
            testCollection.forEach(function(test) {
                newTests.add(test);
            });
            return newTests;
        },
        attachTest: function attachTest(test) {
            testCollection.add(test);
        },
        getMaximums: function getMaximums() {
            return maximums;
        },
        raw: function raw() {
            var rawTests = [];
            testCollection.forEach(function(test) {
                rawTests.push(test.raw());
            });
            return rawTests;
        }
    };
    return self;
}

module.exports = TestResults;
