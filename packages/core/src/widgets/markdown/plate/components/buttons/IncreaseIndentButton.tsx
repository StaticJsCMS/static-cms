import { FormatIndentIncrease as FormatIndentIncreaseIcon } from '@styled-icons/material/FormatIndentIncrease';
import { indent } from '@udecode/plate';
import React, { useCallback } from 'react';

import MenuItemButton from '@staticcms/core/components/common/menu/MenuItemButton';
import { useMdPlateEditorState } from '../../plateTypes';
import ToolbarButton from './common/ToolbarButton';

import type { FC } from 'react';

export interface IncreaseIndentButtonProps {
  disabled: boolean;
  variant?: 'button' | 'menu';
}

const IncreaseIndentButton: FC<IncreaseIndentButtonProps> = ({ disabled, variant }) => {
  const editor = useMdPlateEditorState();

  const handleIndent = useCallback(() => {
    indent(editor);
  }, [editor]);

  if (variant === 'menu') {
    return (
      <MenuItemButton key="insertRow" onClick={handleIndent} startIcon={FormatIndentIncreaseIcon}>
        Indent
      </MenuItemButton>
    );
  }

  return (
    <ToolbarButton
      tooltip="Indent"
      onClick={handleIndent}
      icon={<FormatIndentIncreaseIcon className="h-5 w-5" />}
      disabled={disabled}
    />
  );
};

export default IncreaseIndentButton;
