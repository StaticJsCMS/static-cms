import { styled } from '@mui/material/styles';
import React from 'react';

import transientOptions from '@staticcms/core/lib/util/transientOptions';

interface StyledOutlineProps {
  $active: boolean;
  $hasError: boolean;
  $hasLabel: boolean;
}

const StyledOutline = styled(
  'div',
  transientOptions,
)<StyledOutlineProps>(
  ({ $active, $hasError, $hasLabel }) => `
    position: absolute;
    bottom: 0;
    right: 0;
    top: ${$hasLabel ? 22 : 0}px;
    left: 0;
    margin: 0;
    padding: 0 8px;
    pointer-events: none;
    border-radius: 4px;
    border-style: solid;
    border-width: 1px;
    overflow: hidden;
    min-width: 0%;
    border-color: rgba(0, 0, 0, 0.23);
    ${
      $active
        ? `
          border-color: #1976d2;
          border-width: 2px;
        `
        : ''
    }
    ${
      $hasError
        ? `
          border-color: #d32f2f;
          border-width: 2px;
        `
        : ''
    }
  `,
);

interface OutlineProps {
  active?: boolean;
  hasError?: boolean;
  hasLabel?: boolean;
}

const Outline = ({ active = false, hasError = false, hasLabel = false }: OutlineProps) => {
  return <StyledOutline $active={active} $hasError={hasError} $hasLabel={hasLabel} />;
};

export default Outline;
