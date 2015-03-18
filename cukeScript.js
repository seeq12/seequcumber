'use strict';
var Cucumber = require('cucumber');
var fs = require('fs');
var files = fs.readdirSync(__dirname).filter(function(file) {
    return (file.indexOf('.feature') >= 0);
});
var features = [];
files.forEach(function(file, index) {
    features[index] = fs.readFileSync('./' + file).toString();
});
var supportCode = function() {};
var cucumber = Cucumber(features[0], supportCode);
var feats;
cucumber.start(function(err, data) {
    feats = data;
});
console.log(feats);