import { useEffect, useMemo, useState } from 'react';

import { WorkflowStatus } from '@staticcms/core/constants/publishModes';
import { selectUnpublishedEntries } from '@staticcms/core/reducers/selectors/editorialWorkflow';
import { useAppSelector } from '@staticcms/core/store/hooks';

import type { Entry } from '@staticcms/core/interface';

export type BoardEntry = Entry & { boardStatus: WorkflowStatus };

export default function useWorkflowBoardSections() {
  const [boardSections, setBoardSections] = useState<Record<WorkflowStatus, Entry[]>>({
    [WorkflowStatus.DRAFT]: [],
    [WorkflowStatus.PENDING_REVIEW]: [],
    [WorkflowStatus.PENDING_PUBLISH]: [],
  });

  const rawEntries = useAppSelector(selectUnpublishedEntries);

  const entriesById = useMemo(
    () =>
      (Object.keys(boardSections) as WorkflowStatus[])
        .reduce((acc, status) => {
          acc.push(
            ...boardSections[status].map(e => ({
              ...e,
              boardStatus: status,
            })),
          );
          return acc;
        }, [] as BoardEntry[])
        .reduce((acc, entry) => {
          acc[`${entry.collection}|${entry.slug}`] = entry;
          return acc;
        }, {} as Record<string, BoardEntry>),
    [boardSections],
  );

  useEffect(() => {
    console.log('updating board sections!!!');
    setBoardSections(
      Object.values(rawEntries).reduce(
        (acc, entry) => {
          if (entry.status) {
            acc[entry.status].push(entry);
          }
          return acc;
        },
        {
          [WorkflowStatus.DRAFT]: [],
          [WorkflowStatus.PENDING_REVIEW]: [],
          [WorkflowStatus.PENDING_PUBLISH]: [],
        } as Record<WorkflowStatus, Entry[]>,
      ),
    );
  }, [rawEntries]);

  console.log('returning board sections');
  return { boardSections, entriesById, setBoardSections };
}
