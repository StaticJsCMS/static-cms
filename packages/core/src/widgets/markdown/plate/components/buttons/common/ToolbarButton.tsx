import { focusEditor } from '@udecode/plate';
import React, { useCallback } from 'react';

import Button from '@staticcms/core/components/common/button/Button';
import MenuItemButton from '@staticcms/core/components/common/menu/MenuItemButton';
import classNames from '@staticcms/core/lib/util/classNames.util';
import { generateClassNames } from '@staticcms/core/lib/util/theming.util';
import { useMdPlateEditorState } from '@staticcms/markdown/plate/plateTypes';

import type { CSSProperties, FC, MouseEvent } from 'react';

import './ToolbarButton.css';

const classes = generateClassNames('WidgetMarkdown_ToolbarButton', [
  'root',
  'active',
  'custom-active-color',
  'icon',
]);

export interface ToolbarButtonProps {
  id: string;
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
  id,
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
      color="secondary"
      variant="text"
      data-testid={`toolbar-button-${id}`}
      onClick={handleOnClick}
      className={classNames(
        classes.root,
        active && classes.active,
        activeColor && classes['custom-active-color'],
      )}
      style={style}
      disabled={disabled}
    >
      {<Icon className={classes.icon} />}
    </Button>
  );
};

export default ToolbarButton;
