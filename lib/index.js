"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const deepstream = require("deepstream.io-client-js");
const collection_1 = require("./collection");
const record_1 = require("./record");
const list_1 = require("./list");
function createClient(url, options = {}) {
    const client = deepstream(url, options);
    client.constructor.prototype.createList$ = list_1.createList$Factory(client);
    client.constructor.prototype.createRecord$ = record_1.createRecord$Factory(client);
    client.constructor.prototype.createCollection$ = collection_1.createCollection$Factory(client);
    return client;
}
exports.createClient = createClient;
