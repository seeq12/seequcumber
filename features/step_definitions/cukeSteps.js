'use strict';
var Deserializer = require('../../seequmber/deserializer');
var assert = require('assert');
var directory = __dirname + '/../'
var features;
var feature;

module.exports = function() {
    this.World = require('../support/cukeWorld').World;
    this.Given(/^that cucumber-js is installed$/, function(callback) {
        this.deserializer = new Deserializer(directory);
        assert.notStrictEqual(this.deserializer, undefined, 'Deserializer should be initialized');
        callback();
    });
    this.Given(/^there are sample feature files$/, function(callback) {
        assert.notEqual(this.deserializer.files(directory).length, 0, 'deserializer files should not be empty');
        callback();
    });
    this.When(/^the deserializer is called$/, function(callback) {
        this.deserializer.readFeatures();
        features = this.deserializer.getFeatures();
        callback();
    });
    this.Then(/^the feature files are loaded$/, function(callback) {
        feature = features.getAtIndex(1);
        callback();
    });

    this.Then(/^the TestResults are added$/, function(callback) {
        this.deserializer.addTestResults(features);
        var testResult = feature.getFeatures().getAtIndex(0).getSteps().getAtIndex(1).getTestResults().getTestResults().getAtIndex(0);
        assert.strictEqual(testResult.getResult(), 'PASS', 'TestResult object should contain property \'getResult()\' = PASS');
        assert.strictEqual(testResult.getVersion(), '0.14.02.201412020843', 'TestResult object should contain property \'getVersion()\' = 0.14.02.201412020843');
        assert.strictEqual(testResult.getUser(), 'Mark Derbecker', 'TestResult object should contain property \'getUser()\' = Mark Derbecker');
        assert.strictEqual(testResult.getDefects(), '', 'TestResult object should contain property \'getDefects()\' = \'\'');
        callback();
    });

}
