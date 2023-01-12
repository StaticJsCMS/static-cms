/* eslint-disable import/prefer-default-export */
import type { RootState } from '@staticcms/core/store';

export const selectFieldErrors = (path: string) => (state: RootState) => {
  return state.entryDraft.fieldsErrors[path] ?? [];
};

export function selectEditingDraft(state: RootState) {
  return state.entryDraft.entry;
}
