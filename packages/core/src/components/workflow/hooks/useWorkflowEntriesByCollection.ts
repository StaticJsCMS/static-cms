import { useMemo } from 'react';

import { selectUnpublishedEntries } from '@staticcms/core/reducers/selectors/editorialWorkflow';
import { useAppSelector } from '@staticcms/core/store/hooks';

import type { WorkflowStatus } from '@staticcms/core/constants/publishModes';
import type { Entry } from '@staticcms/core';

export type BoardEntry = Entry & { boardStatus: WorkflowStatus };

export default function useWorkflowEntriesByCollection(status: WorkflowStatus) {
  const entries = useAppSelector(selectUnpublishedEntries);

  return useMemo(
    () => Object.values(entries).filter(entry => entry.status === status),
    [entries, status],
  );
}
