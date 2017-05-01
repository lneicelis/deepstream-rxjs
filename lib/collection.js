"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Observable_1 = require("rxjs/Observable");
const list_1 = require("./list");
const record_1 = require("./record");
const defaultMapFn = (id) => id;
const defaultParams$ = Observable_1.Observable.of({ offset: 0, limit: Infinity });
function createCollection$Factory(client) {
    const createList$ = list_1.createList$Factory(client);
    const createRecord$ = record_1.createRecord$Factory(client);
    return function createCollection$(dsListKey, mapFn = defaultMapFn, params$ = defaultParams$) {
        return params$
            .switchMap(({ offset, limit }) => createList$(dsListKey)
            .map(list => list.slice(offset, offset + limit)))
            .switchMap(list => Observable_1.Observable
            .merge(...list.map(itemId => createRecord$(mapFn(itemId))))
            .scan((byKey, record) => {
            byKey[record._dsRecordKey] = record;
            return byKey;
        }, {}));
    };
}
exports.createCollection$Factory = createCollection$Factory;
