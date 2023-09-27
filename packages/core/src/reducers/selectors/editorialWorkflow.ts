import type { WorkflowStatus } from '@staticcms/core/constants/publishModes';
import type { Entry } from '@staticcms/core/interface';
import type { RootState } from '@staticcms/core/store';

export function selectUnpublishedEntry(
  state: RootState,
  collection: string,
  slug: string | undefined,
): Entry | undefined {
  if (!slug) {
    return undefined;
  }

  return state && state.editorialWorkflow.entities[`${collection}.${slug}`];
}

export const selectUnpublishedEntriesByStatus = (status: WorkflowStatus) => (state: RootState) => {
  return Object.values(state.editorialWorkflow.entities).filter(entry => entry.status === status);
};

export const selectUnpublishedEntries = (state: RootState) => {
  return state.editorialWorkflow.entities;
};

export function selectUnpublishedSlugs(state: RootState, collection: string) {
  return Object.entries(state.editorialWorkflow.entities)
    .filter(([k]) => k.startsWith(`${collection}.`))
    .map(([_k, entry]) => entry.slug);
}
