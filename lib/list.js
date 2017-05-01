"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createDebug = require("debug");
const memoize = require("lodash.memoize");
const Observable_1 = require("rxjs/Observable");
const debug = createDebug('ds-rxjs:list');
function createList$Factory(client) {
    return memoize(createList$);
    function createList$(listKey) {
        const listRef = client.record.getList(listKey);
        debug(`list "${listKey}" ref created`);
        return Observable_1.Observable.create((observer) => {
            const handler = (value) => {
                observer.next(value);
                debug(`list "${listKey}" ref value passed`, value);
            };
            listRef.subscribe(handler, true);
            debug(`list "${listKey}" subscribed`);
            return () => {
                listRef.unsubscribe(handler);
                debug(`list "${listKey}" unsubscribed`);
            };
        });
    }
}
exports.createList$Factory = createList$Factory;
