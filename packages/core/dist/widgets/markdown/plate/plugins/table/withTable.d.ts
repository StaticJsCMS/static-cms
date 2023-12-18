import type { MdValue } from '@staticcms/markdown';
import type { PlateEditor, TablePlugin, WithPlatePlugin } from '@udecode/plate';
declare const withTable: (editor: PlateEditor<MdValue>, plugin: WithPlatePlugin<TablePlugin<MdValue>, MdValue, PlateEditor<MdValue>>) => PlateEditor<MdValue>;
export default withTable;
