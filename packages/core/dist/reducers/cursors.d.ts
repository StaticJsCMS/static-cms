import type { EntriesAction } from '../actions/entries';
import type { CursorStore } from '../lib/util/Cursor';
export interface CursorsState {
    cursorsByType: {
        collectionEntries: Record<string, CursorStore>;
    };
}
declare function cursors(state: CursorsState | undefined, action: EntriesAction): CursorsState;
export default cursors;
