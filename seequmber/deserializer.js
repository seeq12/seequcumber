'use strict';

function Deserializer(directory) {
    var Cucumber = require('cucumber');
    var TestResults = require('./testResults/testResults');
    var features = Cucumber.Type.Collection();
    var fs = require('fs');
    var featureFiles = [];
    var self = {
        deserialize: function deserialize() {
            var files = self.files(directory);
            self.readFeatures(files);
            self.addTestResults(self.getFeatures());
            return self.getFeatures();
        },
        files: function files(dir) {
            var items = fs.readdirSync(dir).filter(function(file) {
                return (file.indexOf('.feature') >= 0);
            });
            featureFiles = items;
            return items;
        },
        getSources: function getSources(items) {
            var sources = [];
            items.forEach(function(item) {
                var source = fs.readFileSync(directory + item);
                sources.push([item, source]);
            });
            return sources;
        },
        readFeatures: function readFeatures() {
            var featureSources = self.getSources(featureFiles);
            var configuration = Cucumber.VolatileConfiguration(featureSources, function() {});
            var runtime = Cucumber.Runtime(configuration);
            runtime.start(function(succeeded) {
                process.exit(0);
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
        },
        getFeatures: function getFeatures() {
            var newFeatures = Cucumber.Type.Collection();
            features.syncForEach(function(feature) {
                newFeatures.add(feature);
            });
            return newFeatures;
        },
        addTestResults: function addTestResults(features) {
            features.syncForEach(function(feature) {
                var scenarios = feature.getFeatures();
                scenarios.syncForEach(function(scenario) {
                    var steps = scenario.getSteps();
                    steps.syncForEach(function(step) {
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
