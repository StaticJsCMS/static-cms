import React, { useMemo } from 'react';

import { WorkflowStatus } from '@staticcms/core/constants/publishModes';
import useTranslate from '@staticcms/core/lib/hooks/useTranslate';
import Pill from '../common/pill/Pill';

import type { FC } from 'react';
import type { PillProps } from '../common/pill/Pill';

export interface WorkflowStatusPillProps {
  status: WorkflowStatus | undefined;
  className?: string;
}

const WorkflowStatusPill: FC<WorkflowStatusPillProps> = ({ status, className }) => {
  const t = useTranslate();

  const [label, color]: [string, PillProps['color']] = useMemo(() => {
    switch (status) {
      case WorkflowStatus.DRAFT:
        return [t('editor.editorToolbar.draft'), 'info'];
      case WorkflowStatus.PENDING_REVIEW:
        return [t('editor.editorToolbar.inReview'), 'warning'];
      case WorkflowStatus.PENDING_PUBLISH:
        return [t('editor.editorToolbar.ready'), 'success'];
      default:
        return [t('editor.editorToolbar.published'), 'default'];
    }
  }, [status, t]);

  return (
    <Pill color={color} className={className}>
      {label}
    </Pill>
  );
};

export default WorkflowStatusPill;
