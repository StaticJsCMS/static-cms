/* eslint-disable import/prefer-default-export */
import { THEME_CHANGE } from '../constants';

export function changeTheme(theme: 'dark' | 'light') {
  return { type: THEME_CHANGE, payload: theme } as const;
}

export type GlobalUIAction = ReturnType<typeof changeTheme>;
