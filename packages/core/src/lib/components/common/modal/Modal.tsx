import ModalUnstyled from '@mui/base/ModalUnstyled';
import React, { useCallback } from 'react';

import classNames from '@staticcms/core/lib/util/classNames.util';
import Backdrop from './Backdrop';

import type { FC, ReactNode } from 'react';

interface ModalProps {
  open: boolean;
  children: ReactNode;
  className?: string;
  onClose?: () => void;
}

const Modal: FC<ModalProps> = ({ open, children, className, onClose }) => {
  const handleClose = useCallback(() => {
    onClose?.();
  }, [onClose]);

  return (
    <ModalUnstyled
      open={open}
      onClose={handleClose}
      slots={{
        backdrop: Backdrop,
      }}
      slotProps={{
        root: {
          className: `
            fixed
            inset-0
            overflow-y-auto
            z-50
            flex
            min-h-full
            items-center
            justify-center
            text-center
            styled-scrollbars
          `,
        },
      }}
    >
      <div
        className={classNames(
          `
            transform
            overflow-visible
            rounded-lg
            text-left
            align-middle
            shadow-xl
            transition-all
            bg-white
            dark:bg-slate-800
            z-[51]
            outline-none
          `,
          className,
        )}
      >
        {children}
      </div>
    </ModalUnstyled>
  );
};

export default Modal;
