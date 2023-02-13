import Typography from '@mui/material/Typography';
import React from 'react';

import type { MouseEventHandler } from 'react';

export interface StyledLabelProps {
  hasErrors: boolean;
}

function getStateColors({ hasErrors }: StyledLabelProps) {
  if (hasErrors) {
    return 'red';
  }

  return 'green';
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
        color: getStateColors({ hasErrors }),
        marginLeft: '4px',
      }}
    >
      {children}
    </Typography>
  );
};

export default FieldLabel;
