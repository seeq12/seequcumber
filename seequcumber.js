'use strict';

var fs = require('fs');
var ejs = require('ejs');
var seequcumber = {
    deserializer: require('./lib/deserializer'),
    serializer: require('./lib/serializer'),
    renderHTML: function renderHTML(payload) {
        var directories = payload.dirs;
        var version = payload.version;
        var ejsString = fs.readFileSync(__dirname + '/lib/serializer.ejs').toString();
        var html = '';
        var data = {
            features: [],
            dirs: [],
            version: version
        };
        directories.forEach(function(directory) {
            var fileArray = directory.split('/');
            var deserializer = new seequcumber.deserializer(directory);
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
module.exports = seequcumber;
