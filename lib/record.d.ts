import { Observable } from "rxjs/Observable";
export declare function createRecord$Factory(client: any): (<T>(recordKey: string) => Observable<T>) & _.MemoizedFunction;
