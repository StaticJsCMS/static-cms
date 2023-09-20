import type { RootState } from '@staticcms/core/store';
import type { EditorialWorkflowState } from '../editorialWorkflow';

export function selectUnpublishedEntry(
  state: EditorialWorkflowState,
  collection: string,
  slug: string,
) {
  return state && state.entities[`${collection}.${slug}`];
}

export function selectUnpublishedEntriesByStatus(state: EditorialWorkflowState, status: string) {
  if (!state) return null;
  const entities = state.get('entities') as Entities;
  return entities.filter(entry => entry.get('status') === status).valueSeq();
}

export function selectUnpublishedSlugs(state: EditorialWorkflowState, collection: string) {
  if (!state.get('entities')) return null;
  const entities = state.get('entities') as Entities;
  return entities
    .filter((_v, k) => startsWith(k as string, `${collection}.`))
    .map(entry => entry.get('slug'))
    .valueSeq();
}
