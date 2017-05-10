"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var deepstream = require("deepstream.io-client-js");
var collection_1 = require("./collection");
var record_1 = require("./record");
var list_1 = require("./list");
var event_1 = require("./event");
function createClient(url, options) {
    if (options === void 0) { options = {}; }
    var client = deepstream(url, options);
    client.constructor.prototype.createList$ = list_1.createList$Factory(client);
    client.constructor.prototype.createEvent$ = event_1.createEvent$Factory(client);
    client.constructor.prototype.createRecord$ = record_1.createRecord$Factory(client);
    client.constructor.prototype.createCollection$ = collection_1.createCollection$Factory(client);
    return client;
}
exports.createClient = createClient;
