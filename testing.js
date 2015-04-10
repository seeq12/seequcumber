'use strict';

var Deserializer = require('./seequmber/deserializer');
var fs = require('fs');
var ejs = require('ejs');
var path = require('path');
var ejsString = fs.readFileSync('./seequmber/serializer_div.ejs').toString();
var rootDirectory = __dirname + '/../crab/behavior/features/';
var directories = fs.readdirSync(rootDirectory).filter(function(file) {
    return fs.statSync(path.join(rootDirectory, file)).isDirectory();
});
directories.forEach(function(directory) {
    if (directory !== 'step_definitions' && directory !== 'support') {
        var dir = rootDirectory + directory + '/';
        var fileName = directory.replace(/\s/g, '-').toLowerCase() + '.html';
        console.log(fileName);
        var deserializer = new Deserializer(dir);
        var features = deserializer.deserialize();
        if (features) {
            var html = ejs.render(ejsString, {
                data: features
            });
            html = html.replace(/&#34;/g, '"');
            html = html.replace(/^\s*[\r\n]/gm, '');
            var err = fs.writeFileSync(dir + fileName, html);
            if (typeof err !== 'undefined') {
                throw new Error('Cannot create HTML file');
            } else {
                console.log('Success: File created at ' + fileName);
            }
        }
    }
});
