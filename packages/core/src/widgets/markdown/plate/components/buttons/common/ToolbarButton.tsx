import { focusEditor } from '@udecode/plate';
import React, { useCallback } from 'react';

import Button from '@staticcms/core/components/common/button/Button';
import MenuItemButton from '@staticcms/core/components/common/menu/MenuItemButton';
import classNames from '@staticcms/core/lib/util/classNames.util';
import { useMdPlateEditorState } from '@staticcms/markdown/plate/plateTypes';

import type { CSSProperties, FC, MouseEvent } from 'react';

export interface ToolbarButtonProps {
  label?: string;
  tooltip: string;
  active?: boolean;
  activeColor?: string;
  icon: FC<{ className?: string }>;
  disableFocusAfterClick?: boolean;
  disabled: boolean;
  variant: 'button' | 'menu';
  onClick: (event: MouseEvent) => void;
}

const ToolbarButton: FC<ToolbarButtonProps> = ({
  icon: Icon,
  tooltip,
  label,
  active = false,
  activeColor,
  disableFocusAfterClick = false,
  disabled,
  variant,
  onClick,
}) => {
  const editor = useMdPlateEditorState();

  const handleOnClick = useCallback(
    (event: MouseEvent) => {
      event.preventDefault();

      if (!editor) {
        return;
      }

      onClick(event);

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

  if (variant === 'menu') {
    return (
      <MenuItemButton key="menu-item" onClick={handleOnClick} startIcon={Icon}>
        {label ?? tooltip}
      </MenuItemButton>
    );
  }

  return (
    <Button
      key="button"
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
      {<Icon className="w-5 h-5" />}
    </Button>
  );
};

export default ToolbarButton;
