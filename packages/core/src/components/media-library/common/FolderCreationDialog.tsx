import { Close as CloseIcon } from '@styled-icons/material/Close';
import React, { useCallback, useState } from 'react';

import { isEmpty } from '@staticcms/core/lib/util/string.util';
import { generateClassNames } from '@staticcms/core/lib/util/theming.util';
import Button from '../../common/button/Button';
import IconButton from '../../common/button/IconButton';
import Modal from '../../common/modal/Modal';
import TextField from '../../common/text-field/TextField';

import type { TranslatedProps } from '@staticcms/core/interface';
import type { ChangeEventHandler, FC } from 'react';

import './FolderCreationDialog.css';

export const classes = generateClassNames('FolderCreationDialog', [
  'root',
  'header',
  'title',
  'close-button',
  'close-button-icon',
  'name-input-wrapper',
  'name-input',
  'actions',
  'cancel-button',
  'create-button',
]);

interface FolderCreationDialogProps {
  open: boolean;
  onClose: () => void;
  onCreate: (folderName: string) => void;
}

const FolderCreationDialog: FC<TranslatedProps<FolderCreationDialogProps>> = ({
  open,
  onClose,
  onCreate,
  t,
}) => {
  const [folderName, setFolderName] = useState('');
  const handleFolderNameChange: ChangeEventHandler<HTMLInputElement> = useCallback(event => {
    setFolderName(event.target.value);
  }, []);

  const handleCreate = useCallback(() => {
    if (isEmpty(folderName)) {
      return;
    }

    onCreate(folderName);
    setFolderName('');
  }, [folderName, onCreate]);

  const handleClose = useCallback(() => {
    onClose();
    setFolderName('');
  }, [onClose]);

  return (
    <Modal open={open} onClose={handleClose} className={classes.root}>
      <div className={classes.header}>
        <h3 className={classes.title}>{t('mediaLibrary.folderSupport.createNewFolder')}</h3>
        <IconButton
          variant="text"
          aria-label="close"
          onClick={handleClose}
          className={classes['close-button']}
        >
          <CloseIcon className={classes['close-button-icon']} />
        </IconButton>
      </div>
      <div className={classes['name-input-wrapper']}>
        <TextField
          id="folder_name"
          type="text"
          value={folderName}
          onChange={handleFolderNameChange}
          key="mobile-time-input"
          data-testid="time-input"
          cursor="pointer"
          variant="contained"
          placeholder={t('mediaLibrary.folderSupport.enterFolderName')}
          rootClassName={classes['name-input']}
        />
      </div>
      <div className={classes.actions}>
        <Button
          variant="text"
          aria-label="cancel"
          onClick={handleClose}
          className={classes['cancel-button']}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          aria-label="create"
          onClick={handleCreate}
          disabled={isEmpty(folderName)}
          className={classes['create-button']}
        >
          Create
        </Button>
      </div>
    </Modal>
  );
};

export default FolderCreationDialog;
