import { useMemo } from 'react';

import { generateClassNames } from '@staticcms/core/lib/util/theming.util';

import type { ButtonBaseProps } from './Button';

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
  Required<ButtonBaseProps>['variant'],
  Record<Required<ButtonBaseProps>['color'], string>
> = {
  contained: {
    primary: 'CMS_Button_contained-primary',
    secondary: 'CMS_Button_contained-secondary',
    success: 'CMS_Button_contained-success',
    error: 'CMS_Button_contained-error',
    warning: 'CMS_Button_contained-warning',
    info: 'CMS_Button_contained-info',
  },
  outlined: {
    primary: 'CMS_Button_outlined-primary',
    secondary: 'CMS_Button_outlined-secondary',
    success: 'CMS_Button_outlined-success',
    error: 'CMS_Button_outlined-error',
    warning: 'CMS_Button_outlined-warning',
    info: 'CMS_Button_outlined-info',
  },
  text: {
    primary: 'CMS_Button_text-primary',
    secondary: 'CMS_Button_text-secondary',
    success: 'CMS_Button_text-success',
    error: 'CMS_Button_text-error',
    warning: 'CMS_Button_text-warning',
    info: 'CMS_Button_text-info',
  },
};

function useButtonClassNames(
  variant: Required<ButtonBaseProps>['variant'],
  color: Required<ButtonBaseProps>['color'],
  size: Required<ButtonBaseProps>['size'],
  rounded: boolean | 'no-padding',
) {
  let mainClass = size === 'small' ? 'CMS_Button_root-sm' : 'CMS_Button_root';
  if (rounded === 'no-padding') {
    mainClass = 'CMS_Button_root-rounded-no-padding';
  } else if (rounded) {
    mainClass = size === 'small' ? 'CMS_Button_root-rounded-sm' : 'CMS_Button_root-rounded';
  }

  return useMemo(() => `${mainClass} ${classes[variant][color]}`, [color, mainClass, variant]);
}

export default useButtonClassNames;
