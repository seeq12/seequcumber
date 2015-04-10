'use strict';

var fs = require('fs');
exports.serializerEJS = fs.readFileSync('./seequmber/serializer.ejs').toString();
exports.Deserializer = require('./seequmber/deserializer');
exports.serializer = require('./seequmber/serializer');
