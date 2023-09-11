import React from 'react';

import classNames from '@staticcms/core/lib/util/classNames.util';
import modalClasses from './Modal.classes';

const Backdrop = React.forwardRef<
  HTMLDivElement,
  { open?: boolean; className: string; ownerState: unknown }
>((props, ref) => {
  const { open, className, ownerState: _ownerState, ...other } = props;
  return (
    <div
      className={classNames(modalClasses.backdrop, open && 'MuiBackdrop-open', className)}
      ref={ref}
      {...other}
    />
  );
});

Backdrop.displayName = 'Backdrop';

export default Backdrop;
