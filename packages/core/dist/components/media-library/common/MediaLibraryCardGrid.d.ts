import React from 'react';
import type { Collection, CollectionFile, MediaField, MediaFile, MediaLibraryDisplayURL } from '@staticcms/core/interface';
import type { MediaLibraryState } from '@staticcms/core/reducers/mediaLibrary';
import type { FC } from 'react';
export interface MediaLibraryCardItem {
    displayURL?: MediaLibraryDisplayURL;
    id: string;
    key: string;
    name: string;
    type: string;
    draft: boolean;
    isViewableImage?: boolean;
    isDirectory?: boolean;
    url?: string;
}
export interface MediaLibraryCardGridProps {
    scrollContainerRef: React.MutableRefObject<HTMLDivElement | null>;
    mediaItems: MediaFile[];
    isSelectedFile: (file: MediaFile) => boolean;
    onAssetSelect: (asset: MediaFile, action: 'add' | 'remove' | 'replace') => void;
    canLoadMore?: boolean;
    onLoadMore: () => void;
    onDirectoryOpen: (dir: string) => void;
    currentFolder?: string;
    isPaginating?: boolean;
    paginatingMessage?: string;
    cardDraftText: string;
    loadDisplayURL: (asset: MediaFile) => void;
    displayURLs: MediaLibraryState['displayURLs'];
    collection?: Collection;
    collectionFile?: CollectionFile;
    field?: MediaField;
    isDialog: boolean;
    onDelete: (file: MediaFile) => void;
    hasSelection: boolean;
    allowMultiple: boolean;
}
export type CardGridItemData = MediaLibraryCardGridProps & {
    columnCount: number;
    gutter: number;
};
declare const MediaLibraryCardGrid: FC<MediaLibraryCardGridProps>;
export default MediaLibraryCardGrid;
