"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const index_1 = require("./index");
exports.client = index_1.createClient('localhost:6020');
exports.client.login();
const params$ = new rxjs_1.Subject();
exports.client.createCollection$('list', undefined, params$.startWith({ offset: 2, limit: 2 }))
    .debounceTime(13)
    .subscribe(value => {
    console.log(value);
});
setTimeout(() => {
    params$.next({ offset: 1, limit: 2 });
}, 3000);
