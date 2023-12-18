import type { SearchAction } from '../actions/search';
import type { SearchQueryRequest } from '../interface';
export interface SearchState {
    isFetching: boolean;
    term: string;
    collections: string[];
    page: number;
    entryIds: {
        collection: string;
        slug: string;
    }[];
    error: Error | undefined;
    requests: SearchQueryRequest[];
}
declare const search: (state: SearchState | undefined, action: SearchAction) => SearchState;
export default search;
