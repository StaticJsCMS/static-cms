import type { ReactNode } from 'react';
import './Card.css';
interface CardProps {
    children: ReactNode | ReactNode[];
    className?: string;
    title?: string;
}
declare const Card: ({ children, className, title }: CardProps) => JSX.Element;
export default Card;
