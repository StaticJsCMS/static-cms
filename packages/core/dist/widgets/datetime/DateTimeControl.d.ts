import type { DateTimeField, WidgetControlProps } from '@staticcms/core/interface';
import type { FC } from 'react';
import './DateTimeControl.css';
export declare const classes: Record<"root" | "error" | "disabled" | "required" | "time-input" | "wrapper" | "for-single-list" | "date-input" | "datetime-input", string>;
declare const DateTimeControl: FC<WidgetControlProps<string | Date, DateTimeField>>;
export default DateTimeControl;
