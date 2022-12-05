import Popover from '@mui/material/Popover';
import { styled } from '@mui/material/styles';
import React, { useCallback, useState } from 'react';

import ToolbarButton from '../ToolbarButton';

import type { FC, ReactNode } from 'react';
import type { ToolbarButtonProps } from '../ToolbarButton';

const StyledPopperContent = styled('div')`
  display: flex;
  gap: 4px;
  padding: 16px;
  border-radius: 4px;
  align-items: center;
`;

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
        <StyledPopperContent>{children}</StyledPopperContent>
      </Popover>
    </>
  );
};

export default ToolbarDropdown;
