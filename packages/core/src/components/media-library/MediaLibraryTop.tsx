import React from 'react';

import FileUploadButton from '../UI/FileUploadButton';
import { CopyToClipBoardButton } from './MediaLibraryButtons';
import MediaLibrarySearch from './MediaLibrarySearch';
import Button from '../common/button/Button';

import type { MediaFile, TranslatedProps } from '@staticcms/core/interface';
import type { ChangeEvent, ChangeEventHandler, KeyboardEventHandler } from 'react';

export interface MediaLibraryTopProps {
  onClose: () => void;
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
}: TranslatedProps<MediaLibraryTopProps>) => {
  const shouldShowButtonLoader = isPersisting || isDeleting;
  const uploadEnabled = !shouldShowButtonLoader;
  const deleteEnabled = !shouldShowButtonLoader && hasSelection;

  const FileUploadButtonLabel = isPersisting
    ? t('mediaLibrary.mediaLibraryModal.uploading')
    : t('mediaLibrary.mediaLibraryModal.upload');
  const deleteButtonLabel = isDeleting
    ? t('mediaLibrary.mediaLibraryModal.deleting')
    : t('mediaLibrary.mediaLibraryModal.deleteSelected');
  const downloadButtonLabel = t('mediaLibrary.mediaLibraryModal.download');
  const insertButtonLabel = t('mediaLibrary.mediaLibraryModal.chooseSelected');

  return (
    <div>
      {/*
      <DialogTitle>
        {forImage
          ? t('mediaLibrary.mediaLibraryModal.images')
          : t('mediaLibrary.mediaLibraryModal.mediaAssets')}
        <div>
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
          <FileUploadButton
            label={FileUploadButtonLabel}
            imagesOnly={forImage}
            onChange={onUpload}
            disabled={!uploadEnabled}
          />
        </div>
      </DialogTitle>
        */}
      <MediaLibrarySearch
        value={query}
        onChange={onSearchChange}
        onKeyDown={onSearchKeyDown}
        placeholder={t('mediaLibrary.mediaLibraryModal.search')}
        disabled={searchDisabled}
      />
      <div>
        <Button color="error" variant="outlined" onClick={onDelete} disabled={!deleteEnabled}>
          {deleteButtonLabel}
        </Button>
        {!canInsert ? null : (
          <Button
            key="choose-selected"
            color="success"
            variant="contained"
            onClick={onInsert}
            disabled={!hasSelection}
          >
            {insertButtonLabel}
          </Button>
        )}
      </div>
    </div>
  );
};

export default MediaLibraryTop;
