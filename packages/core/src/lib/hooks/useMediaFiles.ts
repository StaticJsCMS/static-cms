import { useEffect, useMemo, useState } from 'react';
import { dirname } from 'path';
import trim from 'lodash/trim';

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
    if (!currentFolder || !config || !entry) {
      setCurrentFolderMediaFiles(null);
      return;
    }

    let alive = true;

    const getMediaFiles = async () => {
      const backend = currentBackend(config);
      const files = await backend.getMedia(
        currentFolder,
        config.media_library_folder_support ?? false,
        config.public_folder
          ? trim(currentFolder, '/').replace(trim(config.media_folder!), config.public_folder)
          : currentFolder,
      );

      if (alive) {
        setCurrentFolderMediaFiles(files);
      }
    };

    getMediaFiles();

    return () => {
      alive = false;
    };
  }, [currentFolder, config, entry]);

  return useMemo(() => {
    if (entry) {
      const entryFiles = entry.mediaFiles ?? [];
      if (config) {
        const mediaFolder = selectMediaFolder(config, collection, entry, field, currentFolder);
        const entryFolderFiles = entryFiles
          .filter(f => {
            return dirname(f.path) === mediaFolder;
          })
          .map(file => ({ key: file.id, ...file }));
        if (currentFolderMediaFiles) {
          if (entryFiles.length > 0) {
            const draftFiles = entryFolderFiles.filter(file => file.draft == true);
            currentFolderMediaFiles.unshift(...draftFiles);
          }
          return currentFolderMediaFiles.map(file => ({ key: file.id, ...file }));
        }
        return entryFolderFiles;
      }
    }

    return mediaLibraryFiles ?? [];
  }, [collection, config, currentFolderMediaFiles, entry, field, mediaLibraryFiles, currentFolder]);
}
