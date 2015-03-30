'use strict';

function Deserializer() {
    var Cucumber = require('cucumber');
    var TestResults = require('./testResults/testResults');
    var features;
    var fs = require('fs');
    var self = {
        deserialize: function deserialize(directory) {
            self.addTestResults(self.readFeatures(self.files(directory)));
            return self.getFeatures();
        },
        files: function files(directory) {
            return fs.readdirSync(directory).filter(function(file) {
                return (file.indexOf('.feature') >= 0);
            });
        },
        readFeatures: function readFeatures(items) {
            var configuration = Cucumber.Cli.Configuration(items);
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
            return self.getFeatures();
        },
        getFeatures: function getFeatures() {
            return features;
        },
        addTestResults: function addTestResults(features) {
            features.syncForEach(function(feature, index) {
                var scenarios = feature.getFeatures();
                scenarios.syncForEach(function(scenario) {
                    scenario.getSteps().syncForEach(function(step) {
                        if (step.hasDataTable()) {
                            var table = new TestResults(step.getDataTable());
                            step.attachTestResults(table);
                        }
                    });
                });
            });
        }
    };
    return self;
}
module.exports = Deserializer;
