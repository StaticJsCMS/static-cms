import auth from './auth';
import collections from './collections';
import config from './config';
import cursors from './cursors';
import entries, * as fromEntries from './entries';
import entryDraft from './entryDraft';
import globalUI from './globalUI';
import integrations, * as fromIntegrations from './integrations';
import mediaLibrary from './mediaLibrary';
import medias from './medias';
import scroll from './scroll';
import search from './search';
import status from './status';

import type { Collection, State } from '../interface';
import type { IntegrationHooks } from './integrations';

const reducers = {
  auth,
  config,
  collections,
  search,
  integrations,
  entries,
  cursors,
  entryDraft,
  medias,
  mediaLibrary,
  globalUI,
  status,
  scroll,
};

export default reducers;

/*
 * Selectors
 */
export function selectEntry(state: State, collection: string, slug: string) {
  return fromEntries.selectEntry(state.entries, collection, slug);
}

export function selectEntries(state: State, collection: Collection) {
  return fromEntries.selectEntries(state.entries, collection);
}

export function selectPublishedSlugs(state: State, collection: string) {
  return fromEntries.selectPublishedSlugs(state.entries, collection);
}

export function selectSearchedEntries(state: State, availableCollections: string[]) {
  // only return search results for actually available collections
  return state.search.entryIds
    .filter(entryId => availableCollections.indexOf(entryId!.collection) !== -1)
    .map(entryId => fromEntries.selectEntry(state.entries, entryId!.collection, entryId!.slug));
}

export function selectIntegration<K extends keyof IntegrationHooks>(
  state: State,
  collection: string | null,
  hook: K,
): IntegrationHooks[K] | false {
  return fromIntegrations.selectIntegration(state.integrations, collection, hook);
}
