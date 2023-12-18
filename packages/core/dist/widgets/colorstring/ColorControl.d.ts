import type { ColorField, WidgetControlProps } from '@staticcms/core/interface';
import type { FC } from 'react';
import './ColorControl.css';
export declare const classes: Record<"content" | "input" | "root" | "error" | "disabled" | "required" | "for-single-list" | "allow-input" | "color-swatch-wrapper" | "color-swatch" | "color-picker-wrapper" | "color-picker-backdrop" | "color-picker" | "clear-button" | "clear-button-icon", string>;
declare const ColorControl: FC<WidgetControlProps<string, ColorField>>;
export default ColorControl;
