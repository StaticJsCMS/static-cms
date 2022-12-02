import { isMarkActive, toggleMark } from '@udecode/plate';
import React, { useCallback } from 'react';

import { useMdPlateEditorState } from '@staticcms/markdown';
import ToolbarButton from './ToolbarButton';

import type { MdEditor } from '@staticcms/markdown';
import type { FC } from 'react';
import type { ToolbarButtonProps } from './ToolbarButton';

export interface MarkToolbarButtonProps extends Omit<ToolbarButtonProps, 'active' | 'onClick'> {
  type: string;
  clear?: string | string[];
}

const MarkToolbarButton: FC<MarkToolbarButtonProps> = ({ type, clear, ...props }) => {
  const editor = useMdPlateEditorState();

  const handleOnClick = useCallback(
    (editor: MdEditor) => {
      toggleMark(editor, { key: type, clear });
    },
    [clear, type],
  );

  return (
    <ToolbarButton
      active={!!editor?.selection && isMarkActive(editor, type)}
      onClick={handleOnClick}
      {...props}
    />
  );
};

export default MarkToolbarButton;
