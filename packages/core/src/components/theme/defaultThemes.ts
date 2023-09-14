import type { Theme } from '@staticcms/core/interface';

export const DARK_THEME: Theme = {
  name: 'Dark',
  text: {
    primary: 'rgb(209, 213, 219)',
    emphasis: 'rgb(255, 255, 255)',
  },
  primary: {
    main: 'rgb(59, 130, 246)',
  },
};

export const LIGHT_THEME: Theme = {
  name: 'Light',
  text: {
    primary: 'rgb(31, 41, 55)',
    emphasis: 'rgb(31, 41, 55)',
  },
  primary: {
    main: 'rgb(59, 130, 246)',
  },
};

export const DEFAULT_THEMES: Theme[] = [DARK_THEME, LIGHT_THEME];
