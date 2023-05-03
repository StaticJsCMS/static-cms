import { isMarkActive, toggleMark } from '@udecode/plate';
import React, { useCallback } from 'react';

import MenuItemButton from '@staticcms/core/components/common/menu/MenuItemButton';
import { useMdPlateEditorState } from '@staticcms/markdown/plate/plateTypes';
import ToolbarButton from './ToolbarButton';

import type { FC } from 'react';
import type { ToolbarButtonProps } from './ToolbarButton';

export interface MarkToolbarButtonProps
  extends Omit<ToolbarButtonProps, 'active' | 'onClick' | 'icon'> {
  type: string;
  clear?: string | string[];
  variant?: 'button' | 'menu';
  icon: FC<{ className?: string }>;
}

const MarkToolbarButton: FC<MarkToolbarButtonProps> = ({
  type,
  clear,
  variant,
  icon: Icon,
  ...props
}) => {
  const editor = useMdPlateEditorState();

  const handleOnClick = useCallback(() => {
    toggleMark(editor, { key: type, clear });
  }, [clear, editor, type]);

  if (variant === 'menu') {
    return (
      <MenuItemButton key="insertRow" onClick={handleOnClick} startIcon={Icon}>
        File / Link
      </MenuItemButton>
    );
  }

  return (
    <ToolbarButton
      active={!!editor?.selection && isMarkActive(editor, type)}
      onClick={handleOnClick}
      icon={<Icon className="h-5 w-5" />}
      {...props}
    />
  );
};

export default MarkToolbarButton;
