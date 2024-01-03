import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { Check as CheckIcon } from '@styled-icons/material/Check';
import React, { useCallback } from 'react';

import classNames from '@staticcms/core/lib/util/classNames.util';
import { generateClassNames } from '@staticcms/core/lib/util/theming.util';

import type { FC } from 'react';

const classes = generateClassNames('WidgetMarkdown_ColorButton', [
  'root',
  'avatar',
  'is-bright-color',
  'check-icon',
]);

export type ColorButtonProps = {
  name: string;
  value: string;
  isBrightColor: boolean;
  isSelected: boolean;
  updateColor: (color: string) => void;
};

const ColorButton: FC<ColorButtonProps> = ({
  name,
  value,
  isBrightColor,
  isSelected,
  updateColor,
}) => {
  const handleOnClick = useCallback(() => {
    updateColor(value);
  }, [updateColor, value]);

  return (
    <Tooltip title={name} disableInteractive>
      <IconButton
        onClick={handleOnClick}
        sx={{ p: 0 }}
        className={classNames(classes.root, isBrightColor && classes['is-bright-color'])}
        aria-label={value}
      >
        <Avatar
          alt={name}
          className={classes.avatar}
          sx={{
            background: value,
          }}
        >
          {isSelected ? <CheckIcon className={classes['check-icon']} /> : <>&nbsp;</>}
        </Avatar>
      </IconButton>
    </Tooltip>
  );
};

export default ColorButton;
