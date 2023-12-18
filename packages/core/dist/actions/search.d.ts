import type { AnyAction } from 'redux';
import type { ThunkDispatch } from 'redux-thunk';
import type { Entry, SearchQueryRequest } from '../interface';
import type { RootState } from '../store';
export declare function searchingEntries(searchTerm: string, searchCollections: string[], page: number): {
    readonly type: "SEARCH_ENTRIES_REQUEST";
    readonly payload: {
        readonly searchTerm: string;
        readonly searchCollections: string[];
        readonly page: number;
    };
};
export declare function searchSuccess(entries: Entry[], page: number): {
    readonly type: "SEARCH_ENTRIES_SUCCESS";
    readonly payload: {
        readonly entries: Entry<import("../interface").ObjectValue>[];
        readonly page: number;
    };
};
export declare function searchFailure(error: Error): {
    readonly type: "SEARCH_ENTRIES_FAILURE";
    readonly payload: {
        readonly error: Error;
    };
};
export declare function querying(searchTerm: string, request?: SearchQueryRequest): {
    readonly type: "QUERY_REQUEST";
    readonly payload: {
        readonly searchTerm: string;
        readonly request: SearchQueryRequest | undefined;
    };
};
export declare function querySuccess(namespace: string, hits: Entry[]): {
    readonly type: "QUERY_SUCCESS";
    readonly payload: {
        readonly namespace: string;
        readonly hits: Entry<import("../interface").ObjectValue>[];
    };
};
export declare function queryFailure(error: Error): {
    readonly type: "QUERY_FAILURE";
    readonly payload: {
        readonly error: Error;
    };
};
export declare function clearSearch(): {
    readonly type: "SEARCH_CLEAR";
};
export declare function clearRequests(): {
    readonly type: "CLEAR_REQUESTS";
};
export declare function searchEntries(searchTerm: string, searchCollections: string[], page?: number): (dispatch: ThunkDispatch<RootState, undefined, AnyAction>, getState: () => RootState) => Promise<{
    readonly type: "SEARCH_ENTRIES_SUCCESS";
    readonly payload: {
        readonly entries: Entry<import("../interface").ObjectValue>[];
        readonly page: number;
    };
} | {
    readonly type: "SEARCH_ENTRIES_FAILURE";
    readonly payload: {
        readonly error: Error;
    };
} | undefined>;
export declare function query(namespace: string, collectionName: string, searchFields: string[], searchTerm: string, file?: string, limit?: number): (dispatch: ThunkDispatch<RootState, {}, AnyAction>, getState: () => RootState) => Promise<{
    readonly type: "QUERY_SUCCESS";
    readonly payload: {
        readonly namespace: string;
        readonly hits: Entry<import("../interface").ObjectValue>[];
    };
} | {
    readonly type: "QUERY_FAILURE";
    readonly payload: {
        readonly error: Error;
    };
} | undefined>;
export type SearchAction = ReturnType<typeof searchingEntries | typeof searchSuccess | typeof searchFailure | typeof querying | typeof querySuccess | typeof queryFailure | typeof clearSearch | typeof clearRequests>;
