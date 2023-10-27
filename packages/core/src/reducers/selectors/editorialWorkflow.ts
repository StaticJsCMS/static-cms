import { createSelector } from '@reduxjs/toolkit';

import type { WorkflowStatus } from '@staticcms/core/constants/publishModes';
import type { Entry } from '@staticcms/core/interface';
import type { RootState } from '@staticcms/core/store';

export const selectUnpublishedEntries = (state: RootState) => {
  return state.editorialWorkflow.entries;
};

export const selectUnpublishedEntry = createSelector(
  [
    selectUnpublishedEntries,
    (_state: RootState, collectionName: string) => collectionName,
    (_state: RootState, _collectionName: string, slug: string | undefined) => slug,
  ],
  (entries, collectionName, slug): Entry | undefined => {
    if (!slug) {
      return undefined;
    }

    return entries[`${collectionName}.${slug}`];
  },
);

export const selectUnpublishedEntriesByStatus = createSelector(
  [selectUnpublishedEntries, (_state: RootState, status: WorkflowStatus) => status],
  (entries, status) => {
    return Object.values(entries).filter(entry => entry.status === status);
  },
);

export const selectUnpublishedSlugs = createSelector(
  [selectUnpublishedEntries, (_state: RootState, collectionName: string) => collectionName],
  (entries, collectionName) => {
    return Object.entries(entries)
      .filter(([k]) => k.startsWith(`${collectionName}.`))
      .map(([_k, entry]) => entry.slug);
  },
);
