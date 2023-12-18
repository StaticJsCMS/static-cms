import type { MdValue } from '@staticcms/markdown';
import type { PlateEditor, WithPlatePlugin } from '@udecode/plate';
import type { ListPlugin } from '@udecode/plate-list';
declare const withList: (editor: PlateEditor<MdValue>, { options: { validLiChildrenTypes } }: WithPlatePlugin<ListPlugin, MdValue, PlateEditor<MdValue>>) => PlateEditor<MdValue>;
export default withList;
