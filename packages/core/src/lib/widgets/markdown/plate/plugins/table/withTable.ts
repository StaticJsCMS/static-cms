import {
  withDeleteTable,
  withGetFragmentTable,
  withInsertFragmentTable,
  withInsertTextTable,
  withSelectionTable,
} from '@udecode/plate';

import type { MdValue } from '@staticcms/markdown';
import type { PlateEditor, TablePlugin, WithPlatePlugin } from '@udecode/plate';

const withTable = (
  editor: PlateEditor<MdValue>,
  plugin: WithPlatePlugin<TablePlugin<MdValue>, MdValue, PlateEditor<MdValue>>,
) => {
  editor = withDeleteTable<MdValue>(editor);
  editor = withGetFragmentTable<MdValue>(editor);
  editor = withInsertFragmentTable<MdValue>(editor, plugin);
  editor = withInsertTextTable<MdValue>(editor, plugin);
  editor = withSelectionTable<MdValue>(editor);

  return editor;
};

export default withTable;
