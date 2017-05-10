"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var createDebug = require("debug");
var memoize = require("lodash.memoize");
var Observable_1 = require("rxjs/Observable");
var debug = createDebug('ds-rxjs:list');
function createList$Factory(client) {
    return memoize(createList$);
    function createList$(listKey) {
        var listRef = client.record.getList(listKey);
        debug("list \"" + listKey + "\" ref created");
        return Observable_1.Observable.create(function (observer) {
            var handler = function (value) {
                observer.next(value);
                debug("list \"" + listKey + "\" ref value passed", value);
            };
            listRef.subscribe(handler, true);
            debug("list \"" + listKey + "\" subscribed");
            return function () {
                listRef.unsubscribe(handler);
                debug("list \"" + listKey + "\" unsubscribed");
            };
        });
    }
}
exports.createList$Factory = createList$Factory;
