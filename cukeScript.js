'use strict';
var Cucumber = require('cucumber');
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

features.syncForEach(function(feature) {
    var scenarios = feature.getFeatures();
    scenarios.syncForEach(function(scenario, i) {
        console.log('Scenario: ' + i);
        console.log(scenario.getName());
        scenario.getSteps().syncForEach(function(step) {
            console.log(step.getName());
            if (step.hasDataTable()) {
                var table = step.getDataTable().getRows();
                console.log(table.getAtIndex(0).getResult());
            }
        });
    });
});
