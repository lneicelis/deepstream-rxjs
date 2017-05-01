import {Observable} from "rxjs/Observable";
import {createList$Factory} from "./list";
import {createRecord$Factory} from "./record";

interface DsRecord {
    _dsRecordKey: string
}

interface DsRecordsByKey {
    [key: string]: DsRecord
}

const defaultMapFn = (id: any) => id;

const defaultParams$ = Observable.of({offset: 0, limit: Infinity});

export function createCollection$Factory(client) {
    const createList$ = createList$Factory(client);
    const createRecord$ = createRecord$Factory(client);

    return function createCollection$<T>(
        dsListKey: string,
        mapFn = defaultMapFn,
        params$ = defaultParams$
    ): Observable<T> {
        return params$
            .switchMap(({offset, limit}) => createList$<string[]>(dsListKey)
                .map(list => list.slice(offset, offset + limit))
            )
            .switchMap(list => Observable
                .merge(...list.map(itemId => createRecord$(mapFn(itemId))))
                .scan((byKey: DsRecordsByKey, record: DsRecord) => {
                    byKey[record._dsRecordKey] = record;

                    return byKey;
                }, {})
            )
    };

}
