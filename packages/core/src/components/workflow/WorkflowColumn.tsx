import { useDroppable } from '@dnd-kit/core';
import React from 'react';

import useTranslate from '@staticcms/core/lib/hooks/useTranslate';
import classNames from '@staticcms/core/lib/util/classNames.util';
import { generateClassNames } from '@staticcms/core/lib/util/theming.util';
import WorkflowCard from './WorkflowCard';

import type { WorkflowStatus } from '@staticcms/core/constants/publishModes';
import type { Entry } from '@staticcms/core/interface';
import type { FC } from 'react';

import './WorkflowColumn.css';

const classes = generateClassNames('WorkflowColumn', [
  'root',
  'dragging',
  'over',
  'content',
  'header',
  'draft',
  'pending_review',
  'pending_publish',
]);

interface WorkflowColumnProps {
  entries: Entry[];
  status: WorkflowStatus;
  dragging: boolean;
}

const WorkflowColumn: FC<WorkflowColumnProps> = ({ entries, status, dragging }) => {
  const t = useTranslate();

  const { isOver, setNodeRef } = useDroppable({
    id: status,
  });

  return (
    <div
      ref={setNodeRef}
      className={classNames(classes.root, dragging && classes.dragging, isOver && classes.over)}
      aria-label="droppable region draft"
    >
      <div className={classNames(classes.header, classes[status])}>
        {t(`workflow.workflowList.${status}`)}
      </div>
      <div className={classes.content}>
        {entries.map(e => (
          <WorkflowCard key={`${e.collection}|${e.slug}`} entry={e} />
        ))}
      </div>
    </div>
  );
};

export default WorkflowColumn;
