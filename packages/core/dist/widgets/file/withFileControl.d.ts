import React from 'react';
import type { FileOrImageField, WidgetControlProps } from '@staticcms/core/interface';
import './FileImageControl.css';
export declare function getValidFileValue(value: string | string[] | null | undefined): string | string[] | null | undefined;
export interface FileControlState {
    keys: string[];
    internalRawValue: string | string[];
}
export interface WithFileControlProps {
    forImage?: boolean;
}
declare const withFileControl: ({ forImage }?: WithFileControlProps) => React.FC<WidgetControlProps<string | string[], FileOrImageField, import("@staticcms/core/interface").ObjectValue>>;
export default withFileControl;
