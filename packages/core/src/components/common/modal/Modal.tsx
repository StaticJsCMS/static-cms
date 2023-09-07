import ModalUnstyled from '@mui/base/ModalUnstyled';
import React, { useCallback } from 'react';

import classNames from '@staticcms/core/lib/util/classNames.util';
import Backdrop from './Backdrop';
import { modalClasses } from './Modal.util';

import type { FC, ReactNode } from 'react';

import './Modal.css';

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
          className: modalClasses.root,
        },
      }}
    >
      <div className={classNames(modalClasses.content, className)}>{children}</div>
    </ModalUnstyled>
  );
};

export default Modal;
