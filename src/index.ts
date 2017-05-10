import deepstream = require('deepstream.io-client-js');
import {createCollection$Factory} from "./collection";
import {createRecord$Factory} from "./record";
import {createList$Factory} from "./list";
import {createEvent$Factory} from "./event";

export function createClient(url: string, options: Options = {}): deepstreamQuarantine {
    const client = deepstream(url, options);

    client.constructor.prototype.createList$ = createList$Factory(client);
    client.constructor.prototype.createEvent$ = createEvent$Factory(client);
    client.constructor.prototype.createRecord$ = createRecord$Factory(client);
    client.constructor.prototype.createCollection$ = createCollection$Factory(client);

    return client;
}
