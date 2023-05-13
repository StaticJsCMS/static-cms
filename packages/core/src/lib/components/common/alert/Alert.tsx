import React, { useCallback, useMemo, useState } from 'react';
import { translate } from 'react-polyglot';

import AlertEvent from '@staticcms/core/lib/util/events/AlertEvent';
import { useWindowEvent } from '@staticcms/core/lib/util/window.util';
import Button from '../button/Button';
import Modal from '../modal/Modal';

import type { TranslateProps } from 'react-polyglot';

interface AlertProps {
  title: string | { key: string; options?: Record<string, unknown> };
  body: string | { key: string; options?: Record<string, unknown> };
  okay?: string | { key: string; options?: Record<string, unknown> };
  color?: 'success' | 'error' | 'primary';
}

export interface AlertDialogProps extends AlertProps {
  resolve: () => void;
}

const AlertDialog = ({ t }: TranslateProps) => {
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
      className="
        w-[50%]
        min-w-[300px]
        max-w-[600px]
      "
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <div
        className="
          px-6
          py-4
          text-xl
          bold
        "
      >
        {title}
      </div>
      <div
        className="
          px-6
          pb-4
          text-sm
          text-slate-500
          dark:text-slate-400
        "
      >
        {body}
      </div>
      <div
        className="
          p-2
          flex
          justify-end
          gap-2
        "
      >
        <Button onClick={handleClose} variant="contained" color={color}>
          {okay}
        </Button>
      </div>
    </Modal>
  );
};

export const Alert = translate()(AlertDialog);

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
