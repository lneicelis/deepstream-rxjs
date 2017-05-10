"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("./client");
var listRef = client_1.client.record.getList('list');
var data = getData();
listRef.setEntries(data.map(function (r) { return "record/" + r.id; }));
data.forEach(function (datum) {
    client_1.client.record.getRecord("record/" + datum.id).set(datum, function () {
        console.log('imported', datum.id);
    });
});
function getData() {
    return [
        { id: '1', title: 'test 1', ts: Date.now() + 6 },
        { id: '2', title: 'test 2', ts: Date.now() },
        { id: '3', title: 'test 3', ts: Date.now() },
        { id: '4', title: 'test 4', ts: Date.now() },
    ];
}
