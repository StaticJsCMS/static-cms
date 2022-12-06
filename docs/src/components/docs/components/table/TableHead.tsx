import MuiTableHead from '@mui/material/TableHead';

import type { ReactNode } from 'react';

interface TableHeadProps {
  children?: ReactNode;
}

const TableHead = ({ children }: TableHeadProps) => {
  return <MuiTableHead>{children}</MuiTableHead>;
};

export default TableHead;
