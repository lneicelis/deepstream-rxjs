import createDebug = require('debug');
import memoize = require('lodash.memoize');
import {Observable} from "rxjs/Observable";
import {Observer} from "rxjs/Observer";

const debug = createDebug('ds-rxjs:record');

export function createRecord$Factory(client) {

    return memoize(createRecord$);

    function createRecord$<T>(recordKey: string): Observable<T> {
        const recordRef = client.record.getRecord(recordKey);

        debug(`"${recordKey}" ref created`);

        return Observable.create((observer: Observer<T>) => {
            const handler = (value: T) => {
                observer.next({
                    ...value,
                    _dsRecordKey: recordKey
                });

                debug(`"${recordKey}" value`, value);
            };

            recordRef.subscribe(handler, true);

            debug(`"${recordKey}" ref subscribed`);

            return () => {
                recordRef.unsubscribe(handler);

                debug(`"${recordKey}" unsubscribed`);
            }
        });
    }

}
