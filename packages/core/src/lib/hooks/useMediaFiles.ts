import { useMemo } from 'react';
import { dirname } from 'path';

import { selectMediaLibraryFiles } from '@staticcms/core/reducers/selectors/mediaLibrary';
import { selectEditingDraft } from '@staticcms/core/reducers/selectors/entryDraft';
import { useAppSelector } from '@staticcms/core/store/hooks';
import { selectCollection } from '@staticcms/core/reducers/selectors/collections';
import { selectConfig } from '@staticcms/core/reducers/selectors/config';
import { selectMediaFolder } from '../util/media.util';

import type { MediaField, MediaFile } from '@staticcms/core/interface';

export default function useMediaFiles(field?: MediaField): MediaFile[] {
  const mediaLibraryFiles = useAppSelector(selectMediaLibraryFiles);
  const entry = useAppSelector(selectEditingDraft);
  const config = useAppSelector(selectConfig);

  const collectionSelector = useMemo(
    () => selectCollection(entry?.collection),
    [entry?.collection],
  );
  const collection = useAppSelector(collectionSelector);

  return useMemo(() => {
    if (entry) {
      const entryFiles = entry.mediaFiles ?? [];
      if (config) {
        const mediaFolder = selectMediaFolder(config, collection, entry, field);
        console.log('[MEDIA LIBRARY] mediaFolder', mediaFolder);
        return entryFiles
          .filter(f => dirname(f.path) === mediaFolder)
          .map(file => ({ key: file.id, ...file }));
      }
    }

    return mediaLibraryFiles ?? [];
  }, [collection, config, entry, field, mediaLibraryFiles]);
}
