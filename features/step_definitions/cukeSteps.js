'use strict';
var assert = require('assert');

module.exports = function() {
    this.Given(/^that cucumber-js is installed$/, function(callback) {
        this.initializeDeserializer(this.directory);
        assert.notStrictEqual(this.deserializer, undefined, 'Deserializer should be initialized');
        callback();
    });
    
    this.Given(/^there are sample feature files$/, function(callback) {
        assert.notEqual(this.deserializer.files(this.directory).length, 0, 'deserializer files should not be empty');
        callback();
    });

    this.When(/^the deserializer is called$/, function(callback) {
        this.deserializer.readFeatures();
        this.features = this.deserializer.getFeatures();
        callback();
    });

    this.Then(/^the feature files are loaded$/, function(callback) {
        this.feature = this.features.getAtIndex(0);
        callback();
    });

    this.Then(/^the TestResults are added$/, function(callback) {
        this.deserializer.addTestResults(this.features);
        var testResult = this.feature.getFeatures().getAtIndex(0).getSteps().getAtIndex(1).getTestResults().getTestResults().getAtIndex(0);
        assert.strictEqual(testResult.getResult(), 'PASS', 'TestResult object should contain property \'getResult()\' = PASS');
        assert.strictEqual(testResult.getVersion(), '0.14.02.201412020843', 'TestResult object should contain property \'getVersion()\' = 0.14.02.201412020843');
        assert.strictEqual(testResult.getUser(), 'Mark Derbecker', 'TestResult object should contain property \'getUser()\' = Mark Derbecker');
        assert.strictEqual(testResult.getDefects(), '', 'TestResult object should contain property \'getDefects()\' = \'\'');
        callback();
    });

}