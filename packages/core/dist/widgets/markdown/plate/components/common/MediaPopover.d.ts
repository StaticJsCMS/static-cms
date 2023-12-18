import type { Collection, FileOrImageField, MarkdownField, MediaPath } from '@staticcms/core/interface';
import './MediaPopover.css';
export interface MediaPopoverProps<T extends FileOrImageField | MarkdownField> {
    anchorEl: HTMLElement | null;
    url: string;
    text?: string;
    forImage?: boolean;
    collection: Collection<T>;
    field: T;
    onMediaToggle?: (open: boolean) => void;
    onMediaChange: (newValue: MediaPath<string>) => void;
    onRemove?: () => void;
    onFocus?: () => void;
    onBlur?: () => void;
}
declare const MediaPopover: <T extends FileOrImageField | MarkdownField>({ anchorEl, url, text, forImage, collection, field, onMediaToggle, onMediaChange, onRemove, onFocus, onBlur, }: MediaPopoverProps<T>) => JSX.Element;
export default MediaPopover;
