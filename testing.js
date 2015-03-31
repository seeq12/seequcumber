'use strict';

var Deserializer = require('./seequmber/deserializer');
var directory = __dirname + '/seequmber/features/';
var deserializer = new Deserializer(directory);
deserializer.deserialize();
