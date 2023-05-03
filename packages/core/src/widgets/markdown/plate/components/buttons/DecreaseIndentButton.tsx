import { FormatIndentDecrease as FormatIndentDecreaseIcon } from '@styled-icons/material/FormatIndentDecrease';
import { outdent } from '@udecode/plate';
import React, { useCallback } from 'react';

import MenuItemButton from '@staticcms/core/components/common/menu/MenuItemButton';
import { useMdPlateEditorState } from '../../plateTypes';
import ToolbarButton from './common/ToolbarButton';

import type { FC } from 'react';

export interface DecreaseIndentButtonProps {
  disabled: boolean;
  variant?: 'button' | 'menu';
}

const DecreaseIndentButton: FC<DecreaseIndentButtonProps> = ({ disabled, variant }) => {
  const editor = useMdPlateEditorState();

  const handleOutdent = useCallback(() => {
    outdent(editor);
  }, [editor]);

  if (variant === 'menu') {
    return (
      <MenuItemButton key="insertRow" onClick={handleOutdent} startIcon={FormatIndentDecreaseIcon}>
        Outdent
      </MenuItemButton>
    );
  }

  return (
    <ToolbarButton
      tooltip="Outdent"
      onClick={handleOutdent}
      icon={<FormatIndentDecreaseIcon className="h-5 w-5" />}
      disabled={disabled}
    />
  );
};

export default DecreaseIndentButton;
