import { isMarkActive, toggleMark } from '@udecode/plate';
import React, { useCallback } from 'react';

import { useMdPlateEditorState } from '@staticcms/markdown/plate/plateTypes';
import ToolbarButton from './ToolbarButton';

import type { FC } from 'react';
import type { ToolbarButtonProps } from './ToolbarButton';

export interface MarkToolbarButtonProps
  extends Omit<ToolbarButtonProps, 'active' | 'onClick' | 'icon'> {
  type: string;
  clear?: string | string[];
  variant: 'button' | 'menu';
  icon: FC<{ className?: string }>;
}

const MarkToolbarButton: FC<MarkToolbarButtonProps> = ({ type, clear, icon, ...props }) => {
  const editor = useMdPlateEditorState();

  const handleOnClick = useCallback(() => {
    toggleMark(editor, { key: type, clear });
  }, [clear, editor, type]);

  return (
    <ToolbarButton
      active={!!editor?.selection && isMarkActive(editor, type)}
      onClick={handleOnClick}
      icon={icon}
      {...props}
    />
  );
};

export default MarkToolbarButton;
