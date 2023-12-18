import type { ReactNode } from 'react';
interface TableRowProps {
    children: ReactNode;
    className?: string;
    to?: string;
}
declare const TableRow: ({ children, className, to }: TableRowProps) => JSX.Element;
export default TableRow;
