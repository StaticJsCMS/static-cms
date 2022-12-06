import auth from './auth';
import collections from './collections';
import config from './config';
import cursors from './cursors';
import entries, * as fromEntries from './entries';
import entryDraft from './entryDraft';
import globalUI from './globalUI';
import mediaLibrary from './mediaLibrary';
import medias from './medias';
import scroll from './scroll';
import search from './search';
import status from './status';

import type { Collection } from '../interface';
import type { RootState } from '../store';

const reducers = {
  auth,
  collections,
  config,
  cursors,
  entries,
  entryDraft,
  globalUI,
  mediaLibrary,
  medias,
  scroll,
  search,
  status,
};

export default reducers;

/*
 * Selectors
 */
export function selectEntry(state: RootState, collection: string, slug: string) {
  return fromEntries.selectEntry(state.entries, collection, slug);
}

export function selectEntries(state: RootState, collection: Collection) {
  return fromEntries.selectEntries(state.entries, collection);
}

export function selectPublishedSlugs(state: RootState, collection: string) {
  return fromEntries.selectPublishedSlugs(state.entries, collection);
}

export function selectSearchedEntries(state: RootState, availableCollections: string[]) {
  // only return search results for actually available collections
  return state.search.entryIds
    .filter(entryId => availableCollections.indexOf(entryId!.collection) !== -1)
    .map(entryId => fromEntries.selectEntry(state.entries, entryId!.collection, entryId!.slug));
}
