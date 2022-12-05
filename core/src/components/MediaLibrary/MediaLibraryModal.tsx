import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Fab from '@mui/material/Fab';
import { styled } from '@mui/material/styles';
import isEmpty from 'lodash/isEmpty';
import React from 'react';
import { translate } from 'react-polyglot';

import EmptyMessage from './EmptyMessage';
import MediaLibraryCardGrid from './MediaLibraryCardGrid';
import MediaLibraryTop from './MediaLibraryTop';

import type { ChangeEvent, ChangeEventHandler, KeyboardEventHandler } from 'react';
import type { MediaFile, TranslatedProps } from '@staticcms/core/interface';
import type { MediaLibraryState } from '@staticcms/core/reducers/mediaLibrary';

const StyledFab = styled(Fab)`
  position: absolute;
  top: -20px;
  left: -20px;
`;

/**
 * TODO Responsive styling needs to be overhauled. Current setup requires specifying
 * widths per breakpoint.
 */
const cardWidth = `280px`;
const cardHeight = `240px`;
const cardMargin = `10px`;

/**
 * cardWidth + cardMargin * 2 = cardOutsideWidth
 * (not using calc because this will be nested in other calcs)
 */
const cardOutsideWidth = `300px`;

const StyledModal = styled(Dialog)`
  .MuiDialog-paper {
    display: flex;
    flex-direction: column;
    overflow: visible;
    height: 80%;
    width: calc(${cardOutsideWidth} + 20px);
    max-width: calc(${cardOutsideWidth} + 20px);

    @media (min-width: 800px) {
      width: calc(${cardOutsideWidth} * 2 + 20px);
      max-width: calc(${cardOutsideWidth} * 2 + 20px);
    }

    @media (min-width: 1120px) {
      width: calc(${cardOutsideWidth} * 3 + 20px);
      max-width: calc(${cardOutsideWidth} * 3 + 20px);
    }

    @media (min-width: 1440px) {
      width: calc(${cardOutsideWidth} * 4 + 20px);
      max-width: calc(${cardOutsideWidth} * 4 + 20px);
    }

    @media (min-width: 1760px) {
      width: calc(${cardOutsideWidth} * 5 + 20px);
      max-width: calc(${cardOutsideWidth} * 5 + 20px);
    }

    @media (min-width: 2080px) {
      width: calc(${cardOutsideWidth} * 6 + 20px);
      max-width: calc(${cardOutsideWidth} * 6 + 20px);
    }
  }
`;

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
  setScrollContainerRef: () => void;
  handleAssetClick: (asset: MediaFile) => void;
  handleLoadMore: () => void;
  loadDisplayURL: (file: MediaFile) => void;
  displayURLs: MediaLibraryState['displayURLs'];
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
  setScrollContainerRef,
  handleAssetClick,
  handleLoadMore,
  loadDisplayURL,
  displayURLs,
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
    <StyledModal open={isVisible} onClose={handleClose}>
      <StyledFab color="default" aria-label="add" onClick={handleClose} size="small">
        <CloseIcon />
      </StyledFab>
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
      <DialogContent>
        {!shouldShowEmptyMessage ? null : <EmptyMessage content={emptyMessage} />}
        <MediaLibraryCardGrid
          setScrollContainerRef={setScrollContainerRef}
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
        />
      </DialogContent>
    </StyledModal>
  );
};

export default translate()(MediaLibraryModal);
