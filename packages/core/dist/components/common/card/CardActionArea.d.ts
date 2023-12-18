import type { ReactNode } from 'react';
interface CardActionAreaProps {
    to: string;
    children: ReactNode;
}
declare const CardActionArea: ({ to, children }: CardActionAreaProps) => JSX.Element;
export default CardActionArea;
