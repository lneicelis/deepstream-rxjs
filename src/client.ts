import {Subject} from "rxjs";
import {createClient} from "./index";

export const client = createClient('localhost:6020');

client.login();

const params$ = new Subject();

client.createCollection$('list', undefined, params$.startWith({offset: 2, limit: 2}))
    .debounceTime(13)
    .subscribe(value => {
        console.log(value);
    });

setTimeout(() => {
    params$.next({offset: 1, limit: 2});
}, 3000);
