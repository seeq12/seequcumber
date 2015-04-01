'use strict';

var Deserializer = require('../../seequmber/deserializer');

var cukeWorld = function(callback) {
    this.directory = __dirname + '/../test/';
    this.deserializer = undefined;
    this.features = undefined;
    this.feature = undefined;
    this.initializeDeserializer = function(directory) {
        this.deserializer = new Deserializer(directory);
    };
    callback();
};

module.exports.World = cukeWorld;
