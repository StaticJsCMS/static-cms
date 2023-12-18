import type { ChangeEventHandler, KeyboardEventHandler } from 'react';
export interface MediaLibrarySearchProps {
    value?: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
    onKeyDown: KeyboardEventHandler<HTMLInputElement>;
    placeholder: string;
    disabled?: boolean;
}
declare const MediaLibrarySearch: ({ value, onChange, onKeyDown, placeholder, disabled, }: MediaLibrarySearchProps) => JSX.Element;
export default MediaLibrarySearch;
