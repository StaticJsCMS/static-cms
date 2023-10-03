import Snackbar from '@mui/material/Snackbar';
import React, { useCallback, useEffect, useState } from 'react';

import useDebounce from '@staticcms/core/lib/hooks/useDebounce';
import { isNullish } from '@staticcms/core/lib/util/null.util';
import { useAppDispatch, useAppSelector } from '@staticcms/core/store/hooks';
import { removeSnackbarById, selectSnackbars } from '@staticcms/core/store/slices/snackbars';
import SnackbarAlert from './SnackbarAlert';

import type { SnackbarMessage } from '@staticcms/core/store/slices/snackbars';
import type { FC, SyntheticEvent } from 'react';

const Snackbars: FC = () => {
  const [open, setOpen] = useState(false);
  const [messageInfo, setMessageInfo] = useState<SnackbarMessage | undefined>(undefined);

  const snackbars = useAppSelector(selectSnackbars);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (snackbars.length && !messageInfo) {
      // Set a new snack when we don't have an active one
      const snackbar = { ...snackbars[0] };
      setMessageInfo(snackbar);
      dispatch(removeSnackbarById(snackbar.id));
      setOpen(true);
    } else if (snackbars.length && messageInfo && open) {
      // Close an active snack when a new one is added
      setOpen(false);
    }
  }, [snackbars, messageInfo, open, dispatch]);

  const idToClose = useDebounce(messageInfo?.id, 5000);

  useEffect(() => {
    if (isNullish(idToClose)) {
      return;
    }

    if (idToClose !== messageInfo?.id) {
      return;
    }

    setOpen(false);
  }, [idToClose, messageInfo?.id]);

  const handleClose = useCallback((_event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  }, []);

  const handleExited = () => {
    setMessageInfo(undefined);
  };

  return (
    <Snackbar
      key={messageInfo ? messageInfo.id : undefined}
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      TransitionProps={{ onExited: handleExited }}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      {messageInfo ? <SnackbarAlert data={messageInfo} onClose={handleClose} /> : undefined}
    </Snackbar>
  );
};

export default Snackbars;
