import React, { useCallback, useMemo, useState } from 'react';
import { translate } from 'react-polyglot';

import ConfirmEvent from '@staticcms/core/lib/util/events/ConfirmEvent';
import { generateClassNames } from '@staticcms/core/lib/util/theming.util';
import { useWindowEvent } from '@staticcms/core/lib/util/window.util';
import Button from '../button/Button';
import Modal from '../modal/Modal';

import type { TranslateProps } from 'react-polyglot';

import './Confirm.css';

export const classes = generateClassNames('Confirm', [
  'root',
  'title',
  'content',
  'actions',
  'confirm-button',
  'cancel-button',
]);

interface ConfirmProps {
  title: string | { key: string; options?: Record<string, unknown> };
  body: string | { key: string; options?: Record<string, unknown> };
  cancel?: string | { key: string; options?: Record<string, unknown> };
  confirm?: string | { key: string; options?: Record<string, unknown> };
  color?: 'success' | 'error' | 'warning' | 'primary';
}

export interface ConfirmDialogProps extends ConfirmProps {
  resolve: (value: boolean | PromiseLike<boolean>) => void;
}

const ConfirmDialog = ({ t }: TranslateProps) => {
  const [detail, setDetail] = useState<ConfirmDialogProps | null>(null);
  const {
    resolve,
    title: rawTitle,
    body: rawBody,
    cancel: rawCancel = 'ui.common.no',
    confirm: rawConfirm = 'ui.common.yes',
    color = 'primary',
  } = detail ?? {};

  const onConfirmMessage = useCallback((event: ConfirmEvent) => {
    setDetail(event.detail);
  }, []);

  useWindowEvent('confirm', onConfirmMessage);

  const handleClose = useCallback(() => {
    setDetail(null);
  }, []);

  const handleCancel = useCallback(() => {
    resolve?.(false);
    handleClose();
  }, [handleClose, resolve]);

  const handleConfirm = useCallback(() => {
    resolve?.(true);
    handleClose();
  }, [handleClose, resolve]);

  const title = useMemo(() => {
    if (!rawTitle) {
      return '';
    }
    return typeof rawTitle === 'string' ? t(rawTitle) : t(rawTitle.key, rawTitle.options);
  }, [rawTitle, t]);

  const body = useMemo(() => {
    if (!rawBody) {
      return '';
    }
    return typeof rawBody === 'string' ? t(rawBody) : t(rawBody.key, rawBody.options);
  }, [rawBody, t]);

  const cancel = useMemo(
    () => (typeof rawCancel === 'string' ? t(rawCancel) : t(rawCancel.key, rawCancel.options)),
    [rawCancel, t],
  );

  const confirm = useMemo(
    () => (typeof rawConfirm === 'string' ? t(rawConfirm) : t(rawConfirm.key, rawConfirm.options)),
    [rawConfirm, t],
  );

  if (!detail) {
    return null;
  }

  return (
    <Modal
      open
      onClose={handleCancel}
      className={classes.root}
      aria-labelledby="confirm-dialog-title"
      aria-describedby="confirm-dialog-description"
    >
      <div className={classes.title}>{title}</div>
      <div className={classes.content}>{body}</div>
      <div className={classes.actions}>
        <Button
          onClick={handleCancel}
          variant="text"
          color="secondary"
          className={classes['cancel-button']}
        >
          {cancel}
        </Button>
        <Button
          onClick={handleConfirm}
          variant="contained"
          color={color}
          className={classes['confirm-button']}
        >
          {confirm}
        </Button>
      </div>
    </Modal>
  );
};

export const Confirm = translate()(ConfirmDialog);

const confirm = (props: ConfirmProps) => {
  return new Promise<boolean>(resolve => {
    window.dispatchEvent(
      new ConfirmEvent({
        ...props,
        resolve,
      }),
    );
  });
};

export default confirm;
