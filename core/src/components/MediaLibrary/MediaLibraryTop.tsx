import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import React from 'react';

import { CopyToClipBoardButton, UploadButton } from './MediaLibraryButtons';
import MediaLibrarySearch from './MediaLibrarySearch';

import type { ChangeEvent, ChangeEventHandler, KeyboardEventHandler } from 'react';
import type { MediaFile, TranslatedProps } from '../../interface';

const LibraryTop = styled('div')`
  position: relative;
  display: flex;
  flex-direction: column;
`;

const StyledButtonsContainer = styled('div')`
  flex-shrink: 0;
  display: flex;
  gap: 8px;
`;

const StyledDialogTitle = styled(DialogTitle)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export interface MediaLibraryTopProps {
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
  privateUpload,
}: TranslatedProps<MediaLibraryTopProps>) => {
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
      <StyledDialogTitle>
        {`${privateUpload ? t('mediaLibrary.mediaLibraryModal.private') : ''}${
          forImage
            ? t('mediaLibrary.mediaLibraryModal.images')
            : t('mediaLibrary.mediaLibraryModal.mediaAssets')
        }`}
        <StyledButtonsContainer>
          <CopyToClipBoardButton
            disabled={!hasSelection}
            path={selectedFile?.path}
            name={selectedFile?.name}
            draft={selectedFile?.draft}
            t={t}
          />
          <Button color="inherit" variant="contained" onClick={onDownload} disabled={!hasSelection}>
            {downloadButtonLabel}
          </Button>
          <UploadButton
            label={uploadButtonLabel}
            imagesOnly={forImage}
            onChange={onUpload}
            disabled={!uploadEnabled}
          />
        </StyledButtonsContainer>
      </StyledDialogTitle>
      <StyledDialogTitle>
        <MediaLibrarySearch
          value={query}
          onChange={onSearchChange}
          onKeyDown={onSearchKeyDown}
          placeholder={t('mediaLibrary.mediaLibraryModal.search')}
          disabled={searchDisabled}
        />
        <StyledButtonsContainer>
          <Button color="error" variant="outlined" onClick={onDelete} disabled={!deleteEnabled}>
            {deleteButtonLabel}
          </Button>
          {!canInsert ? null : (
            <Button color="success" variant="contained" onClick={onInsert} disabled={!hasSelection}>
              {insertButtonLabel}
            </Button>
          )}
        </StyledButtonsContainer>
      </StyledDialogTitle>
    </LibraryTop>
  );
};

export default MediaLibraryTop;
