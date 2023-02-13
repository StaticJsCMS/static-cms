import { useMemo } from 'react';

import type { BaseBaseProps } from './Button';

const classes: Record<
  Required<BaseBaseProps>['variant'],
  Record<Required<BaseBaseProps>['color'], Record<'default' | 'rounded', string>>
> = {
  contained: {
    primary: {
      default: 'btn-contained-primary',
      rounded: 'btn-contained-primary-rounded',
    },
  },
  outlined: {
    primary: {
      default: 'btn-outlined-primary',
      rounded: 'btn-outlined-primary-rounded',
    },
  },
  text: {
    primary: {
      default: 'btn-text-primary',
      rounded: 'btn-text-primary-rounded',
    },
  },
};

export default function useButtonClassName(
  variant: Required<BaseBaseProps>['variant'],
  color: Required<BaseBaseProps>['color'],
  rounded: boolean,
) {
  return useMemo(
    () => classes[variant][color][rounded ? 'rounded' : 'default'],
    [color, rounded, variant],
  );
}
