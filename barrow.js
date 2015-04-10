'use strict';

var fs = require('fs');
var barrow = {
    deserializer: require('./seequmber/deserializer'),
    serializer: require('./seequmber/serializer'),
    getEJS: fs.readFileSync(__dirname + '/seequmber/serializer.ejs').toString();
};
module.exports = barrow;
