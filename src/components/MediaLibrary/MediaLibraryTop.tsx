import styled from '@emotion/styled';
import React from 'react';

import {
  CopyToClipBoardButton,
  DeleteButton,
  DownloadButton,
  InsertButton,
  UploadButton,
} from './MediaLibraryButtons';
import MediaLibraryHeader from './MediaLibraryHeader';
import MediaLibrarySearch from './MediaLibrarySearch';

import type { ChangeEvent, ChangeEventHandler, KeyboardEventHandler } from 'react';
import type { MediaFile, TranslatedProps } from '../../interface';

const LibraryTop = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

const RowContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ButtonsContainer = styled.div`
  flex-shrink: 0;
`;

interface MediaLibraryTop {
  onClose: () => void;
  privateUpload?: boolean;
  forImage?: boolean;
  onDownload: () => void;
  onUpload: (event: ChangeEvent<HTMLInputElement> | DragEvent) => void;
  query?: string;
  onSearchChange: ChangeEventHandler<HTMLInputElement>;
  onSearchKeyDown: KeyboardEventHandler<HTMLInputElement>;
  searchDisabled: boolean;
  onDelete: () => void;
  canInsert?: boolean;
  onInsert: () => void;
  hasSelection: boolean;
  isPersisting?: boolean;
  isDeleting?: boolean;
  selectedFile?: MediaFile;
}

const MediaLibraryTop = ({
  t,
  onClose,
  privateUpload,
  forImage,
  onDownload,
  onUpload,
  query,
  onSearchChange,
  onSearchKeyDown,
  searchDisabled,
  onDelete,
  canInsert,
  onInsert,
  hasSelection,
  isPersisting,
  isDeleting,
  selectedFile,
}: TranslatedProps<MediaLibraryTop>) => {
  const shouldShowButtonLoader = isPersisting || isDeleting;
  const uploadEnabled = !shouldShowButtonLoader;
  const deleteEnabled = !shouldShowButtonLoader && hasSelection;

  const uploadButtonLabel = isPersisting
    ? t('mediaLibrary.mediaLibraryModal.uploading')
    : t('mediaLibrary.mediaLibraryModal.upload');
  const deleteButtonLabel = isDeleting
    ? t('mediaLibrary.mediaLibraryModal.deleting')
    : t('mediaLibrary.mediaLibraryModal.deleteSelected');
  const downloadButtonLabel = t('mediaLibrary.mediaLibraryModal.download');
  const insertButtonLabel = t('mediaLibrary.mediaLibraryModal.chooseSelected');

  return (
    <LibraryTop>
      <RowContainer>
        <MediaLibraryHeader
          onClose={onClose}
          title={`${privateUpload ? t('mediaLibrary.mediaLibraryModal.private') : ''}${
            forImage
              ? t('mediaLibrary.mediaLibraryModal.images')
              : t('mediaLibrary.mediaLibraryModal.mediaAssets')
          }`}
          isPrivate={privateUpload}
        />
        <ButtonsContainer>
          <CopyToClipBoardButton
            disabled={!hasSelection}
            path={selectedFile?.path}
            name={selectedFile?.name}
            draft={selectedFile?.draft}
            t={t}
          />
          <DownloadButton onClick={onDownload} disabled={!hasSelection}>
            {downloadButtonLabel}
          </DownloadButton>
          <UploadButton
            label={uploadButtonLabel}
            imagesOnly={forImage}
            onChange={onUpload}
            disabled={!uploadEnabled}
          />
        </ButtonsContainer>
      </RowContainer>
      <RowContainer>
        <MediaLibrarySearch
          value={query}
          onChange={onSearchChange}
          onKeyDown={onSearchKeyDown}
          placeholder={t('mediaLibrary.mediaLibraryModal.search')}
          disabled={searchDisabled}
        />
        <ButtonsContainer>
          <DeleteButton onClick={onDelete} disabled={!deleteEnabled}>
            {deleteButtonLabel}
          </DeleteButton>
          {!canInsert ? null : (
            <InsertButton onClick={onInsert} disabled={!hasSelection}>
              {insertButtonLabel}
            </InsertButton>
          )}
        </ButtonsContainer>
      </RowContainer>
    </LibraryTop>
  );
};

export default MediaLibraryTop;
