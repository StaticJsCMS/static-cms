import PhotoIcon from '@heroicons/react/24/outline/PhotoIcon';
import fuzzy from 'fuzzy';
import isEmpty from 'lodash/isEmpty';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { translate } from 'react-polyglot';

import { changeViewStyle } from '@staticcms/core/actions/entries';
import {
  closeMediaLibrary,
  deleteMedia,
  insertMedia,
  loadMedia,
  loadMediaDisplayURL,
  persistMedia,
} from '@staticcms/core/actions/mediaLibrary';
import useMediaFiles from '@staticcms/core/lib/hooks/useMediaFiles';
import { fileExtension } from '@staticcms/core/lib/util';
import MediaLibraryCloseEvent from '@staticcms/core/lib/util/events/MediaLibraryCloseEvent';
import { selectViewStyle } from '@staticcms/core/reducers/selectors/entries';
import { selectMediaLibraryState } from '@staticcms/core/reducers/selectors/mediaLibrary';
import { useAppDispatch, useAppSelector } from '@staticcms/core/store/hooks';
import alert from '../../common/alert/Alert';
import Button from '../../common/button/Button';
import confirm from '../../common/confirm/Confirm';
import ViewStyleControl from '../../common/view-style/ViewStyleControl';
import EmptyMessage from './EmptyMessage';
import FileUploadButton from './FileUploadButton';
import MediaLibraryCardGrid from './MediaLibraryCardGrid';
import MediaLibrarySearch from './MediaLibrarySearch';

import type { ViewStyle } from '@staticcms/core/constants/views';
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
}

const MediaLibrary: FC<TranslatedProps<MediaLibraryProps>> = ({ canInsert = false, t }) => {
  const [selectedFile, setSelectedFile] = useState<MediaFile | null>(null);
  const [query, setQuery] = useState<string | undefined>(undefined);

  const [prevIsVisible, setPrevIsVisible] = useState(false);

  const dispatch = useAppDispatch();
  const viewStyle = useAppSelector(selectViewStyle);
  const {
    isVisible,
    displayURLs,
    dynamicSearch,
    dynamicSearchActive,
    forImage = false,
    isLoading,
    hasNextPage,
    isPaginating,
    config: mediaConfig,
    dynamicSearchQuery,
    page,
    collection,
    field,
  } = useAppSelector(selectMediaLibraryState);

  const files = useMediaFiles(field);

  const handleViewStyleChange = useCallback(
    (viewStyle: ViewStyle) => {
      dispatch(changeViewStyle(viewStyle));
    },
    [dispatch],
  );

  useEffect(() => {
    dispatch(loadMedia({}));
  }, [dispatch]);

  useEffect(() => {
    if (!prevIsVisible && isVisible) {
      setSelectedFile(null);
      setQuery('');
      dispatch(loadMedia());
    } else if (prevIsVisible && !isVisible) {
      window.dispatchEvent(new MediaLibraryCloseEvent());
    }

    setPrevIsVisible(isVisible);
  }, [isVisible, dispatch, prevIsVisible]);

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
      return IMAGE_EXTENSIONS.includes(ext);
    });
  }, []);

  /**
   * Transform file data for table display.
   */
  const toTableData = useCallback((files: MediaFile[]) => {
    const tableData =
      files &&
      files.map(({ key, name, id, size, path, queryOrder, displayURL, draft }) => {
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
  }, [dispatch]);

  /**
   * Toggle asset selection on click.
   */
  const handleAssetSelect = useCallback(
    (asset: MediaFile) => {
      if (!canInsert || selectedFile?.key === asset.key) {
        return;
      }

      setSelectedFile(asset);
    },
    [canInsert, selectedFile?.key],
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
        await dispatch(persistMedia(file, { field }));

        setSelectedFile(files[0] as unknown as MediaFile);

        scrollToTop();
      }

      if (!('dataTransfer' in event)) {
        event.target.value = '';
      }
    },
    [mediaConfig.max_file_size, field, dispatch],
  );

  /**
   * Stores the public path of the file in the application store, where the
   * editor field that launched the media library can retrieve it.
   */
  const handleInsert = useCallback(() => {
    if (!selectedFile) {
      return;
    }

    const { path } = selectedFile;
    dispatch(insertMedia(path, field));
    handleClose();
  }, [field, handleClose, dispatch, selectedFile]);

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

  console.log('hasMedia', hasMedia, 'files', files, 'tableData', tableData);

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex items-center px-5 pt-4">
        <div className="flex flex-grow gap-4 mr-8">
          <h2 className="text-xl font-semibold flex items-center text-gray-800 dark:text-gray-300">
            <span className="mr-2">
              <PhotoIcon className="w-6 h-6" />
            </span>
            {t('app.header.media')}
          </h2>
          <MediaLibrarySearch
            value={query}
            onChange={handleSearchChange}
            onKeyDown={handleSearchKeyDown}
            placeholder={t('mediaLibrary.mediaLibraryModal.search')}
            disabled={!dynamicSearchActive && !hasFilteredFiles}
          />
        </div>
        <div className="flex gap-3 items-center relative z-20">
          <ViewStyleControl viewStyle={viewStyle} onChangeViewStyle={handleViewStyleChange} />
          <FileUploadButton imagesOnly={forImage} onChange={handlePersist} />
          {canInsert ? (
            <Button
              key="choose-selected"
              color="success"
              variant="contained"
              onClick={handleInsert}
              disabled={!hasSelection}
            >
              {t('mediaLibrary.mediaLibraryModal.chooseSelected')}
            </Button>
          ) : null}
        </div>
      </div>
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
          isPaginating={isPaginating}
          paginatingMessage={t('mediaLibrary.mediaLibraryModal.loading')}
          cardDraftText={t('mediaLibrary.mediaLibraryCard.draft')}
          loadDisplayURL={loadDisplayURL}
          displayURLs={displayURLs}
          collection={collection}
          field={field}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default translate()(MediaLibrary) as FC<MediaLibraryProps>;
