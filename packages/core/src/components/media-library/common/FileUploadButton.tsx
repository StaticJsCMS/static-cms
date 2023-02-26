import ArrowUpTrayIcon from '@heroicons/react/24/outline/ArrowUpTrayIcon';
import React from 'react';
import { translate } from 'react-polyglot';

import { selectDeleting, selectPersisting } from '@staticcms/core/reducers/selectors/mediaLibrary';
import { useAppSelector } from '@staticcms/core/store/hooks';
import useButtonClassNames from '../../common/button/useButtonClassNames';

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

  const buttonClasses = useButtonClassNames('contained', 'primary', false);

  return (
    <label className={`${buttonClasses} cursor-pointer`}>
      <ArrowUpTrayIcon className="w-5 h-5 mr-2" />
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
    </label>
  );
};

export default translate()(FileUploadButton) as FC<FileUploadButtonProps>;
