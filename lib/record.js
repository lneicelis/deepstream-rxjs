"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var createDebug = require("debug");
var memoize = require("lodash.memoize");
var Observable_1 = require("rxjs/Observable");
var debug = createDebug('ds-rxjs:record');
function createRecord$Factory(client) {
    return memoize(createRecord$);
    function createRecord$(recordKey) {
        var recordRef = client.record.getRecord(recordKey);
        debug("\"" + recordKey + "\" ref created");
        return Observable_1.Observable.create(function (observer) {
            var handler = function (value) {
                observer.next(__assign({}, value, { _dsRecordKey: recordKey }));
                debug("\"" + recordKey + "\" value", value);
            };
            recordRef.subscribe(handler, true);
            debug("\"" + recordKey + "\" ref subscribed");
            return function () {
                recordRef.unsubscribe(handler);
                debug("\"" + recordKey + "\" unsubscribed");
            };
        });
    }
}
exports.createRecord$Factory = createRecord$Factory;
