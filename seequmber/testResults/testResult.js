'use strict';

function TestResult(result, version, user, defects) {
    var self = {
        raw: function raw() {
            var rawArray = [];
            rawArray.push(result);
            rawArray.push(version);
            rawArray.push(user);
            rawArray.push(defects);
            return rawArray;
        },

        getResult: function getResult() {
            return result;
        },

        gerVersion: function gerVersion() {
            return version;
        },

        getUser: function getUser() {
            return user;
        },

        getDefects: function getDefects() {
            return defects;
        }
    };
    return self;
}

module.exports = TestResult;
