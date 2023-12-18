import type { FieldError } from '@staticcms/core/interface';
import type { FC } from 'react';
import './ErrorMessage.css';
export declare const classes: Record<"root", string>;
export interface ErrorMessageProps {
    errors: FieldError[];
    className?: string;
}
declare const ErrorMessage: FC<ErrorMessageProps>;
export default ErrorMessage;
