import Typography from '@mui/material/Typography';
import React from 'react';

import { colors } from './styles';

import type { MouseEventHandler } from 'react';

const stateColors = {
  default: {
    text: colors.controlLabel,
  },
  error: {
    text: colors.errorText,
  },
};

export interface StyledLabelProps {
  hasErrors: boolean;
}

function getStateColors({ hasErrors }: StyledLabelProps) {
  if (hasErrors) {
    return stateColors.error;
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

const FieldLabel = ({ children, htmlFor, onClick, hasErrors = false }: FieldLabelProps) => {
  return (
    <Typography
      key="field-label"
      variant="body2"
      component="label"
      htmlFor={htmlFor}
      onClick={onClick}
      sx={{
        color: getStateColors({ hasErrors }).text,
        marginLeft: '4px',
      }}
    >
      {children}
    </Typography>
  );
};

export default FieldLabel;
