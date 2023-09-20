// Create/edit workflow modes
export const SIMPLE = 'simple';
export const EDITORIAL_WORKFLOW = 'editorial_workflow';

export type Workflow = typeof SIMPLE | typeof EDITORIAL_WORKFLOW;

export const STATUSES = {
  DRAFT: 'draft',
  PENDING_REVIEW: 'pending_review',
  PENDING_PUBLISH: 'pending_publish',
};

export const STATUS_DESCRIPTIONS = {
  [STATUSES.DRAFT]: 'Draft',
  [STATUSES.PENDING_REVIEW]: 'Waiting for Review',
  [STATUSES.PENDING_PUBLISH]: 'Waiting to go live',
};

export type Status = keyof typeof STATUSES;
