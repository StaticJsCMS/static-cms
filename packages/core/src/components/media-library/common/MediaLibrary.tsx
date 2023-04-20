import { ArrowUpward as UpwardIcon } from '@styled-icons/material/ArrowUpward';
import { CreateNewFolder as NewFolderIcon } from '@styled-icons/material/CreateNewFolder';
import { FolderOpen as FolderOpenIcon } from '@styled-icons/material/FolderOpen';
import { Home as HomeIcon } from '@styled-icons/material/Home';
import { Photo as PhotoIcon } from '@styled-icons/material/Photo';
import fuzzy from 'fuzzy';
import isEmpty from 'lodash/isEmpty';
import { dirname, join } from 'path';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { translate } from 'react-polyglot';

import {
  closeMediaLibrary,
  deleteMedia,
  insertMedia,
  loadMedia,
  loadMediaDisplayURL,
  persistMedia,
} from '@staticcms/core/actions/mediaLibrary';
import useFolderSupport from '@staticcms/core/lib/hooks/useFolderSupport';
import useMediaFiles from '@staticcms/core/lib/hooks/useMediaFiles';
import { fileExtension } from '@staticcms/core/lib/util';
import classNames from '@staticcms/core/lib/util/classNames.util';
import MediaLibraryCloseEvent from '@staticcms/core/lib/util/events/MediaLibraryCloseEvent';
import { selectMediaFilePath, selectMediaFolder } from '@staticcms/core/lib/util/media.util';
import { selectConfig } from '@staticcms/core/reducers/selectors/config';
import { selectEditingDraft } from '@staticcms/core/reducers/selectors/entryDraft';
import { selectMediaLibraryState } from '@staticcms/core/reducers/selectors/mediaLibrary';
import { useAppDispatch, useAppSelector } from '@staticcms/core/store/hooks';
import alert from '../../common/alert/Alert';
import Button from '../../common/button/Button';
import IconButton from '../../common/button/IconButton';
import confirm from '../../common/confirm/Confirm';
import CurrentMediaDetails from './CurrentMediaDetails';
import EmptyMessage from './EmptyMessage';
import FileUploadButton from './FileUploadButton';
import FolderCreationDialog from './FolderCreationDialog';
import MediaLibraryCardGrid from './MediaLibraryCardGrid';
import MediaLibrarySearch from './MediaLibrarySearch';

import type { MediaFile, TranslatedProps } from '@staticcms/core/interface';
import type { ChangeEvent, FC, KeyboardEvent } from 'react';

/**
 * Extensions used to determine which files to show when the media library is
 * accessed from an image insertion field.
 */
const IMAGE_EXTENSIONS_VIEWABLE = [
  'jpg',
  'jpeg',
  'webp',
  'gif',
  'png',
  'bmp',
  'tiff',
  'svg',
  'avif',
];
const IMAGE_EXTENSIONS = [...IMAGE_EXTENSIONS_VIEWABLE];

interface MediaLibraryProps {
  canInsert?: boolean;
  isDialog?: boolean;
}

