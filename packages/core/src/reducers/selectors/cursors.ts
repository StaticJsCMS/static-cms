/* eslint-disable import/prefer-default-export */

import Cursor from '@staticcms/core/lib/util/Cursor';

import type { RootState } from '@staticcms/core/store';

// Since pagination can be used for a variety of views (collections
// and searches are the most common examples), we namespace cursors by
// their type before storing them in the state.
export function selectCollectionEntriesCursor(state: RootState, collectionName: string) {
  return new Cursor(state.cursors.cursorsByType.collectionEntries[collectionName]);
}
