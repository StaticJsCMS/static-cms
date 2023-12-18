import type { ReactNode } from 'react';
import './Table.css';
interface TableCellProps {
    columns: ReactNode[];
    children: ReactNode[];
}
declare const TableCell: ({ columns, children }: TableCellProps) => JSX.Element;
export default TableCell;
