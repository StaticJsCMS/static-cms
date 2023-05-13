import Popover from '@mui/material/Popover';
import React, { useCallback, useState } from 'react';

import ToolbarButton from '../ToolbarButton';

import type { FC, ReactNode } from 'react';
import type { ToolbarButtonProps } from '../ToolbarButton';

export interface ToolbarDropdownProps extends Omit<ToolbarButtonProps, 'onClick'> {
  children: ReactNode;
  onClose?: () => void;
}

const ToolbarDropdown: FC<ToolbarDropdownProps> = ({ children, onClose, ...controlProps }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);

  const [open, setOpen] = useState(false);

  const handleClose = useCallback(() => {
    onClose?.();
    setOpen(false);
  }, [onClose]);

  const handleControlClick = useCallback(() => {
    if (open) {
      handleClose();
      return;
    }
    setOpen(!open);
  }, [handleClose, open]);

  return (
    <>
      <div ref={setAnchorEl}>
        <ToolbarButton {...controlProps} onClick={handleControlClick} />
      </div>

      <Popover
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handleClose}
        disablePortal
      >
        <div>{children}</div>
      </Popover>
    </>
  );
};

export default ToolbarDropdown;
