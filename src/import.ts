import {client} from "./client";

const listRef = client.record.getList('list');

const data = getData();

listRef.setEntries(data.map(r => `record/${r.id}`));

data.forEach(datum => {
    client.record.getRecord(`record/${datum.id}`).set(datum, () => {
        console.log('imported', datum.id);
    });
});

function getData() {
    return [
        {id: '1', title: 'test 1', ts: Date.now() + 6},
        {id: '2', title: 'test 2', ts: Date.now()},
        {id: '3', title: 'test 3', ts: Date.now()},
        {id: '4', title: 'test 4', ts: Date.now()},
    ];
}
