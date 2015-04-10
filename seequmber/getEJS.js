'use strict';
var fs = require('fs');

function getEJS() {
    return fs.readFileSync('serializer.ejs').toString();
}

module.exports = getEJS;
