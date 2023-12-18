export declare function isNotNullish<T>(value: T | null | undefined): value is T;
export declare function isNullish<T>(value: T | null | undefined): value is null | undefined;
export declare function filterNullish<T>(value: (T | null | undefined)[] | null | undefined): T[];
