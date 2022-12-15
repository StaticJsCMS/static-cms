import React from 'react';
import Box from '@mui/system/Box';

import type { PlateRenderElementProps } from '@udecode/plate';
import type { FC } from 'react';
import type { MdTableRowElement, MdValue } from '@staticcms/markdown';

const TableRowElement: FC<PlateRenderElementProps<MdValue, MdTableRowElement>> = ({
  attributes,
  children,
  nodeProps,
}) => {
  return (
    <Box
      component="tr"
      {...attributes}
      {...nodeProps}
      sx={{
        '&:only-of-type, &:not(:last-of-type)': {
          borderBottom: '1px solid rgba(209,213,219,0.5)',
        },
      }}
    >
      {children}
    </Box>
  );
};

export default TableRowElement;
