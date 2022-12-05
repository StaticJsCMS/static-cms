import { someNode, toggleNodeType } from '@udecode/plate';
import React, { useCallback } from 'react';

import { useMdPlateEditorState } from '@staticcms/markdown';
import ToolbarButton from './ToolbarButton';

import type { MdEditor } from '@staticcms/markdown';
import type { FC } from 'react';
import type { ToolbarButtonProps } from './ToolbarButton';

export interface BlockToolbarButtonProps extends Omit<ToolbarButtonProps, 'active' | 'onClick'> {
  type: string;
  inactiveType?: string;
  onClick?: (editor: MdEditor) => void;
}

const BlockToolbarButton: FC<BlockToolbarButtonProps> = ({
  type,
  inactiveType,
  onClick,
  ...props
}) => {
  const editor = useMdPlateEditorState();

  const handleOnClick = useCallback(
    (editor: MdEditor) => {
      toggleNodeType(editor, { activeType: type, inactiveType });
    },
    [inactiveType, type],
  );

  return (
    <ToolbarButton
      active={!!editor?.selection && someNode(editor, { match: { type } })}
      onClick={onClick ?? handleOnClick}
      {...props}
    />
  );
};

export default BlockToolbarButton;
