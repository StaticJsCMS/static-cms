import { Close as CloseIcon } from '@styled-icons/material/Close';
import React, { useCallback } from 'react';

import { closeMediaLibrary } from '@staticcms/core/actions/mediaLibrary';
import { selectVisible } from '@staticcms/core/reducers/selectors/mediaLibrary';
import { useAppDispatch, useAppSelector } from '@staticcms/core/store/hooks';
import IconButton from '../common/button/IconButton';
import Modal from '../common/modal/Modal';
import MediaLibrary from './common/MediaLibrary';

import type { FC } from 'react';

const MediaLibraryModal: FC = () => {
  const dispatch = useAppDispatch();
  const isVisible = useAppSelector(selectVisible);

  const handleClose = useCallback(() => {
    dispatch(closeMediaLibrary());
  }, [dispatch]);

  return (
    <Modal
      open={isVisible}
      onClose={handleClose}
      className="
        w-media-library-dialog
        h-media-library-dialog
      "
    >
      <IconButton
        className="
            absolute
            -top-3.5
            -left-3.5
            bg-white
            hover:bg-gray-100
            dark:bg-slate-800
            dark:hover:bg-slate-900
          "
        variant="outlined"
        aria-label="add"
        onClick={handleClose}
        rounded
      >
        <CloseIcon className="w-5 h-5" />
      </IconButton>
      <MediaLibrary canInsert isDialog />
    </Modal>
  );
};

export default MediaLibraryModal;
