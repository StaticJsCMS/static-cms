import { FormatIndentDecrease as FormatIndentDecreaseIcon } from '@styled-icons/material/FormatIndentDecrease';
import { FormatIndentIncrease as FormatIndentIncreaseIcon } from '@styled-icons/material/FormatIndentIncrease';
import { FormatListBulleted as FormatListBulletedIcon } from '@styled-icons/material/FormatListBulleted';
import { FormatListNumbered as FormatListNumberedIcon } from '@styled-icons/material/FormatListNumbered';
import { ELEMENT_OL, ELEMENT_UL, getPluginType, indent, outdent } from '@udecode/plate';
import React, { useCallback } from 'react';

import { useMdPlateEditorRef } from '@staticcms/markdown';
import ListToolbarButton from './common/ListToolbarButton';
import ToolbarButton from './common/ToolbarButton';

import type { FC } from 'react';
import type { MdEditor } from '@staticcms/markdown';

const ListToolbarButtons: FC = () => {
  const editor = useMdPlateEditorRef();

  const handleOutdent = useCallback((editor: MdEditor) => {
    outdent(editor);
  }, []);

  const handleIndent = useCallback((editor: MdEditor) => {
    indent(editor);
  }, []);

  return (
    <>
      <ListToolbarButton tooltip="List" type={ELEMENT_UL} icon={<FormatListBulletedIcon />} />
      <ListToolbarButton
        tooltip="Numbered List"
        type={getPluginType(editor, ELEMENT_OL)}
        icon={<FormatListNumberedIcon />}
      />
      <ToolbarButton
        tooltip="Outdent"
        onClick={handleOutdent}
        icon={<FormatIndentDecreaseIcon />}
      />
      <ToolbarButton tooltip="Indent" onClick={handleIndent} icon={<FormatIndentIncreaseIcon />} />
    </>
  );
};

export default ListToolbarButtons;
