import { isCollapsed, KEY_ALIGN, setAlign, someNode } from '@udecode/plate';
import React, { useCallback } from 'react';

import { useMdPlateEditorState } from '@staticcms/markdown';
import ToolbarButton from './ToolbarButton';

import type { MdEditor } from '@staticcms/markdown';
import type { Alignment } from '@udecode/plate';
import type { FC } from 'react';
import type { ToolbarButtonProps } from './ToolbarButton';

export interface AlignToolbarButtonProps extends Omit<ToolbarButtonProps, 'active' | 'onClick'> {
  value: Alignment;
  pluginKey?: string;
}

const AlignToolbarButton: FC<AlignToolbarButtonProps> = ({
  value,
  pluginKey = KEY_ALIGN,
  ...props
}) => {
  const editor = useMdPlateEditorState();

  const handleOnClick = useCallback(
    (editor: MdEditor) => {
      setAlign(editor, {
        value,
        key: pluginKey,
      });
    },
    [pluginKey, value],
  );

  return (
    <ToolbarButton
      active={
        isCollapsed(editor?.selection) && someNode(editor!, { match: { [pluginKey]: value } })
      }
      onClick={handleOnClick}
      {...props}
    />
  );
};

export default AlignToolbarButton;
