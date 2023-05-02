import { FormatIndentIncrease as FormatIndentIncreaseIcon } from '@styled-icons/material/FormatIndentIncrease';
import { indent } from '@udecode/plate';
import React, { useCallback } from 'react';

import ToolbarButton from './common/ToolbarButton';

import type { MdEditor } from '@staticcms/markdown';
import type { FC } from 'react';

export interface DecreaseIndentButtonProps {
  disabled: boolean;
}

const DecreaseIndentButton: FC<DecreaseIndentButtonProps> = ({ disabled }) => {
  const handleIndent = useCallback((editor: MdEditor) => {
    indent(editor);
  }, []);

  return (
    <ToolbarButton
      tooltip="Indent"
      onClick={handleIndent}
      icon={<FormatIndentIncreaseIcon className="h-5 w-5" />}
      disabled={disabled}
    />
  );
};

export default DecreaseIndentButton;
