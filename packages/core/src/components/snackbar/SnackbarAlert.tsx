import { Info as InfoIcon } from '@styled-icons/material-outlined/Info';
import { Close as CloseIcon } from '@styled-icons/material/Close';
import { ErrorOutline as ErrorOutlineIcon } from '@styled-icons/material/ErrorOutline';
import { TaskAlt as TaskAltIcon } from '@styled-icons/material/TaskAlt';
import { WarningAmber as WarningAmberIcon } from '@styled-icons/material/WarningAmber';
import React, { forwardRef, useMemo } from 'react';

import classNames from '@staticcms/core/lib/util/classNames.util';
import IconButton from '../common/button/IconButton';

import type { TranslatedProps } from '@staticcms/core/interface';
import type { SnackbarMessage } from '@staticcms/core/store/slices/snackbars';

interface SnackbarAlertProps {
  data: SnackbarMessage;
  onClose: () => void;
}

const SnackbarAlert = forwardRef<HTMLDivElement, TranslatedProps<SnackbarAlertProps>>(
  ({ data, onClose, t }, ref) => {
    const { type, message } = data;

    const renderedMessage = useMemo(() => {
      if (typeof message === 'string') {
        return message;
      }

      const { key, options } = message;
      return t(key, options);
    }, [message, t]);

    const icon = useMemo(() => {
      switch (type) {
        case 'error':
          return <ErrorOutlineIcon className="w-4 h-4" />;
        case 'success':
          return <TaskAltIcon className="w-4 h-4" />;
        case 'warning':
          return <WarningAmberIcon className="w-4 h-4" />;
        default:
          return <InfoIcon className="w-4 h-4" />;
      }
    }, [type]);

    return (
      <div
        id="toast-default"
        className="
          flex
          items-center
          w-full
          max-w-xs
          gap-3
          py-2
          px-2.5
          text-gray-500
          bg-white
          rounded-lg
          shadow
          dark:text-gray-300
          dark:bg-gray-800
          dark:shadow-lg
        "
        role="alert"
        ref={ref}
      >
        <div
          className={classNames(
            `
              inline-flex
              items-center
              justify-center
              flex-shrink-0
              w-7
              h-7
              rounded-lg
            `,
            type === 'error' &&
              `
                bg-red-500
                text-red-100
                dark:bg-red-600
                dark:text-red-200
              `,
            type === 'success' &&
              `
                bg-green-500
                text-green-100
                dark:bg-green-600
                dark:text-green-200
              `,
            type === 'warning' &&
              `
                bg-yellow-500
                text-yellow-100
                dark:bg-yellow-600
                dark:text-yellow-200
              `,
            type === 'info' &&
              `
                text-blue-500
                bg-blue-100
                dark:bg-blue-800
                dark:text-blue-200
              `,
          )}
        >
          {icon}
        </div>
        <div
          className="
            text-sm
            font-normal
          "
        >
          {renderedMessage}
        </div>
        <IconButton
          aria-label="Close"
          variant="text"
          color="secondary"
          onClick={onClose}
          className="
            ml-2
          "
        >
          <span className="sr-only">Close</span>
          <CloseIcon className="w-4 h-4" />
        </IconButton>
      </div>
    );
  },
);

SnackbarAlert.displayName = 'SnackbarAlert';

export default SnackbarAlert;
