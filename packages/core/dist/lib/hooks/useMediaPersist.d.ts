import type { MediaField, MediaLibraryConfig } from '@staticcms/core/interface';
import type { AssetProxy } from '@staticcms/core/valueObjects';
import type { ChangeEvent, DragEvent } from 'react';
export interface UseMediaPersistProps {
    mediaConfig?: MediaLibraryConfig;
    field?: MediaField;
    currentFolder?: string;
    callback?: (files: File[], assetProxies: (AssetProxy | null)[]) => void;
}
export default function useMediaPersist({ mediaConfig, field, currentFolder, callback, }: UseMediaPersistProps): (event: ChangeEvent<HTMLInputElement> | DragEvent) => Promise<void>;
