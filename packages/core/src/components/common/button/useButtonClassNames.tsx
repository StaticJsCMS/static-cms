import { useMemo } from 'react';

import type { BaseBaseProps } from './Button';

const classes: Record<
  Required<BaseBaseProps>['variant'],
  Record<Required<BaseBaseProps>['color'], string>
> = {
  contained: {
    primary: 'btn-contained-primary',
    success: 'btn-contained-success',
    error: 'btn-contained-error',
  },
  outlined: {
    primary: 'btn-outlined-primary',
    success: 'btn-outlined-success',
    error: 'btn-outlined-error',
  },
  text: {
    primary: 'btn-text-primary',
    success: 'btn-text-success',
    error: 'btn-text-error',
  },
};

export default function useButtonClassNames(
  variant: Required<BaseBaseProps>['variant'],
  color: Required<BaseBaseProps>['color'],
  rounded: boolean,
) {
  return useMemo(
    () => `${rounded ? 'btn-rounded' : 'btn'} ${classes[variant][color]}`,
    [color, rounded, variant],
  );
}
