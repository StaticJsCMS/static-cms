import React from 'react';

import classNames from '@staticcms/core/lib/util/classNames.util';

const Backdrop = React.forwardRef<
  HTMLDivElement,
  { open?: boolean; className: string; ownerState: unknown }
>((props, ref) => {
  const { open, className, ownerState: _ownerState, ...other } = props;
  return (
    <div
      className={classNames(
        `
            fixed
            inset-0
            bg-black
            bg-opacity-50
            dark:bg-opacity-60
            z-50
          `,
        open && 'MuiBackdrop-open',
        className,
      )}
      ref={ref}
      {...other}
    />
  );
});

Backdrop.displayName = 'Backdrop';

export default Backdrop;
