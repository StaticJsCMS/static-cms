import { FormatIndentDecrease as FormatIndentDecreaseIcon } from '@styled-icons/material/FormatIndentDecrease';
import { outdent } from '@udecode/plate';
import React, { useCallback } from 'react';

import ToolbarButton from './common/ToolbarButton';

import type { MdEditor } from '@staticcms/markdown';
import type { FC } from 'react';

export interface IncreaseIndentButtonProps {
  disabled: boolean;
}

const IncreaseIndentButton: FC<IncreaseIndentButtonProps> = ({ disabled }) => {
  const handleOutdent = useCallback((editor: MdEditor) => {
    outdent(editor);
  }, []);

  return (
    <ToolbarButton
      tooltip="Outdent"
      onClick={handleOutdent}
      icon={<FormatIndentDecreaseIcon className="h-5 w-5" />}
      disabled={disabled}
    />
  );
};

export default IncreaseIndentButton;
