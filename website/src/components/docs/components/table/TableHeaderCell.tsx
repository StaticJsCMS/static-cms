import TableCell from '@mui/material/TableCell';

import type { ReactNode } from 'react';

interface TableHeaderCellProps {
  children?: ReactNode;
}

const TableHeaderCell = ({ children }: TableHeaderCellProps) => {
  return (
    <TableCell
      sx={{
        fontWeight: 600,
        padding: '16px 12px',
        '&:first-of-type, &:first-of-type': {
          paddingLeft: 0,
        },
        '&:last-of-type, &:last-of-type': {
          paddingRight: 0,
        },
      }}
    >
      {children}
    </TableCell>
  );
};

export default TableHeaderCell;
