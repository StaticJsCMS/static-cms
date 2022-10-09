import isHotkey from 'is-hotkey';

import type { KeyboardEvent } from 'react';
import type { SlateEditor } from '../VisualEditor';

function SelectAll() {
  return {
    onKeyDown(event: KeyboardEvent, editor: SlateEditor, next: () => void) {
      const isModA = isHotkey('mod+a', event);
      if (!isModA) {
        return next();
      }
      event.preventDefault();
      return editor.moveToRangeOfDocument();
    },
  };
}

export default SelectAll;
