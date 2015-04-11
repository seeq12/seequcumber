'use strict';

var fs = require('fs');
var ejs = require('ejs');
var barrow = {
    deserializer: require('./seequmber/deserializer'),
    serializer: require('./seequmber/serializer'),
    renderHTML: function renderHTML(directory) {
        var ejsString = fs.readFileSync(__dirname + '/seequmber/serializer.ejs').toString();
        var deserializer = new barrow.deserializer(directory);
        var features = deserializer.deserialize();
        var html = '';
        if (features) {
            html = ejs.render(ejsString, {
                data: features
            });
            html = html.replace(/&#34;/g, '"');
            html = html.replace(/^\s*[\r\n]/gm, '');
        }
        return html;
    }
};
module.exports = barrow;
