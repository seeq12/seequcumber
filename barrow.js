'use strict';

var fs = require('fs');
var barrow = {
    deserializer: require('./seequmber/deserializer'),
    serializer: require('./seequmber/serializer')
};
module.exports = barrow;
