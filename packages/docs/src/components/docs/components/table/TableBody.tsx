import MuiTableBody from '@mui/material/TableBody';

import type { ReactNode } from 'react';

interface TableBodyProps {
  children?: ReactNode;
}

const TableBody = ({ children }: TableBodyProps) => {
  return <MuiTableBody>{children}</MuiTableBody>;
};

export default TableBody;
