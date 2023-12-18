import type { ReactNode } from 'react';
interface TableCellProps {
    children: ReactNode;
    emphasis?: boolean;
    to?: string;
    shrink?: boolean;
}
declare const TableCell: ({ children, emphasis, to, shrink }: TableCellProps) => JSX.Element;
export default TableCell;
