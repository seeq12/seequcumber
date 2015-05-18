'use strict';

var fs = require('fs');
var ejs = require('ejs');
var barrow = {
    deserializer: require('./seequmber/deserializer'),
    serializer: require('./seequmber/serializer'),
    renderHTML: function renderHTML(payload) {
        var directories = payload.dirs;
        var version = payload.version;
        var ejsString = fs.readFileSync(__dirname + '/seequmber/serializer.ejs').toString();
        var html = '';
        var data = {
            features: [],
            dirs: [],
            version: version
        };
        directories.forEach(function(directory) {
            var fileArray = directory.split('/');
            var deserializer = new barrow.deserializer(directory);
            var features = deserializer.deserialize();
            if (features) {
                data.features.push(features);
                data.dirs.push(fileArray[fileArray.length - 2]);
            }
        });
        html = ejs.render(ejsString, {
            data: data
        });
        html = html.replace(/&#34;/g, '"');
        html = html.replace(/^\s*[\r\n]/gm, '');
        return html;
    }
};
module.exports = barrow;
