"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var index_1 = require("./index");
exports.client = index_1.createClient('localhost:6020');
exports.client.login();
var params$ = new rxjs_1.Subject();
exports.client.createCollection$('list', undefined, params$.startWith({ offset: 2, limit: 2 }))
    .debounceTime(13)
    .subscribe(function (value) {
    console.log(value);
});
setTimeout(function () {
    params$.next({ offset: 1, limit: 2 });
}, 3000);
