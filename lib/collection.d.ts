import { Observable } from "rxjs/Observable";
export declare function createCollection$Factory(client: any): <T>(dsListKey: string, mapFn?: (id: any) => any, params$?: Observable<{
    offset: number;
    limit: number;
}>) => Observable<T>;
