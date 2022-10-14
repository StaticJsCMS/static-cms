import Typography from '@mui/material/Typography';
import React from 'react';

import { colors, colorsRaw } from './styles';

import type { MouseEventHandler } from 'react';

const stateColors = {
  default: {
    text: colors.controlLabel,
  },
  active: {
    text: '#1976d2',
  },
  error: {
    text: colorsRaw.white,
  },
};

export interface StyledLabelProps {
  hasErrors: boolean;
  isActive: boolean;
}

function getStateColors({ isActive, hasErrors }: StyledLabelProps) {
  if (hasErrors) {
    return stateColors.error;
  }

  if (isActive) {
    return stateColors.active;
  }

  return stateColors.default;
}

interface FieldLabelProps {
  children: string | string[];
  htmlFor?: string;
  hasErrors?: boolean;
  isActive?: boolean;
  onClick?: MouseEventHandler<HTMLLabelElement>;
}

const FieldLabel = ({
  children,
  htmlFor,
  onClick,
  hasErrors = false,
  isActive = false,
}: FieldLabelProps) => {
  return (
    <Typography
      variant="body2"
      component="label"
      htmlFor={htmlFor}
      onClick={onClick}
      sx={{
        color: getStateColors({ hasErrors, isActive }).text,
        marginLeft: '4px',
      }}
    >
      {children}
    </Typography>
  );
};

export default FieldLabel;
