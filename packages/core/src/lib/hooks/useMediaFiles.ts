import { basename, dirname } from 'path';
import { useEffect, useMemo, useState } from 'react';
import trim from 'lodash/trim';

import { currentBackend } from '@staticcms/core/backend';
import { selectCollection } from '@staticcms/core/reducers/selectors/collections';
import { selectConfig } from '@staticcms/core/reducers/selectors/config';
import { selectEditingDraft } from '@staticcms/core/reducers/selectors/entryDraft';
import { selectMediaLibraryFiles } from '@staticcms/core/reducers/selectors/mediaLibrary';
import { useAppSelector } from '@staticcms/core/store/hooks';
import { selectMediaFolder } from '../util/media.util';
import useFolderSupport from './useFolderSupport';
import { fileForEntry } from '../util/collection.util';

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
  const collectionFile = useMemo(
    () => fileForEntry(collection, entry?.slug),
    [collection, entry?.slug],
  );

  const folderSupport = useFolderSupport({ config, collection, collectionFile, field });

  useEffect(() => {
    if (!currentFolder || !config || !entry) {
      setCurrentFolderMediaFiles(null);
      return;
    }

    let alive = true;

    const getMediaFiles = async () => {
      const { media_folder, public_folder } = config ?? {};
      const backend = currentBackend(config);
      const files = await backend.getMedia(
        currentFolder,
        folderSupport,
        public_folder
          ? trim(currentFolder, '/').replace(trim(media_folder, '/'), public_folder)
          : currentFolder,
      );

      if (alive) {
        setCurrentFolderMediaFiles(files);
      }
    };

    getMediaFiles();
    setCurrentFolderMediaFiles([]);

    return () => {
      alive = false;
    };
  }, [currentFolder, config, entry, folderSupport]);

  const files = useMemo(() => {
    if (!entry || !config) {
      return mediaLibraryFiles ?? [];
    }

    const entryFiles = entry.mediaFiles ?? [];
    const mediaFolder = selectMediaFolder(config, collection, entry, field, currentFolder);
    const entryFolderFiles = entryFiles
      .filter(f => {
        if (f.name === '.gitkeep') {
          const folder = dirname(f.path);
          return dirname(folder) === mediaFolder;
        }

        return dirname(f.path) === mediaFolder;
      })
      .map(file => {
        if (file.name === '.gitkeep') {
          const folder = dirname(file.path);
          return {
            key: folder,
            id: folder,
            name: basename(folder),
            path: folder,
            isDirectory: true,
            draft: true,
          } as MediaFile;
        }
        return { key: file.id, ...file };
      });

    if (currentFolderMediaFiles) {
      const files = [...currentFolderMediaFiles];
      if (entryFiles.length > 0) {
        const draftFiles = entryFolderFiles.filter(
          file => file.draft == true && !files.find(f => f.id === file.id),
        );
        files.push(...draftFiles);
      }
      return files.map(file => ({ key: file.id, ...file }));
    }
    return entryFolderFiles;
  }, [collection, config, currentFolderMediaFiles, entry, field, mediaLibraryFiles, currentFolder]);

  return useMemo(
    () =>
      files
        .filter(file => file.name !== '.gitkeep' && (folderSupport || !file.isDirectory))
        .sort((a, b) => {
          const aIsDirectory = a.isDirectory ?? false;
          const bIsDirectory = b.isDirectory ?? false;
          if (aIsDirectory !== bIsDirectory) {
            if (aIsDirectory) {
              return -1;
            }

            return 1;
          }

          const aIsDraft = a.draft ?? false;
          const bIsDraft = b.draft ?? false;
          if (aIsDraft !== bIsDraft) {
            if (aIsDraft) {
              return -1;
            }

            return 1;
          }

          return a.name.localeCompare(b.name);
        }),
    [files, folderSupport],
  );
}
