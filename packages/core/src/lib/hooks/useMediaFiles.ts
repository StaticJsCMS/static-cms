import { useEffect, useMemo, useState } from 'react';
import { dirname } from 'path';

import { selectMediaLibraryFiles } from '@staticcms/core/reducers/selectors/mediaLibrary';
import { selectEditingDraft } from '@staticcms/core/reducers/selectors/entryDraft';
import { useAppSelector } from '@staticcms/core/store/hooks';
import { selectCollection } from '@staticcms/core/reducers/selectors/collections';
import { selectConfig } from '@staticcms/core/reducers/selectors/config';
import { selectMediaFolder } from '../util/media.util';
import { currentBackend } from '@staticcms/core/backend';

import type { MediaField, MediaFile } from '@staticcms/core/interface';

export default function useMediaFiles(field?: MediaField, currentFolder?: string): MediaFile[] {
  const [currentFolderMediaFiles, setCurrentFolderMediaFiles] = useState<MediaFile[] | null>(null);
  const mediaLibraryFiles = useAppSelector(selectMediaLibraryFiles);
  const entry = useAppSelector(selectEditingDraft);
  const config = useAppSelector(selectConfig);

  const collectionSelector = useMemo(
    () => selectCollection(entry?.collection),
    [entry?.collection],
  );
  const collection = useAppSelector(collectionSelector);

  useEffect(() => {
    if (!currentFolder || !config) {
      setCurrentFolderMediaFiles(null);
      return;
    }

    let alive = true;

    const getMediaFiles = async () => {
      const backend = currentBackend(config);
      const files = await backend.getMedia(currentFolder);

      if (alive) {
        setCurrentFolderMediaFiles(files);
      }
    };

    getMediaFiles();

    return () => {
      alive = false;
    };
  }, [currentFolder, config]);

  return useMemo(() => {
    if (currentFolderMediaFiles) {
      return currentFolderMediaFiles;
    }

    if (entry) {
      const entryFiles = entry.mediaFiles ?? [];
      if (config) {
        const mediaFolder = selectMediaFolder(config, collection, entry, field);
        return entryFiles
          .filter(f => dirname(f.path) === mediaFolder)
          .map(file => ({ key: file.id, ...file }));
      }
    }

    return mediaLibraryFiles ?? [];
  }, [collection, config, currentFolderMediaFiles, entry, field, mediaLibraryFiles]);
}
