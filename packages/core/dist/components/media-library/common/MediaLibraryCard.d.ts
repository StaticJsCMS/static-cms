import React from 'react';
import type { BaseField, Collection, MediaField, MediaLibraryDisplayURL, UnknownField } from '@staticcms/core/interface';
import './MediaLibraryCard.css';
export declare const classes: Record<"text" | "image" | "details" | "file" | "root" | "folder" | "controls" | "action" | "outline" | "folder-icon" | "handle" | "controls-overlay" | "control-icon" | "download-button" | "delete-button" | "selection-overlay" | "draft-pill", string>;
interface MediaLibraryCardProps<T extends MediaField, EF extends BaseField = UnknownField> {
    isSelected?: boolean;
    displayURL: MediaLibraryDisplayURL;
    path: string;
    text: string;
    draftText: string;
    type?: string;
    isViewableImage: boolean;
    isDraft?: boolean;
    isDirectory?: boolean;
    collection?: Collection<EF>;
    field?: T;
    currentFolder?: string;
    hasSelection: boolean;
    allowMultiple: boolean;
    onSelect: (action: 'add' | 'remove' | 'replace') => void;
    onDirectoryOpen: () => void;
    loadDisplayURL: () => void;
    onDelete: () => void;
}
declare const _default: React.FC<MediaLibraryCardProps<MediaField, UnknownField>>;
export default _default;
