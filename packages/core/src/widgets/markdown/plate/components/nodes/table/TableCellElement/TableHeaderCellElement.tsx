import Box from '@mui/material/Box';
import React from 'react';

import type { MdTableCellElement, MdValue } from '@staticcms/markdown';
import type { PlateRenderElementProps } from '@udecode/plate';
import type { FC } from 'react';

const TableHeaderCellElement: FC<PlateRenderElementProps<MdValue, MdTableCellElement>> = ({
  attributes,
  children,
  nodeProps,
}) => {
  return (
    <Box
      component="th"
      {...attributes}
      {...nodeProps}
      sx={{
        padding: '8px',
        background: 'rgb(244,245,247)',
        textAlign: 'left',
        '&:not(:last-of-type)': {
          borderRight: '1px solid rgba(209,213,219,0.5)',
        },
      }}
    >
      <div>{children}</div>
    </Box>
  );
};

export default TableHeaderCellElement;
