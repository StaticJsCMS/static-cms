import XMarkIcon from '@heroicons/react/20/solid/XMarkIcon';
import isEmpty from 'lodash/isEmpty';
import React, { Fragment } from 'react';
import { translate } from 'react-polyglot';
import { Dialog, Transition } from '@headlessui/react';

import EmptyMessage from './EmptyMessage';
import MediaLibraryCardGrid from './MediaLibraryCardGrid';
import MediaLibraryTop from './MediaLibraryTop';
import IconButton from '../common/button/IconButton';

import type { Collection, Field, MediaFile, TranslatedProps } from '@staticcms/core/interface';
import type { MediaLibraryState } from '@staticcms/core/reducers/mediaLibrary';
import type { ChangeEvent, ChangeEventHandler, FC, KeyboardEventHandler } from 'react';

/**
 * TODO Responsive styling needs to be overhauled. Current setup requires specifying
 * widths per breakpoint.
 */
const cardWidth = `278px`;
const cardHeight = `240px`;
const cardMargin = `10px`;

interface MediaLibraryModalProps {
  isVisible?: boolean;
  canInsert?: boolean;
  files: MediaFile[];
  dynamicSearch?: boolean;
  dynamicSearchActive?: boolean;
  forImage?: boolean;
  isLoading?: boolean;
  isPersisting?: boolean;
  isDeleting?: boolean;
  hasNextPage?: boolean;
  isPaginating?: boolean;
  query?: string;
  selectedFile?: MediaFile;
  handleFilter: (files: MediaFile[]) => MediaFile[];
  handleQuery: (query: string, files: MediaFile[]) => MediaFile[];
  toTableData: (files: MediaFile[]) => MediaFile[];
  handleClose: () => void;
  handleSearchChange: ChangeEventHandler<HTMLInputElement>;
  handleSearchKeyDown: KeyboardEventHandler<HTMLInputElement>;
  handlePersist: (event: ChangeEvent<HTMLInputElement> | DragEvent) => void;
  handleDelete: () => void;
  handleInsert: () => void;
  handleDownload: () => void;
  scrollContainerRef: React.MutableRefObject<HTMLDivElement | null>;
  handleAssetClick: (asset: MediaFile) => void;
  handleLoadMore: () => void;
  loadDisplayURL: (file: MediaFile) => void;
  displayURLs: MediaLibraryState['displayURLs'];
  collection?: Collection;
  field?: Field;
}

const MediaLibraryModal = ({
  isVisible = false,
  canInsert,
  files,
  dynamicSearch,
  dynamicSearchActive,
  forImage,
  isLoading,
  isPersisting,
  isDeleting,
  hasNextPage,
  isPaginating,
  query,
  selectedFile,
  handleFilter,
  handleQuery,
  toTableData,
  handleClose,
  handleSearchChange,
  handleSearchKeyDown,
  handlePersist,
  handleDelete,
  handleInsert,
  handleDownload,
  scrollContainerRef,
  handleAssetClick,
  handleLoadMore,
  loadDisplayURL,
  displayURLs,
  collection,
  field,
  t,
}: TranslatedProps<MediaLibraryModalProps>) => {
  const filteredFiles = forImage ? handleFilter(files) : files;
  const queriedFiles = !dynamicSearch && query ? handleQuery(query, filteredFiles) : filteredFiles;
  const tableData = toTableData(queriedFiles);
  const hasFiles = files && !!files.length;
  const hasFilteredFiles = filteredFiles && !!filteredFiles.length;
  const hasSearchResults = queriedFiles && !!queriedFiles.length;
  const hasMedia = hasSearchResults;
  const shouldShowEmptyMessage = !hasMedia;
  const emptyMessage =
    (isLoading && !hasMedia && t('mediaLibrary.mediaLibraryModal.loading')) ||
    (dynamicSearchActive && t('mediaLibrary.mediaLibraryModal.noResults')) ||
    (!hasFiles && t('mediaLibrary.mediaLibraryModal.noAssetsFound')) ||
    (!hasFilteredFiles && t('mediaLibrary.mediaLibraryModal.noImagesFound')) ||
    (!hasSearchResults && t('mediaLibrary.mediaLibraryModal.noResults')) ||
    '';

  const hasSelection = hasMedia && !isEmpty(selectedFile);

  return (
    <Transition appear show={isVisible} as={Fragment}>
      <Dialog open={isVisible} onClose={handleClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25 z-30" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto z-40">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className="
                  w-full
                  max-w-3xl
                  transform
                  overflow-hidden
                  rounded-2xl
                  bg-white
                  p-6 text-left
                  align-middle
                  shadow-xl
                  transition-all
                "
              >
                <IconButton
                  className="absolute top-6 right-6"
                  variant="outlined"
                  aria-label="add"
                  onClick={handleClose}
                >
                  <XMarkIcon className="w-5 h-5" />
                </IconButton>
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                  {forImage
                    ? t('mediaLibrary.mediaLibraryModal.images')
                    : t('mediaLibrary.mediaLibraryModal.mediaAssets')}
                </Dialog.Title>
                <MediaLibraryTop
                  t={t}
                  onClose={handleClose}
                  forImage={forImage}
                  onDownload={handleDownload}
                  onUpload={handlePersist}
                  query={query}
                  onSearchChange={handleSearchChange}
                  onSearchKeyDown={handleSearchKeyDown}
                  searchDisabled={!dynamicSearchActive && !hasFilteredFiles}
                  onDelete={handleDelete}
                  canInsert={canInsert}
                  onInsert={handleInsert}
                  hasSelection={hasSelection}
                  isPersisting={isPersisting}
                  isDeleting={isDeleting}
                  selectedFile={selectedFile}
                />
                {!shouldShowEmptyMessage ? null : <EmptyMessage content={emptyMessage} />}
                <MediaLibraryCardGrid
                  scrollContainerRef={scrollContainerRef}
                  mediaItems={tableData}
                  isSelectedFile={file => selectedFile?.key === file.key}
                  onAssetClick={handleAssetClick}
                  canLoadMore={hasNextPage}
                  onLoadMore={handleLoadMore}
                  isPaginating={isPaginating}
                  paginatingMessage={t('mediaLibrary.mediaLibraryModal.loading')}
                  cardDraftText={t('mediaLibrary.mediaLibraryCard.draft')}
                  cardWidth={cardWidth}
                  cardHeight={cardHeight}
                  cardMargin={cardMargin}
                  loadDisplayURL={loadDisplayURL}
                  displayURLs={displayURLs}
                  collection={collection}
                  field={field}
                />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default translate()(MediaLibraryModal) as FC<MediaLibraryModalProps>;
