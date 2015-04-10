'use strict';

var fs = require('fs');
var barrow = {
    deserializer: require('./seequmber/deserializer'),
    serializer: require('./seequmber/serializer'),
    getEJS: require('./seequmber/getEJS')
};
module.exports = barrow;
