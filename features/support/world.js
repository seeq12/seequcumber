'use strict';

var Deserializer = require('../../lib/deserializer');

module.exports = function() {
    this.World = cukeWorld;
};

function cukeWorld() {
    this.directory = __dirname + '/../test/';
    this.deserializer = undefined;
    this.features = undefined;
    this.feature = undefined;
    this.initializeDeserializer = function(directory) {
        this.deserializer = new Deserializer(directory);
    };
}
