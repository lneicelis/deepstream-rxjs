"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createDebug = require("debug");
const memoize = require("lodash.memoize");
const Observable_1 = require("rxjs/Observable");
const debug = createDebug('ds-rxjs:record');
function createRecord$Factory(client) {
    return memoize(createRecord$);
    function createRecord$(recordKey) {
        const recordRef = client.record.getRecord(recordKey);
        debug(`"${recordKey}" ref created`);
        return Observable_1.Observable.create((observer) => {
            const handler = (value) => {
                observer.next(Object.assign({}, value, { _dsRecordKey: recordKey }));
                debug(`"${recordKey}" value`, value);
            };
            recordRef.subscribe(handler, true);
            debug(`"${recordKey}" ref subscribed`);
            return () => {
                recordRef.unsubscribe(handler);
                debug(`"${recordKey}" unsubscribed`);
            };
        });
    }
}
exports.createRecord$Factory = createRecord$Factory;
