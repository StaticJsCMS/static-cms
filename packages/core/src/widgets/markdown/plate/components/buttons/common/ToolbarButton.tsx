import { focusEditor } from '@udecode/plate';
import React, { useCallback } from 'react';

import { useMdPlateEditorState } from '@staticcms/markdown/plate/plateTypes';
import Button from '@staticcms/core/components/common/button/Button';

import type { MdEditor } from '@staticcms/markdown';
import type { FC, MouseEvent, ReactNode } from 'react';

export interface ToolbarButtonProps {
  label?: string;
  tooltip: string;
  active?: boolean;
  activeColor?: string;
  icon: ReactNode;
  disableFocusAfterClick?: boolean;
  onClick: (editor: MdEditor, event: MouseEvent<HTMLButtonElement>) => void;
}

const ToolbarButton: FC<ToolbarButtonProps> = ({
  icon,
  tooltip,
  label,
  active = false,
  activeColor,
  disableFocusAfterClick = false,
  onClick,
}) => {
  const editor = useMdPlateEditorState();

  const handleOnClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();

      if (!editor) {
        return;
      }

      onClick(editor, event);

      if (!disableFocusAfterClick) {
        setTimeout(() => {
          focusEditor(editor);
        });
      }
    },
    [disableFocusAfterClick, editor, onClick],
  );

  return (
    <Button
      aria-label={label ?? tooltip}
      variant="text"
      data-testid={`toolbar-button-${label ?? tooltip}`.replace(' ', '-').toLowerCase()}
      onClick={handleOnClick}
      className="
        py-0.5
        px-0.5
      "
    >
      {icon}
    </Button>
  );
};

export default ToolbarButton;
