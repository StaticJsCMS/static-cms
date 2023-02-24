import ArrowUpTrayIcon from '@heroicons/react/24/outline/ArrowUpTrayIcon';
import React from 'react';
import { translate } from 'react-polyglot';

import { selectDeleting, selectPersisting } from '@staticcms/core/reducers/selectors/mediaLibrary';
import { useAppSelector } from '@staticcms/core/store/hooks';
import Button from '../../common/button/Button';

import type { TranslatedProps } from '@staticcms/core/interface';
import type { ChangeEventHandler, FC } from 'react';

export interface FileUploadButtonProps {
  imagesOnly?: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const FileUploadButton: FC<TranslatedProps<FileUploadButtonProps>> = ({
  imagesOnly,
  onChange,
  t,
}) => {
  const isPersisting = useAppSelector(selectPersisting);
  const isDeleting = useAppSelector(selectDeleting);

  return (
    <Button variant="contained" startIcon={ArrowUpTrayIcon}>
      {isPersisting
        ? t('mediaLibrary.mediaLibraryModal.uploading')
        : t('mediaLibrary.mediaLibraryModal.upload')}
      <input
        hidden
        multiple
        type="file"
        accept={imagesOnly ? 'image/*' : '*/*'}
        onChange={onChange}
        disabled={isDeleting || isPersisting}
      />
    </Button>
  );
};

export default translate()(FileUploadButton) as FC<FileUploadButtonProps>;
