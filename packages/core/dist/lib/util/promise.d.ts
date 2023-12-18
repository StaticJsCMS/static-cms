export declare function then<T, V>(fn: (r: T) => V): (p: Promise<T>) => Promise<V>;
export declare function onlySuccessfulPromises(promises: Promise<unknown>[]): Promise<unknown[]>;
export declare function flowAsync(fns: Function[]): (...args: any[]) => any;
