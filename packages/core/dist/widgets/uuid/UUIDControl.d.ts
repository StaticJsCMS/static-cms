import type { UUIDField, WidgetControlProps } from '@staticcms/core/interface';
import type { FC } from 'react';
import './UUIDControl.css';
export declare const classes: Record<"input" | "root" | "error" | "disabled" | "required" | "for-single-list" | "refresh-button" | "refresh-button-icon", string>;
declare const UUIDControl: FC<WidgetControlProps<string, UUIDField>>;
export default UUIDControl;
