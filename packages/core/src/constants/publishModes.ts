// Create/edit workflow modes
export const SIMPLE = 'simple';
export const EDITORIAL_WORKFLOW = 'editorial_workflow';

export type Workflow = typeof SIMPLE | typeof EDITORIAL_WORKFLOW;

export enum WorkflowStatus {
  DRAFT = 'draft',
  PENDING_REVIEW = 'pending_review',
  PENDING_PUBLISH = 'pending_publish',
}

export const STATUS_DESCRIPTIONS: Record<WorkflowStatus, string> = {
  [WorkflowStatus.DRAFT]: 'Draft',
  [WorkflowStatus.PENDING_REVIEW]: 'Waiting for Review',
  [WorkflowStatus.PENDING_PUBLISH]: 'Waiting to go live',
};
