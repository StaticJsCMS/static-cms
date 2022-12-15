import MuiTableRow from '@mui/material/TableRow';

import type { ReactNode } from 'react';

interface TableRowProps {
  children?: ReactNode;
}

const TableRow = ({ children }: TableRowProps) => {
  return (
    <MuiTableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>{children}</MuiTableRow>
  );
};

export default TableRow;
