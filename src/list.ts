import createDebug = require('debug');
import memoize = require('lodash.memoize');
import {Observable} from "rxjs/Observable";
import {Observer} from "rxjs/Observer";

const debug = createDebug('ds-rxjs:list');

export function createList$Factory(client) {

    return memoize(createList$);

    function createList$<T>(listKey: string): Observable<T[]> {
        const listRef = client.record.getList(listKey);

        debug(`list "${listKey}" ref created`);

        return Observable.create((observer: Observer<T[]>) => {
            const handler = (value: T[]) => {
                observer.next(value);

                debug(`list "${listKey}" ref value passed`, value);
            };

            listRef.subscribe(handler, true);

            debug(`list "${listKey}" subscribed`);

            return () => {
                listRef.unsubscribe(handler);

                debug(`list "${listKey}" unsubscribed`);
            };
        });
    }

}
