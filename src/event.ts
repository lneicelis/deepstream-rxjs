import createDebug = require('debug');
import memoize = require('lodash.memoize');
import {Observable} from "rxjs/Observable";
import {Observer} from "rxjs/Observer";

const debug = createDebug('ds-rxjs:event');

export function createEvent$Factory(client) {

    return function createEvent$<T>(eventKey: string): Observable<T> {
        return Observable.create((observer: Observer<T>) => {
            const handler = (value: T) => {
                observer.next(value);

                debug(`"${eventKey}" value`, value);
            };

            client.event.subscribe(eventKey, handler);

            debug(`"${eventKey}" subscribed`);

            return () => {
                client.event.unsubscribe(eventKey, handler);

                debug(`"${eventKey}" unsubscribed`);
            }
        });
    }

}
