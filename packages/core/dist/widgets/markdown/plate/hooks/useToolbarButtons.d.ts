import type { Collection, MarkdownField, MarkdownToolbarButtonType, MarkdownToolbarItem } from '@staticcms/core/interface';
import type { ReactNode } from 'react';
import './useToolbarButtons.css';
export default function useToolbarButtons(toolbarButtons: MarkdownToolbarItem[], collection: Collection<MarkdownField>, field: MarkdownField, disabled: boolean): ReactNode[];
export declare function getToolbarButtons(toolbarButtons: MarkdownToolbarItem[] | MarkdownToolbarButtonType[], collection: Collection<MarkdownField>, field: MarkdownField, disabled: boolean): ReactNode[];
