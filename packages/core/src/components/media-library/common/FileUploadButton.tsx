import { FileUpload as FileUploadIcon } from '@styled-icons/material/FileUpload';
import React, { useCallback, useRef } from 'react';
import { translate } from 'react-polyglot';

import classNames from '@staticcms/core/lib/util/classNames.util';
import { selectDeleting, selectPersisting } from '@staticcms/core/reducers/selectors/mediaLibrary';
import { useAppSelector } from '@staticcms/core/store/hooks';
import useButtonClassNames from '../../common/button/useButtonClassNames';
import mediaLibraryClasses from './MediaLibrary.classes';

import type { TranslatedProps } from '@staticcms/core/interface';
import type { ChangeEventHandler, FC, KeyboardEvent } from 'react';

export interface FileUploadButtonProps {
  imagesOnly?: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const FileUploadButton: FC<TranslatedProps<FileUploadButtonProps>> = ({
  imagesOnly,
  onChange,
  t,
}) => {
  const ref = useRef<HTMLLabelElement | null>(null);

  const isPersisting = useAppSelector(selectPersisting);
  const isDeleting = useAppSelector(selectDeleting);

  const buttonClasses = useButtonClassNames('contained', 'primary', 'medium', false);

  const handleOnKeyUp = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      ref.current?.click();
    }
  }, []);

  return (
    <label
      ref={ref}
      role="button"
      className={classNames(mediaLibraryClasses['upload-button'], buttonClasses)}
      tabIndex={0}
      onKeyUp={handleOnKeyUp}
    >
      <FileUploadIcon className={mediaLibraryClasses['upload-button-icon']} />
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
        className={mediaLibraryClasses['upload-button-input']}
      />
    </label>
  );
};

export default translate()(FileUploadButton) as FC<FileUploadButtonProps>;
