import { Modal as BaseModal } from '@mui/base/Modal';
import React, { useCallback } from 'react';

import classNames from '@staticcms/core/lib/util/classNames.util';
import Backdrop from './Backdrop';
import modalClasses from './Modal.classes';

import type { FC, ReactNode } from 'react';

import './Modal.css';

export interface ModalProps {
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
    <BaseModal
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
    </BaseModal>
  );
};

export default Modal;
