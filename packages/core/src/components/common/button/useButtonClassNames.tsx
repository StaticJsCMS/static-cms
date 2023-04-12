import { useMemo } from 'react';

import type { BaseBaseProps } from './Button';

const classes: Record<
  Required<BaseBaseProps>['variant'],
  Record<Required<BaseBaseProps>['color'], string>
> = {
  contained: {
    primary: 'btn-contained-primary',
    secondary: 'btn-contained-secondary',
    success: 'btn-contained-success',
    error: 'btn-contained-error',
  },
  outlined: {
    primary: 'btn-outlined-primary',
    secondary: 'btn-outlined-secondary',
    success: 'btn-outlined-success',
    error: 'btn-outlined-error',
  },
  text: {
    primary: 'btn-text-primary',
    secondary: 'btn-text-secondary',
    success: 'btn-text-success',
    error: 'btn-text-error',
  },
};

export default function useButtonClassNames(
  variant: Required<BaseBaseProps>['variant'],
  color: Required<BaseBaseProps>['color'],
  size: Required<BaseBaseProps>['size'],
  rounded: boolean | 'no-padding',
) {
  let mainClass = size === 'small' ? 'btn-sm' : 'btn';
  if (rounded === 'no-padding') {
    mainClass = 'btn-rounded-no-padding';
  } else if (rounded) {
    mainClass = size === 'small' ? 'btn-rounded-sm' : 'btn-rounded';
  }

  return useMemo(() => `${mainClass} ${classes[variant][color]}`, [color, mainClass, variant]);
}
