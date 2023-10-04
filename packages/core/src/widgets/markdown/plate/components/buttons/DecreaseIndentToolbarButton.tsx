import { FormatIndentDecrease as FormatIndentDecreaseIcon } from '@styled-icons/material/FormatIndentDecrease';
import { outdent } from '@udecode/plate';
import React, { useCallback } from 'react';

import { useMdPlateEditorState } from '../../plateTypes';
import ToolbarButton from './common/ToolbarButton';

import type { FC } from 'react';
import { TranslatedProps } from '@staticcms/core/interface';

export interface DecreaseIndentToolbarButtonProps {
  disabled: boolean;
  variant: 'button' | 'menu';
}

const DecreaseIndentToolbarButton: FC<TranslatedProps<DecreaseIndentToolbarButtonProps>> = ({
  disabled,
  variant,
  t,
}) => {
  const editor = useMdPlateEditorState();

  const handleOutdent = useCallback(() => {
    outdent(editor);
  }, [editor]);

  return (
    <ToolbarButton
      tooltip={t('editor.editorWidgets.markdown.decreaseIndent')}
      onClick={handleOutdent}
      icon={FormatIndentDecreaseIcon}
      disabled={disabled}
      variant={variant}
    />
  );
};

export default DecreaseIndentToolbarButton;
