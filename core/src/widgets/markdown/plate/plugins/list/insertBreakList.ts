import { ELEMENT_DEFAULT, getPluginType, isBlockAboveEmpty, mockPlugin } from '@udecode/plate-core';
import { ELEMENT_LI, getListItemEntry, moveListItemUp, unwrapList } from '@udecode/plate-list';
import { onKeyDownResetNode, SIMULATE_BACKSPACE } from '@udecode/plate-reset-node';

import insertListItem from './transforms/insertListItem';

import type { PlateEditor } from '@udecode/plate-core';
import type { ResetNodePlugin } from '@udecode/plate-reset-node';
import type { MdValue } from '@staticcms/markdown';

const insertBreakList = (editor: PlateEditor<MdValue>) => {
  if (!editor.selection) return;

  const res = getListItemEntry(editor, {});
  let moved: boolean | undefined;

  // If selection is in a li
  if (res) {
    const { list, listItem } = res;

    // If selected li is empty, move it up.
    if (isBlockAboveEmpty(editor)) {
      moved = moveListItemUp(editor, {
        list,
        listItem,
      });

      if (moved) return true;
    }
  }

  const didReset = onKeyDownResetNode(
    editor as PlateEditor,
    mockPlugin<ResetNodePlugin>({
      options: {
        rules: [
          {
            types: [getPluginType(editor, ELEMENT_LI)],
            defaultType: getPluginType(editor, ELEMENT_DEFAULT),
            predicate: () => !moved && isBlockAboveEmpty(editor),
            onReset: _editor => unwrapList(_editor),
          },
        ],
      },
    }),
  )(SIMULATE_BACKSPACE);
  if (didReset) return true;

  /**
   * If selection is in li > p, insert li.
   */
  if (!moved) {
    const inserted = insertListItem(editor);
    if (inserted) return true;
  }
};

export default insertBreakList;
