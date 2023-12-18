import type { PlateEditor } from '@udecode/plate';
import type { MdValue } from '@staticcms/markdown';
/**
 * Insert list item if selection in li>p.
 * TODO: test
 */
declare const insertListItem: (editor: PlateEditor<MdValue>) => boolean;
export default insertListItem;
