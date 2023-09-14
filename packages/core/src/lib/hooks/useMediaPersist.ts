import { useCallback } from 'react';

import { persistMedia } from '@staticcms/core/actions/mediaLibrary';
import { useAppDispatch } from '@staticcms/core/store/hooks';
import alert from '../../components/common/alert/Alert';

import type { MediaField, MediaLibraryConfig } from '@staticcms/core/interface';
import type { AssetProxy } from '@staticcms/core/valueObjects';
import type { ChangeEvent, DragEvent } from 'react';

export interface UseMediaPersistProps {
  mediaConfig?: MediaLibraryConfig;
  field?: MediaField;
  currentFolder?: string;
  callback?: (files: File[], assetProxies: (AssetProxy | null)[]) => void;
}

export default function useMediaPersist({
  mediaConfig,
  field,
  currentFolder,
  callback,
}: UseMediaPersistProps) {
  const dispatch = useAppDispatch();

  return useCallback(
    async (event: ChangeEvent<HTMLInputElement> | DragEvent) => {
      /**
       * Stop the browser from automatically handling the file input click, and
       * get the file for upload, and retain the synthetic event for access after
       * the asynchronous persist operation.
       */

      let fileList: FileList | null;
      if ('dataTransfer' in event) {
        fileList = event.dataTransfer?.files ?? null;
      } else {
        event.persist();
        fileList = event.target.files;
      }

      if (!fileList) {
        return;
      }

      event.stopPropagation();
      event.preventDefault();
      const files = [...Array.from(fileList)];
      const maxFileSize =
        typeof mediaConfig?.max_file_size === 'number' ? mediaConfig.max_file_size : 512000;

      const assetProxies: (AssetProxy | null)[] = [];
      for (const file of files) {
        if (maxFileSize && file.size > maxFileSize) {
          alert({
            title: 'mediaLibrary.mediaLibrary.fileTooLargeTitle',
            body: {
              key: 'mediaLibrary.mediaLibrary.fileTooLargeBody',
              options: {
                size: Math.floor(maxFileSize / 1000),
              },
            },
          });
        } else {
          const assetProxy = await dispatch(persistMedia(file, { field }, currentFolder));
          assetProxies.push(assetProxy);
        }
      }

      if (assetProxies.length > 0) {
        callback?.(files, assetProxies);
      }

      if (!('dataTransfer' in event)) {
        event.target.value = '';
      }
    },
    [mediaConfig?.max_file_size, dispatch, field, currentFolder, callback],
  );
}
