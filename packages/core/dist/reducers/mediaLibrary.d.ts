import type { MediaLibraryAction } from '../actions/mediaLibrary';
import type { Collection, CollectionFile, MediaField, MediaFile, MediaLibrarInsertOptions, MediaLibraryConfig, MediaLibraryDisplayURL, MediaPath } from '../interface';
export type MediaLibraryState = {
    isVisible: boolean;
    showMediaButton: boolean;
    controlMedia: Record<string, MediaPath>;
    displayURLs: Record<string, MediaLibraryDisplayURL>;
    controlID?: string;
    page?: number;
    files?: MediaFile[];
    config?: MediaLibraryConfig;
    collection?: Collection;
    collectionFile?: CollectionFile;
    field?: MediaField;
    value?: string | string[];
    alt?: string;
    replaceIndex?: number;
    isLoading?: boolean;
    dynamicSearch?: boolean;
    dynamicSearchActive?: boolean;
    dynamicSearchQuery?: string;
    forImage?: boolean;
    forFolder?: boolean;
    isPersisting?: boolean;
    isDeleting?: boolean;
    hasNextPage?: boolean;
    isPaginating?: boolean;
    insertOptions?: MediaLibrarInsertOptions;
};
declare function mediaLibrary(state: MediaLibraryState | undefined, action: MediaLibraryAction): MediaLibraryState;
export default mediaLibrary;
