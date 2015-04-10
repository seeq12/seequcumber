'use strict';

var fs = require('fs');
var barrow = {
    serializerEJS: fs.readFileSync('./seequmber/serializer.ejs').toString(),
    Deserializer: require('./seequmber/deserializer'),
    serializer: require('./seequmber/serializer')
};
module.exports = barrow;
