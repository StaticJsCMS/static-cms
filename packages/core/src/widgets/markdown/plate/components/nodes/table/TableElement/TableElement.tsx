import Box from '@mui/system/Box';
import { useSelectedCells } from '@udecode/plate';
import React from 'react';

import type { MdTableElement, MdValue } from '@staticcms/markdown';
import type { PlateRenderElementProps } from '@udecode/plate';
import type { FC } from 'react';

const TableElement: FC<PlateRenderElementProps<MdValue, MdTableElement>> = ({
  attributes,
  children,
  nodeProps,
}) => {
  useSelectedCells();

  return (
    <Box
      component="table"
      {...attributes}
      {...nodeProps}
      sx={{ border: '1px solid rgba(209,213,219,0.75)', borderCollapse: 'collapse' }}
    >
      {children ? (
        <>
          <thead key="thead">{children[0]}</thead>
          <tbody key="tbody">{children.slice(1)}</tbody>
        </>
      ) : null}
    </Box>
  );
};

export default TableElement;
