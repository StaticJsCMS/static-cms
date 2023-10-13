/* eslint-disable import/prefer-default-export */
import { THEME_CHANGE, USE_OPEN_AUTHORING } from '../constants';

export function useOpenAuthoring() {
  return {
    type: USE_OPEN_AUTHORING,
  } as const;
}

export function changeTheme(theme: string) {
  return { type: THEME_CHANGE, payload: theme } as const;
}

export type GlobalUIAction = ReturnType<typeof changeTheme | typeof useOpenAuthoring>;
