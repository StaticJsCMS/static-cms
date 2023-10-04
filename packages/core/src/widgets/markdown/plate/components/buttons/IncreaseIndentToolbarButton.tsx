import { FormatIndentIncrease as FormatIndentIncreaseIcon } from '@styled-icons/material/FormatIndentIncrease';
import { indent } from '@udecode/plate';
import React, { useCallback } from 'react';

import { useMdPlateEditorState } from '../../plateTypes';
import ToolbarButton from './common/ToolbarButton';

import type { TranslatedProps } from '@staticcms/core/interface';
import type { FC } from 'react';

export interface IncreaseIndentToolbarButtonProps {
  disabled: boolean;
  variant: 'button' | 'menu';
}

const IncreaseIndentToolbarButton: FC<TranslatedProps<IncreaseIndentToolbarButtonProps>> = ({
  disabled,
  variant,
  t,
}) => {
  const editor = useMdPlateEditorState();

  const handleIndent = useCallback(() => {
    indent(editor);
  }, [editor]);

  return (
    <ToolbarButton
      tooltip={t('editor.editorWidgets.markdown.increaseIndent')}
      onClick={handleIndent}
      icon={FormatIndentIncreaseIcon}
      disabled={disabled}
      variant={variant}
    />
  );
};

export default IncreaseIndentToolbarButton;
