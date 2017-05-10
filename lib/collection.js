"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Observable_1 = require("rxjs/Observable");
var list_1 = require("./list");
var record_1 = require("./record");
var defaultMapFn = function (id) { return id; };
var defaultParams$ = Observable_1.Observable.of({ offset: 0, limit: Infinity });
function createCollection$Factory(client) {
    var createList$ = list_1.createList$Factory(client);
    var createRecord$ = record_1.createRecord$Factory(client);
    return function createCollection$(dsListKey, mapFn, params$) {
        if (mapFn === void 0) { mapFn = defaultMapFn; }
        if (params$ === void 0) { params$ = defaultParams$; }
        return params$
            .switchMap(function (_a) {
            var offset = _a.offset, limit = _a.limit;
            return createList$(dsListKey)
                .map(function (list) { return list.slice(offset, offset + limit); });
        })
            .switchMap(function (list) { return Observable_1.Observable
            .merge.apply(Observable_1.Observable, list.map(function (itemId) { return createRecord$(mapFn(itemId)); })).scan(function (byKey, record) {
            byKey[record._dsRecordKey] = record;
            return byKey;
        }, {}); });
    };
}
exports.createCollection$Factory = createCollection$Factory;
