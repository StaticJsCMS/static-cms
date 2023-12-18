import type { EntriesAction } from '../actions/entries';
import type { SearchAction } from '../actions/search';
import type { ViewStyle } from '../constants/views';
import type { Entities, Filter, Group, Pages, Sort } from '../interface';
export type EntriesState = {
    pages: Pages;
    entities: Entities;
    sort: Sort;
    filter?: Filter;
    group?: Group;
    viewStyle: ViewStyle;
};
declare function entries(state: EntriesState | undefined, action: EntriesAction | SearchAction): EntriesState;
export default entries;