const MediaLibrary: FC<TranslatedProps<MediaLibraryProps>> = ({
  canInsert = false,
  isDialog = false,
  t,
}) => {
  const [currentFolder, setCurrentFolder] = useState<string | undefined>(undefined);
  const [selectedFile, setSelectedFile] = useState<MediaFile | null>(null);
  const [query, setQuery] = useState<string | undefined>(undefined);

  const config = useAppSelector(selectConfig);

  const dispatch = useAppDispatch();
  const {
    isVisible,
    displayURLs,
    dynamicSearch,
    dynamicSearchActive,
    forImage = false,
    forFolder = false,
    isLoading,
    hasNextPage,
    isPaginating,
    config: mediaConfig = config?.media_library ?? {},
    dynamicSearchQuery,
    page,
    collection,
    collectionFile,
    field,
    value: initialValue,
    alt: initialAlt,
    insertOptions,
  } = useAppSelector(selectMediaLibraryState);

  const entry = useAppSelector(selectEditingDraft);

  const [url, setUrl] = useState<string | string[] | undefined>(initialValue ?? '');

  const [alt, setAlt] = useState<string | undefined>(initialAlt);

  const [prevIsVisible, setPrevIsVisible] = useState(false);

  useEffect(() => {
    if (!prevIsVisible && isVisible) {
      setSelectedFile(null);
      setQuery('');
      setCurrentFolder(undefined);
      dispatch(loadMedia());
    } else if (prevIsVisible && !isVisible) {
      window.dispatchEvent(new MediaLibraryCloseEvent());
    }

    setPrevIsVisible(isVisible);
  }, [isVisible, dispatch, prevIsVisible]);

  const files = useMediaFiles(field, currentFolder);

  const loadDisplayURL = useCallback(
    (file: MediaFile) => {
      dispatch(loadMediaDisplayURL(file));
    },
    [dispatch],
  );

  /**
   * Filter an array of file data to include only images.
   */
  const filterImages = useCallback((files: MediaFile[]) => {
    return files.filter(file => {
      const ext = fileExtension(file.name).toLowerCase();
      return IMAGE_EXTENSIONS.includes(ext) || file.isDirectory;
    });
  }, []);

  /**
   * Transform file data for table display.
   */
  const toTableData = useCallback((files: MediaFile[]) => {
    const tableData =
      files &&
      files.map(({ key, name, id, size, path, queryOrder, displayURL, draft, isDirectory }) => {
        const ext = fileExtension(name).toLowerCase();
        return {
          key,
          id,
          name,
          path,
          type: ext.toUpperCase(),
          size,
          queryOrder,
          displayURL,
          draft,
          isImage: IMAGE_EXTENSIONS.includes(ext),
          isViewableImage: IMAGE_EXTENSIONS_VIEWABLE.includes(ext),
          isDirectory,
        };
      });

    /**
     * Get the sort order for use with `lodash.orderBy`, and always add the
     * `queryOrder` sort as the lowest priority sort order.
     */
    // TODO Sorting?
    // const fieldNames = map(sortFields, 'fieldName').concat('queryOrder');
    // const directions = map(sortFields, 'direction').concat('asc');
    // return orderBy(tableData, fieldNames, directions);
    return tableData;
  }, []);

  const handleClose = useCallback(() => {
    dispatch(closeMediaLibrary());
    setTimeout(() => {
      setUrl(undefined);
      setAlt(undefined);
    }, 500);
  }, [dispatch]);

  /**
   * Toggle asset selection on click.
   */
  const handleAssetSelect = useCallback(
    (asset: MediaFile) => {
      if (
        !canInsert ||
        selectedFile?.key === asset.key ||
        (!forFolder && asset.isDirectory) ||
        (forFolder && !asset.isDirectory)
      ) {
        return;
      }

      setSelectedFile(asset);
    },
    [canInsert, forFolder, selectedFile?.key],
  );

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const scrollToTop = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  };

  /**
   * Upload a file.
   */
  const handlePersist = useCallback(
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
      const file = files[0];
      const maxFileSize =
        typeof mediaConfig.max_file_size === 'number' ? mediaConfig.max_file_size : 512000;

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
        await dispatch(persistMedia(file, { field }, currentFolder));

        setSelectedFile(files[0] as unknown as MediaFile);

        scrollToTop();
      }

      if (!('dataTransfer' in event)) {
        event.target.value = '';
      }
    },
    [mediaConfig.max_file_size, field, dispatch, currentFolder],
  );

  const handleURLChange = useCallback(
    (url: string) => {
      setUrl(url);
      dispatch(insertMedia(url, field, alt, currentFolder));
    },
    [alt, dispatch, field, currentFolder],
  );

  const handleAltChange = useCallback(
    (alt: string) => {
      if (!url && !selectedFile?.path) {
        return;
      }

      setAlt(alt);
      dispatch(insertMedia((url ?? selectedFile?.path) as string, field, alt, currentFolder));
    },
    [dispatch, field, selectedFile?.path, url, currentFolder],
  );

  const handleOpenDirectory = useCallback(
    (dir: string) => {
      if (!config) {
        return;
      }

      const newDirectory = selectMediaFilePath(
        config,
        collection,
        entry,
        dir,
        field,
        currentFolder,
      );
      setSelectedFile(null);
      setQuery('');
      setCurrentFolder(newDirectory);
      dispatch(loadMedia({ currentFolder: newDirectory }));
    },
    [dispatch, currentFolder, collection, config, entry, field],
  );

  const mediaFolder = useMemo(() => {
    if (!config) {
      return undefined;
    }
    return selectMediaFolder(config, collection, entry, field);
  }, [collection, config, entry, field]);

  const parentFolder = useMemo(() => {
    if (!config || !currentFolder) {
      return undefined;
    }

    return dirname(currentFolder);
  }, [config, currentFolder]);

  const goToFolder = useCallback(
    (folder: string | undefined) => {
      setSelectedFile(null);
      setQuery('');
      setCurrentFolder(folder);
      dispatch(loadMedia({ currentFolder: folder }));
    },
    [dispatch],
  );

  const handleHome = useCallback(() => {
    goToFolder(undefined);
  }, [goToFolder]);

  const handleGoBack = useCallback(() => {
    if (!mediaFolder) {
      return;
    }

    goToFolder(
      parentFolder?.includes(mediaFolder) && parentFolder !== mediaFolder
        ? parentFolder
        : undefined,
    );
  }, [goToFolder, mediaFolder, parentFolder]);

  const [folderCreationOpen, setFolderCreationOpen] = useState(false);
  const handleCreateFolder = useCallback(() => {
    setFolderCreationOpen(true);
  }, []);

  const handleFolderCreationDialogClose = useCallback(() => {
    setFolderCreationOpen(false);
  }, []);

  const handleFolderCreate = useCallback(
    async (folderName: string) => {
      const folder = currentFolder ?? mediaFolder;
      if (!folder) {
        return;
      }

      setFolderCreationOpen(false);
      const file = new File([''], '.gitkeep', { type: 'text/plain' });
      await dispatch(
        persistMedia(file, { field }, join(folder, folderName), currentFolder ?? mediaFolder),
      );
    },
    [currentFolder, dispatch, field, mediaFolder],
  );

  /**
   * Stores the public path of the file in the application store, where the
   * editor field that launched the media library can retrieve it.
   */
  const handleInsert = useCallback(() => {
    if (!selectedFile?.path) {
      return;
    }

    const { path } = selectedFile;
    setUrl(path);
    dispatch(insertMedia(path, field, alt, currentFolder));

    if (!insertOptions?.chooseUrl && !insertOptions?.showAlt) {
      handleClose();
    }
  }, [selectedFile, dispatch, field, alt, insertOptions, handleClose, currentFolder]);

  /**
   * Removes the selected file from the backend.
   */
  const handleDelete = useCallback(
    async (fileToDelete: MediaFile) => {
      if (
        !(await confirm({
          title: 'mediaLibrary.mediaLibrary.onDeleteTitle',
          body: 'mediaLibrary.mediaLibrary.onDeleteBody',
          color: 'error',
        }))
      ) {
        return;
      }
      const file = files.find(file => fileToDelete?.key === file.key);
      if (file) {
        dispatch(deleteMedia(file)).then(() => {
          setSelectedFile(null);
        });
      }
    },
    [dispatch, files],
  );

  const handleLoadMore = useCallback(() => {
    dispatch(loadMedia({ query: dynamicSearchQuery, page: (page ?? 0) + 1 }));
  }, [dynamicSearchQuery, dispatch, page]);

  /**
   * Executes media library search for implementations that support dynamic
   * search via request. For these implementations, the Enter key must be
   * pressed to execute search. If assets are being stored directly through
   * the GitHub backend, search is in-memory and occurs as the query is typed,
   * so this handler has no impact.
   */
  const handleSearchKeyDown = useCallback(
    async (event: KeyboardEvent) => {
      if (event.key === 'Enter' && dynamicSearch) {
        await dispatch(loadMedia({ query }));
        scrollToTop();
      }
    },
    [dynamicSearch, dispatch, query],
  );

  /**
   * Updates query state as the user types in the search field.
   */
  const handleSearchChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  }, []);

  /**
   * Filters files that do not match the query. Not used for dynamic search.
   */
  const queryFilter = useCallback((query: string, files: MediaFile[]): MediaFile[] => {
    /**
     * Because file names don't have spaces, typing a space eliminates all
     * potential matches, so we strip them all out internally before running the
     * query.
     */
    const strippedQuery = query.replace(/ /g, '');
    const matches = fuzzy.filter(strippedQuery, files, { extract: file => file.name });
    return matches.map((match, queryIndex) => {
      const file = files[match.index];
      return { ...file, queryIndex };
    }) as MediaFile[];
  }, []);

  const filteredFiles = forImage ? filterImages(files) : files;
  const queriedFiles = !dynamicSearch && query ? queryFilter(query, filteredFiles) : filteredFiles;
  const tableData = toTableData(queriedFiles);
  const hasFiles = files && !!files.length;
  const hasFilteredFiles = filteredFiles && !!filteredFiles.length;
  const hasSearchResults = queriedFiles && !!queriedFiles.length;
  const hasMedia = hasSearchResults;
  const emptyMessage =
    (isLoading && !hasMedia && t('mediaLibrary.mediaLibraryModal.loading')) ||
    (dynamicSearchActive && t('mediaLibrary.mediaLibraryModal.noResults')) ||
    (!hasFiles && t('mediaLibrary.mediaLibraryModal.noAssetsFound')) ||
    (!hasFilteredFiles && t('mediaLibrary.mediaLibraryModal.noImagesFound')) ||
    (!hasSearchResults && t('mediaLibrary.mediaLibraryModal.noResults')) ||
    '';

  const hasSelection = hasMedia && !isEmpty(selectedFile);

  const folderSupport = useFolderSupport({ config, collection, collectionFile, field });

  return (
    <>
      <div className="flex flex-col w-full h-full">
        <CurrentMediaDetails
          collection={collection}
          field={field}
          canInsert={canInsert}
          url={url}
          alt={alt}
          insertOptions={insertOptions}
          onUrlChange={handleURLChange}
          onAltChange={handleAltChange}
        />
        <div
          className={classNames(
            `
              flex
              items-center
              px-5
              pt-4
            `,
            folderSupport &&
              `
                pb-4
                border-b
                border-gray-200/75
                dark:border-slate-500/75
              `,
          )}
        >
          <div className="flex flex-grow gap-3 mr-8">
            <h2
              className="
                text-xl
                font-semibold
                flex
                items-center
                gap-2
                text-gray-800
                dark:text-gray-300
              "
            >
              <div className="flex items-center">
                <PhotoIcon className="w-5 h-5" />
              </div>
              {t('app.header.media')}
            </h2>
            <MediaLibrarySearch
              value={query}
              onChange={handleSearchChange}
              onKeyDown={handleSearchKeyDown}
              placeholder={t('mediaLibrary.mediaLibraryModal.search')}
              disabled={!dynamicSearchActive && !hasFilteredFiles}
            />
            {folderSupport ? (
              <div className="flex gap-1.5 items-center">
                <IconButton
                  onClick={handleHome}
                  title={t('mediaLibrary.folderSupport.home')}
                  color="secondary"
                  disabled={!currentFolder}
                >
                  <HomeIcon className="h-5 w-5" />
                </IconButton>
                <IconButton
                  onClick={handleGoBack}
                  title={
                    parentFolder
                      ? t('mediaLibrary.folderSupport.upToFolder', { folder: parentFolder })
                      : t('mediaLibrary.folderSupport.up')
                  }
                  color="secondary"
                  disabled={!parentFolder}
                >
                  <UpwardIcon className="h-5 w-5" />
                </IconButton>
                <IconButton
                  onClick={handleCreateFolder}
                  title={t('mediaLibrary.folderSupport.newFolder')}
                  color="secondary"
                >
                  <NewFolderIcon className="h-5 w-5"></NewFolderIcon>
                </IconButton>
              </div>
            ) : null}
          </div>
          <div className="flex gap-3 items-center relative z-20">
            <FileUploadButton imagesOnly={forImage} onChange={handlePersist} />
            {canInsert ? (
              <Button
                key="choose-selected"
                color="success"
                variant="contained"
                onClick={handleInsert}
                disabled={!hasSelection}
                data-testid="choose-selected"
              >
                {t('mediaLibrary.mediaLibraryModal.chooseSelected')}
              </Button>
            ) : null}
          </div>
        </div>
        {folderSupport ? (
          <div
            className="
              flex
              gap-2
              items-center
              px-5
              py-4
              font-bold
              text-xl
            "
          >
            <FolderOpenIcon className="w-6 h-6" />
            {currentFolder ?? mediaFolder}
          </div>
        ) : null}
        {!hasMedia ? (
          <EmptyMessage content={emptyMessage} />
        ) : (
          <MediaLibraryCardGrid
            scrollContainerRef={scrollContainerRef}
            mediaItems={tableData}
            isSelectedFile={file => selectedFile?.key === file.key}
            onAssetSelect={handleAssetSelect}
            canLoadMore={hasNextPage}
            onLoadMore={handleLoadMore}
            onDirectoryOpen={handleOpenDirectory}
            currentFolder={currentFolder}
            isPaginating={isPaginating}
            paginatingMessage={t('mediaLibrary.mediaLibraryModal.loading')}
            cardDraftText={t('mediaLibrary.mediaLibraryCard.draft')}
            loadDisplayURL={loadDisplayURL}
            displayURLs={displayURLs}
            collection={collection}
            field={field}
            isDialog={isDialog}
            onDelete={handleDelete}
          />
        )}
      </div>
      <FolderCreationDialog
        open={folderCreationOpen}
        onClose={handleFolderCreationDialogClose}
        onCreate={handleFolderCreate}
        t={t}
      />
    </>
  );
};

export default translate()(MediaLibrary) as FC<MediaLibraryProps>;
