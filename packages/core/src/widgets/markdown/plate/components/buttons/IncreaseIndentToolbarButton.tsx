import { FormatIndentIncrease as FormatIndentIncreaseIcon } from '@styled-icons/material/FormatIndentIncrease';
import { indent } from '@udecode/plate';
import React, { useCallback } from 'react';

import { useMdPlateEditorState } from '../../plateTypes';
import ToolbarButton from './common/ToolbarButton';

import type { FC } from 'react';

export interface IncreaseIndentToolbarButtonProps {
  disabled: boolean;
  variant: 'button' | 'menu';
}

const IncreaseIndentToolbarButton: FC<IncreaseIndentToolbarButtonProps> = ({
  disabled,
  variant,
}) => {
  const editor = useMdPlateEditorState();

  const handleIndent = useCallback(() => {
    indent(editor);
  }, [editor]);

  return (
    <ToolbarButton
      tooltip="Increase indent"
      onClick={handleIndent}
      icon={FormatIndentIncreaseIcon}
      disabled={disabled}
      variant={variant}
    />
  );
};

export default IncreaseIndentToolbarButton;
