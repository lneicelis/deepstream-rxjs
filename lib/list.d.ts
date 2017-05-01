import { Observable } from "rxjs/Observable";
export declare function createList$Factory(client: any): (<T>(listKey: string) => Observable<T[]>) & _.MemoizedFunction;
