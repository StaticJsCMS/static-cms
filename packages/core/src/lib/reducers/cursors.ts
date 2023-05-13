import {
  ENTRIES_SUCCESS,
  FILTER_ENTRIES_SUCCESS,
  GROUP_ENTRIES_SUCCESS,
  SORT_ENTRIES_SUCCESS,
} from '../constants';
import { Cursor } from '../lib/util';

import type { EntriesAction } from '../actions/entries';
import type { CursorStore } from '../lib/util/Cursor';

export interface CursorsState {
  cursorsByType: {
    collectionEntries: Record<string, CursorStore>;
  };
}

function cursors(
  state: CursorsState = { cursorsByType: { collectionEntries: {} } },
  action: EntriesAction,
): CursorsState {
  switch (action.type) {
    case ENTRIES_SUCCESS: {
      return {
        cursorsByType: {
          collectionEntries: {
            ...state.cursorsByType.collectionEntries,
            [action.payload.collection]: Cursor.create(action.payload.cursor).store,
          },
        },
      };
    }
    case FILTER_ENTRIES_SUCCESS:
    case GROUP_ENTRIES_SUCCESS:
    case SORT_ENTRIES_SUCCESS: {
      const newCollectionEntries = {
        ...state.cursorsByType.collectionEntries,
      };

      delete newCollectionEntries[action.payload.collection];

      return {
        cursorsByType: {
          collectionEntries: newCollectionEntries,
        },
      };
    }
    default:
      return state;
  }
}

export default cursors;
