import { someNode, toggleNodeType } from '@udecode/plate';
import React, { useCallback } from 'react';

import { useMdPlateEditorState } from '@staticcms/markdown/plate/plateTypes';
import ToolbarButton from './ToolbarButton';

import type { FC } from 'react';
import type { ToolbarButtonProps } from './ToolbarButton';

export interface BlockToolbarButtonProps extends Omit<ToolbarButtonProps, 'active' | 'onClick'> {
  type: string;
  inactiveType?: string;
  variant: 'button' | 'menu';
}

const BlockToolbarButton: FC<BlockToolbarButtonProps> = ({
  type,
  inactiveType,
  icon,
  ...props
}) => {
  const editor = useMdPlateEditorState();

  const handleOnClick = useCallback(() => {
    toggleNodeType(editor, { activeType: type, inactiveType });
  }, [editor, inactiveType, type]);

  return (
    <ToolbarButton
      key={type}
      active={!!editor?.selection && someNode(editor, { match: { type } })}
      onClick={handleOnClick}
      icon={icon}
      {...props}
    />
  );
};

export default BlockToolbarButton;
