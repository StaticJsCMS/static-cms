import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import { focusEditor } from '@udecode/plate';
import React, { useCallback } from 'react';

import { useMdPlateEditorState } from '@staticcms/markdown';

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
  const theme = useTheme();

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
    <Tooltip title={tooltip} disableInteractive>
      <Button
        aria-label={label ?? tooltip}
        size="small"
        color="inherit"
        sx={{
          padding: '2px',
          minWidth: 'unset',
          borderRadius: '4px',
          height: '26px',
          width: '26px',
          color: active ? activeColor ?? theme.palette.primary.main : theme.palette.text.secondary,

          '& svg': {
            height: '24px',
            width: '24px',
          },
        }}
        onClick={handleOnClick}
      >
        {icon}
      </Button>
    </Tooltip>
  );
};

export default ToolbarButton;
