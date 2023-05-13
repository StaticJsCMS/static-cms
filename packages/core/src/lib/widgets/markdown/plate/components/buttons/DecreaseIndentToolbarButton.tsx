import { FormatIndentDecrease as FormatIndentDecreaseIcon } from '@styled-icons/material/FormatIndentDecrease';
import { outdent } from '@udecode/plate';
import React, { useCallback } from 'react';

import { useMdPlateEditorState } from '../../plateTypes';
import ToolbarButton from './common/ToolbarButton';

import type { FC } from 'react';

export interface DecreaseIndentToolbarButtonProps {
  disabled: boolean;
  variant: 'button' | 'menu';
}

const DecreaseIndentToolbarButton: FC<DecreaseIndentToolbarButtonProps> = ({
  disabled,
  variant,
}) => {
  const editor = useMdPlateEditorState();

  const handleOutdent = useCallback(() => {
    outdent(editor);
  }, [editor]);

  return (
    <ToolbarButton
      tooltip="Decrease indent"
      onClick={handleOutdent}
      icon={FormatIndentDecreaseIcon}
      disabled={disabled}
      variant={variant}
    />
  );
};

export default DecreaseIndentToolbarButton;
