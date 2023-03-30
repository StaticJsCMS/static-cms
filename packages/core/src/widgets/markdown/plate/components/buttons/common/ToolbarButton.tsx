import { focusEditor } from '@udecode/plate';
import React, { useCallback } from 'react';

import Button from '@staticcms/core/components/common/button/Button';
import classNames from '@staticcms/core/lib/util/classNames.util';
import { useMdPlateEditorState } from '@staticcms/markdown/plate/plateTypes';

import type { MdEditor } from '@staticcms/markdown';
import type { CSSProperties, FC, MouseEvent, ReactNode } from 'react';

export interface ToolbarButtonProps {
  label?: string;
  tooltip: string;
  active?: boolean;
  activeColor?: string;
  icon: ReactNode;
  disableFocusAfterClick?: boolean;
  disabled: boolean;
  onClick: (editor: MdEditor, event: MouseEvent<HTMLButtonElement>) => void;
}

const ToolbarButton: FC<ToolbarButtonProps> = ({
  icon,
  tooltip,
  label,
  active = false,
  activeColor,
  disableFocusAfterClick = false,
  disabled,
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

  const style: CSSProperties = {};
  if (active && activeColor) {
    style.color = activeColor;
  }

  return (
    <Button
      aria-label={label ?? tooltip}
      variant="text"
      data-testid={`toolbar-button-${label ?? tooltip}`.replace(' ', '-').toLowerCase()}
      onClick={handleOnClick}
      className={classNames(
        `
          py-0.5
          px-0.5
        `,
        active &&
          !activeColor &&
          `
            text-blue-500
            bg-gray-100
            dark:text-blue-500
            dark:bg-slate-800
          `,
      )}
      style={style}
      disabled={disabled}
    >
      {icon}
    </Button>
  );
};

export default ToolbarButton;
