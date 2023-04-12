import { Close as CloseIcon } from '@styled-icons/material/Close';
import React, { useCallback, useState } from 'react';

import { isEmpty } from '@staticcms/core/lib/util/string.util';
import Button from '../../common/button/Button';
import IconButton from '../../common/button/IconButton';
import Modal from '../../common/modal/Modal';
import TextField from '../../common/text-field/TextField';

import type { TranslatedProps } from '@staticcms/core/interface';
import type { ChangeEventHandler, FC } from 'react';

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
  }, [folderName, onCreate]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      className="
        w-[50%]
        min-w-[300px]
        max-w-[600px]
      "
    >
      <div
        className="
          flex
          items-start
          justify-between
          px-4
          pt-4
          pb-3
        "
      >
        <h3
          className="
            text-xl
            font-semibold
            text-gray-900
            dark:text-white
          "
        >
          {t('mediaLibrary.folderSupport.createNewFolder')}
        </h3>
        <IconButton variant="text" aria-label="add" onClick={onClose}>
          <CloseIcon className="w-5 h-5" />
        </IconButton>
      </div>
      <div
        className="
        px-4
        py-2
      "
      >
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
        />
      </div>
      <div
        className="
          flex
          items-center
          justify-end
          p-4
          space-x-2
        "
      >
        <Button variant="text" aria-label="cancel" onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="contained"
          aria-label="create"
          onClick={handleCreate}
          disabled={isEmpty(folderName)}
        >
          Create
        </Button>
      </div>
    </Modal>
  );
};

export default FolderCreationDialog;
