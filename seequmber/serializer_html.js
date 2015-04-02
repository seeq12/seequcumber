'use strict';

function Serializer(feature, fileName) {
    var fs = require('fs');
    var getTag = function(tags, lineNumber) {
        var outputString = '';
        tags.forEach(function(tag) {
            if (tag.getLine() + 1 === lineNumber) {
                outputString += tag.getName() + ' ';
            }
        });
        if (outputString !== '') {
            outputString += '\n';
        }
        return outputString;
    };
    var tab = function(number) {
        var outputString = '';
        var i;
        for (i = 0; i < number; i++) {
            outputString += '  ';
        }
        return outputString;
    };
    var self = {
        write: function write() {
            var outputString = '';
            var tabNum = 0;
            var pass = true;
            outputString += self.writeFirstLine(feature, tabNum) + '\n' + self.checkForDescription(feature, tabNum + 1) + self.checkForBackground(feature, tabNum + 1);
            var scenarios = feature.getFeatures();
            scenarios.syncForEach(function(scenario) {
                var obj = self.writeScenario(scenario, tabNum + 1);
                outputString += obj.out;
                pass = (pass && obj.success);
            });
            var err = fs.writeFileSync('./features/' + fileName, outputString);
            if (typeof err !== 'undefined') {
                throw (new Error('Cannot create feature file'));
            } else {
                console.log('Success: File created at ' + fileName);
            }
        },
        writeDescription: function writeDescription(description, tabNum) {
            var outputString = '';
            var lines = description.split('\n');
            lines.forEach(function(line) {
                outputString += tab(tabNum) + line + '\n';
            });
            outputString += '\n';
            return outputString;
        },
        writeBackground: function writeBackground(background, tabNum) {
            var outputString = '';
            var steps = background.getSteps();
            outputString += self.writeFirstLine(background, tabNum) + '\n' + self.checkForDescription(background, tabNum + 1);
            steps.syncForEach(function(step) {
                outputString += self.writeStep(step, tabNum + 1);
            });
            outputString += '\n';
            return outputString;
        },
        writeScenario: function writeScenario(scenario, tabNum) {
            var outputString = '';
            var pass = true;
            var steps = scenario.getSteps();
            outputString += self.writeFirstLine(scenario, tabNum) + '\n' + self.checkForDescription(scenario, tabNum + 1); //+ self.checkForBackground(scenario, tabNum + 1);
            steps.syncForEach(function(step) {
                var obj = self.writeStep(step, tabNum + 1);
                outputString += obj.out;
                pass = (pass && obj.success);
            });
            outputString += '\n';
            return {
                out: outputString,
                success: pass
            };
        },
        writeStep: function writeStep(step, tabNum) {
            var outputString = '';
            var pass = true;
            outputString += tab(tabNum) + step.getKeyword() + step.getName();
            if (step.hasAttachment()) {
                outputString += '\n';
                if (step.hasTestResults()) {
                    var tests = step.getTestResults().getTestResults();
                    tests.syncForEach(function(test) {
                        var obj = self.writeTest(test.raw(), step.getTestResults().getMaximums());
                        outputString += tab(tabNum + 1) + obj.out;
                        pass = (pass && (test.raw()[0] !== 'FAIL'));
                    });
                }
                if (step.hasDataTable() && step.getDataTable().raw()[0].length !== 4) {
                    var rows = step.getDataTable().getRows();
                    rows.syncForEach(function(row) {
                        outputString += tab(tabNum + 1) + self.writeRawTable(row.raw());
                    });
                }
            } else {
                outputString += '\n';
            }
            return {
                out: outputString,
                success: pass
            };
        },
        writeRawTable: function writeRawTable(raw) {
            var outputString = '';
            raw.forEach(function(element) {
                outputString += '| ' + element + ' ';
            });
            outputString += '|\n';
            return outputString;
        },
        writeTest: function writeTest(raw, max) {
            var outputString = '';
            var color = '';
            switch (raw[0]) {
                case 'PASS':
                    color = '#DDFFDD';
                    break;
                case 'FAIL':
                    color = '#FFDDDD';
                    break;
                case 'SKIPPED':
                    color = '#FFFFDD';
                    break;
                default:
                    color = '#DDFFDD';
            }
            raw.forEach(function(element, index) {
                var space = function(number) {
                    var out = '';
                    var i;
                    for (i = 0; i < number; i++) {
                        out += ' ';
                    }
                    return out;
                };
                outputString += '| ' + element + space(max[index] - element.length + 1);
            });
            outputString += '|\n';
            return {
                out: outputString,
                color: color
            };
        },
        checkForDescription: function checkForDescription(element, tabNum) {
            var outputString = '';
            if (element.getDescription() && element.getDescription().length > 0) {
                var description = element.getDescription();
                outputString += self.writeDescription(description, tabNum);
            }
            return outputString;
        },
        checkForBackground: function checkForBackground(element, tabNum) {
            var outputString = '';
            if (element.getBackground()) {
                var background = element.getBackground();
                outputString += self.writeBackground(background, tabNum);
            }
            return outputString;
        },
        writeFirstLine: function writeFirstLine(element, tabNum) {
            var outputString = '';
            var tags = [];
            if (element.getTags) {
                tags = element.getTags();
                outputString += tab(tabNum) + getTag(tags, element.getLine());
            }
            outputString += tab(tabNum) + element.getKeyword() + ': ' + element.getName();
            return outputString;
        }
    };
    return self;
}

module.exports = Serializer;
