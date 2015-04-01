'use strict';
var Cucumber = require('cucumber');
var TestResults = require('./testResults');
var Serializer = require('./serializer')
var fs = require('fs');
var features;
var files = fs.readdirSync(__dirname + '/features').filter(function(file) {
    return (file.indexOf('.feature') >= 0);
});
var configuration = Cucumber.Cli.Configuration(files);
var runtime = Cucumber.Runtime(configuration);
runtime.start(function(succeeded) {
    var code = succeeded ? 0 : 1;

    process.on('exit', function() {
        process.exit(code);
    });

    var timeoutId = setTimeout(function() {
        console.error('Cucumber process timed out after waiting 60 seconds for the node.js event loop to empty.  There may be a resource leak.  Have all resources like database connections and network connections been closed properly?');
        process.exit(code);
    }, 60 * 1000);

    if (timeoutId.unref) {
        timeoutId.unref();
    } else {
        clearTimeout(timeoutId);
    }
});

features = runtime.getFeatures().getFeatures();

features.syncForEach(function(feature, index) {
    var scenarios = feature.getFeatures();
    var fileName = files[index].split('.')[0] + '_new.feature';
    scenarios.syncForEach(function(scenario) {
        scenario.getSteps().syncForEach(function(step) {
            if (step.hasDataTable()) {
                var table = new TestResults(step.getDataTable());
                step.attachTestResults(table);
            }
        });
    });
    var serTest = new Serializer(feature, fileName);
    serTest.write();
});
