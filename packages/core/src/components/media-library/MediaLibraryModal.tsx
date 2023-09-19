import { Close as CloseIcon } from '@styled-icons/material/Close';
import React, { useCallback } from 'react';

import { closeMediaLibrary } from '@staticcms/core/actions/mediaLibrary';
import { generateClassNames } from '@staticcms/core/lib/util/theming.util';
import { selectVisible } from '@staticcms/core/reducers/selectors/mediaLibrary';
import { useAppDispatch, useAppSelector } from '@staticcms/core/store/hooks';
import IconButton from '../common/button/IconButton';
import Modal from '../common/modal/Modal';
import MediaLibrary from './common/MediaLibrary';

import type { FC } from 'react';

import './MediaLibraryModal.css';

export const classes = generateClassNames('MediaLibraryModal', [
  'root',
  'close-button',
  'close-button-icon',
]);

const MediaLibraryModal: FC = () => {
  const dispatch = useAppDispatch();
  const isVisible = useAppSelector(selectVisible);

  const handleClose = useCallback(() => {
    dispatch(closeMediaLibrary());
  }, [dispatch]);

  return (
    <Modal open={isVisible} onClose={handleClose} className={classes.root}>
      <IconButton
        className={classes['close-button']}
        color="secondary"
        variant="outlined"
        aria-label="close"
        onClick={handleClose}
        rounded
      >
        <CloseIcon className={classes['close-button-icon']} />
      </IconButton>
      <MediaLibrary canInsert isDialog />
    </Modal>
  );
};

export default MediaLibraryModal;
