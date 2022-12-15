import {
  deleteBackwardList,
  deleteForwardList,
  deleteFragmentList,
  insertFragmentList,
  normalizeList,
} from '@udecode/plate-list';

import insertBreakList from './insertBreakList';

import type { PlateEditor, WithPlatePlugin } from '@udecode/plate-core';
import type { ListPlugin } from '@udecode/plate-list';
import type { MdValue } from '@staticcms/markdown';

const withList = (
  editor: PlateEditor<MdValue>,
  { options: { validLiChildrenTypes } }: WithPlatePlugin<ListPlugin, MdValue, PlateEditor<MdValue>>,
) => {
  const { insertBreak, deleteBackward, deleteForward, deleteFragment } = editor;

  editor.insertBreak = () => {
    if (insertBreakList(editor)) {
      return;
    }

    insertBreak();
  };

  editor.deleteBackward = unit => {
    if (deleteBackwardList(editor, unit)) {
      return;
    }

    deleteBackward(unit);
  };

  editor.deleteForward = unit => {
    if (deleteForwardList(editor)) {
      return;
    }

    deleteForward(unit);
  };

  editor.deleteFragment = () => {
    if (deleteFragmentList(editor)) {
      return;
    }

    deleteFragment();
  };

  editor.insertFragment = insertFragmentList(editor);

  editor.normalizeNode = normalizeList(editor, { validLiChildrenTypes });

  return editor;
};

export default withList;
