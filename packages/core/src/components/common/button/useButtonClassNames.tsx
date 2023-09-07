import { useMemo } from 'react';

import { generateClassNames } from '@staticcms/core/lib/util/theming.util';

import type { BaseBaseProps } from './Button';

export const buttonClasses = generateClassNames('Button', [
  'root-sm',
  'root',
  'root-rounded-no-padding',
  'root-rounded-sm',
  'root-rounded',
  'contained-primary',
  'contained-secondary',
  'contained-success',
  'contained-error',
  'contained-warning',
  'outlined-primary',
  'outlined-secondary',
  'outlined-success',
  'outlined-error',
  'outlined-warning',
  'text-primary',
  'text-secondary',
  'text-success',
  'text-error',
  'text-warning',
  'start-icon',
  'end-icon',
]);

const classes: Record<
  Required<BaseBaseProps>['variant'],
  Record<Required<BaseBaseProps>['color'], string>
> = {
  contained: {
    primary: buttonClasses['contained-primary'],
    secondary: buttonClasses['contained-secondary'],
    success: buttonClasses['contained-success'],
    error: buttonClasses['contained-error'],
    warning: buttonClasses['contained-warning'],
  },
  outlined: {
    primary: buttonClasses['outlined-primary'],
    secondary: buttonClasses['outlined-secondary'],
    success: buttonClasses['outlined-success'],
    error: buttonClasses['outlined-error'],
    warning: buttonClasses['outlined-warning'],
  },
  text: {
    primary: buttonClasses['text-primary'],
    secondary: buttonClasses['text-secondary'],
    success: buttonClasses['text-success'],
    error: buttonClasses['text-error'],
    warning: buttonClasses['text-warning'],
  },
};

export default function useButtonClassNames(
  variant: Required<BaseBaseProps>['variant'],
  color: Required<BaseBaseProps>['color'],
  size: Required<BaseBaseProps>['size'],
  rounded: boolean | 'no-padding',
) {
  let mainClass = size === 'small' ? buttonClasses['root-sm'] : buttonClasses.root;
  if (rounded === 'no-padding') {
    mainClass = buttonClasses['root-rounded-no-padding'];
  } else if (rounded) {
    mainClass = size === 'small' ? buttonClasses['root-rounded-sm'] : buttonClasses['root-rounded'];
  }

  return useMemo(() => `${mainClass} ${classes[variant][color]}`, [color, mainClass, variant]);
}
