import fuzzy from 'fuzzy';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { translate } from 'react-polyglot';
import { connect } from 'react-redux';

import {
  closeMediaLibrary as closeMediaLibraryAction,
  deleteMedia as deleteMediaAction,
  insertMedia as insertMediaAction,
  loadMedia as loadMediaAction,
  loadMediaDisplayURL as loadMediaDisplayURLAction,
  persistMedia as persistMediaAction,
} from '../../actions/mediaLibrary';
import { fileExtension } from '../../lib/util';
import { selectMediaFiles } from '../../reducers/mediaLibrary';
import alert from '../UI/Alert';
import confirm from '../UI/Confirm';
import MediaLibraryModal from './MediaLibraryModal';

import type { ChangeEvent, KeyboardEvent } from 'react';
import type { ConnectedProps } from 'react-redux';
import type { MediaFile, TranslatedProps } from '../../interface';
import type { RootState } from '../../store';

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

const MediaLibrary = ({
  isVisible,
  loadMediaDisplayURL,
  displayURLs,
  canInsert,
  files = [],
  dynamicSearch,
  dynamicSearchActive,
  forImage,
  isLoading,
  isPersisting,
  isDeleting,
  hasNextPage,
  isPaginating,
  config,
  loadMedia,
  dynamicSearchQuery,
  page,
  persistMedia,
  deleteMedia,
  insertMedia,
  closeMediaLibrary,
  field,
  t,
}: TranslatedProps<MediaLibraryProps>) => {
  const [selectedFile, setSelectedFile] = useState<MediaFile | null>(null);
  const [query, setQuery] = useState<string | undefined>(undefined);

  const [prevIsVisible, setPrevIsVisible] = useState(false);

  useEffect(() => {
    loadMedia();
  }, [loadMedia]);

  useEffect(() => {
    if (!prevIsVisible && isVisible) {
      setSelectedFile(null);
      setQuery('');
    }

    setPrevIsVisible(isVisible);
  }, [isVisible, prevIsVisible]);

  useEffect(() => {
    if (!prevIsVisible && isVisible) {
      loadMedia();
    }
  }, [isVisible, loadMedia, prevIsVisible]);

  const loadDisplayURL = useCallback(
    (file: MediaFile) => {
      loadMediaDisplayURL(file);
    },
    [loadMediaDisplayURL],
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
    closeMediaLibrary();
  }, [closeMediaLibrary]);

  /**
   * Toggle asset selection on click.
   */
  const handleAssetClick = useCallback(
    (asset: MediaFile) => {
      if (selectedFile?.key !== asset.key) {
        setSelectedFile(asset);
      }
    },
    [selectedFile?.key],
  );

  const scrollContainerRef = useRef<HTMLDivElement>();
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
      const maxFileSize = typeof config.max_file_size === 'number' ? config.max_file_size : 512000;

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
        await persistMedia(file, { field });

        setSelectedFile(files[0] as unknown as MediaFile);

        scrollToTop();
      }

      if (!('dataTransfer' in event)) {
        event.target.value = '';
      }
    },
    [config.max_file_size, field, persistMedia],
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
    insertMedia(path, field);
    handleClose();
  }, [field, handleClose, insertMedia, selectedFile]);

  /**
   * Removes the selected file from the backend.
   */
  const handleDelete = useCallback(async () => {
    if (
      !(await confirm({
        title: 'mediaLibrary.mediaLibrary.onDeleteTitle',
        body: 'mediaLibrary.mediaLibrary.onDeleteBody',
        color: 'error',
      }))
    ) {
      return;
    }
    const file = files.find(file => selectedFile?.key === file.key);
    if (file) {
      deleteMedia(file).then(() => {
        setSelectedFile(null);
      });
    }
  }, [deleteMedia, files, selectedFile?.key]);

  /**
   * Downloads the selected file.
   */
  const handleDownload = useCallback(() => {
    if (!selectedFile) {
      return;
    }

    const url = displayURLs[selectedFile.id]?.url ?? selectedFile.url;
    if (!url) {
      return;
    }

    const filename = selectedFile.name;

    const element = document.createElement('a');
    element.setAttribute('href', url);
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
    setSelectedFile(null);
  }, [displayURLs, selectedFile]);

  const handleLoadMore = useCallback(() => {
    loadMedia({ query: dynamicSearchQuery, page: (page ?? 0) + 1 });
  }, [dynamicSearchQuery, loadMedia, page]);

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
        await loadMedia({ query });
        scrollToTop();
      }
    },
    [dynamicSearch, loadMedia, query],
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
  const queryFilter = useCallback((query: string, files: { name: string }[]) => {
    /**
     * Because file names don't have spaces, typing a space eliminates all
     * potential matches, so we strip them all out internally before running the
     * query.
     */
    const strippedQuery = query.replace(/ /g, '');
    const matches = fuzzy.filter(strippedQuery, files, { extract: file => file.name });
    const matchFiles = matches.map((match, queryIndex) => {
      const file = files[match.index];
      return { ...file, queryIndex };
    });
    return matchFiles;
  }, []);

  return (
    <MediaLibraryModal
      isVisible={isVisible}
      canInsert={canInsert}
      files={files}
      dynamicSearch={dynamicSearch}
      dynamicSearchActive={dynamicSearchActive}
      forImage={forImage}
      isLoading={isLoading}
      isPersisting={isPersisting}
      isDeleting={isDeleting}
      hasNextPage={hasNextPage}
      isPaginating={isPaginating}
      query={query}
      selectedFile={selectedFile}
      handleFilter={filterImages}
      handleQuery={queryFilter}
      toTableData={toTableData}
      handleClose={handleClose}
      handleSearchChange={handleSearchChange}
      handleSearchKeyDown={handleSearchKeyDown}
      handlePersist={handlePersist}
      handleDelete={handleDelete}
      handleInsert={handleInsert}
      handleDownload={handleDownload}
      setScrollContainerRef={scrollContainerRef}
      handleAssetClick={handleAssetClick}
      handleLoadMore={handleLoadMore}
      displayURLs={displayURLs}
      loadDisplayURL={loadDisplayURL}
      t={t}
    />
  );
};

function mapStateToProps(state: RootState) {
  const { mediaLibrary } = state;
  const field = mediaLibrary.field;
  const mediaLibraryProps = {
    isVisible: mediaLibrary.isVisible,
    canInsert: mediaLibrary.canInsert,
    files: selectMediaFiles(state, field),
    displayURLs: mediaLibrary.displayURLs,
    dynamicSearch: mediaLibrary.dynamicSearch,
    dynamicSearchActive: mediaLibrary.dynamicSearchActive,
    dynamicSearchQuery: mediaLibrary.dynamicSearchQuery,
    forImage: mediaLibrary.forImage,
    isLoading: mediaLibrary.isLoading,
    isPersisting: mediaLibrary.isPersisting,
    isDeleting: mediaLibrary.isDeleting,
    config: mediaLibrary.config,
    page: mediaLibrary.page,
    hasNextPage: mediaLibrary.hasNextPage,
    isPaginating: mediaLibrary.isPaginating,
    field,
  };
  return { ...mediaLibraryProps };
}

const mapDispatchToProps = {
  loadMedia: loadMediaAction,
  persistMedia: persistMediaAction,
  deleteMedia: deleteMediaAction,
  insertMedia: insertMediaAction,
  loadMediaDisplayURL: loadMediaDisplayURLAction,
  closeMediaLibrary: closeMediaLibraryAction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export type MediaLibraryProps = ConnectedProps<typeof connector>;

export default connector(translate()(MediaLibrary));
