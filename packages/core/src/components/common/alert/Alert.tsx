import React, { useCallback, useMemo, useState } from 'react';

import useTranslate from '@staticcms/core/lib/hooks/useTranslate';
import AlertEvent from '@staticcms/core/lib/util/events/AlertEvent';
import { generateClassNames } from '@staticcms/core/lib/util/theming.util';
import { useWindowEvent } from '@staticcms/core/lib/util/window.util';
import Button from '../button/Button';
import Modal from '../modal/Modal';

import type { FC } from 'react';

import './Alert.css';

export const classes = generateClassNames('Alert', [
  'root',
  'title',
  'content',
  'actions',
  'confirm-button',
]);

interface AlertProps {
  title: string | { key: string; options?: Record<string, unknown> };
  body: string | { key: string; options?: Record<string, unknown> };
  okay?: string | { key: string; options?: Record<string, unknown> };
  color?: 'success' | 'error' | 'primary';
}

export interface AlertDialogProps extends AlertProps {
  resolve: () => void;
}

const AlertDialog: FC = () => {
  const t = useTranslate();

  const [detail, setDetail] = useState<AlertDialogProps | null>(null);
  const {
    resolve,
    title: rawTitle,
    body: rawBody,
    okay: rawOkay = 'ui.common.okay',
    color = 'primary',
  } = detail ?? {};

  const onAlertMessage = useCallback((event: AlertEvent) => {
    setDetail(event.detail);
  }, []);

  useWindowEvent('alert', onAlertMessage);

  const handleClose = useCallback(() => {
    setDetail(null);
    resolve?.();
  }, [resolve]);

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

  const okay = useMemo(
    () => (typeof rawOkay === 'string' ? t(rawOkay) : t(rawOkay.key, rawOkay.options)),
    [rawOkay, t],
  );

  if (!detail) {
    return null;
  }

  return (
    <Modal
      open
      onClose={handleClose}
      className={classes.root}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <div className={classes.title}>{title}</div>
      <div className={classes.content}>{body}</div>
      <div className={classes.actions}>
        <Button
          onClick={handleClose}
          variant="contained"
          color={color}
          className={classes['confirm-button']}
        >
          {okay}
        </Button>
      </div>
    </Modal>
  );
};

export const Alert = AlertDialog;

const alert = (props: AlertProps) => {
  return new Promise<void>(resolve => {
    window.dispatchEvent(
      new AlertEvent({
        ...props,
        resolve,
      }),
    );
  });
};

export default alert;
