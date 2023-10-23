import {
  login,
  createPostAndExit,
  updateExistingPostAndExit,
  goToWorkflow,
  deleteWorkflowEntry,
  updateWorkflowStatus,
  publishWorkflowEntry,
} from '../../utils/steps';
import { workflowStatus } from '../../utils/constants';

export default function({ entries, getUser, getForkUser }) {
  it('successfully loads', () => {
    login({ user: getUser() });
  });

  it('can create an entry', () => {
    login({ user: getUser() });
    createPostAndExit(entries[0]);
  });

  it('can update an entry', () => {
    login({ user: getUser() });
    createPostAndExit(entries[0]);
    updateExistingPostAndExit(entries[0], entries[1]);
  });

  it('can publish an editorial workflow entry', () => {
    login({ user: getUser() });
    createPostAndExit(entries[0]);
    goToWorkflow();
    updateWorkflowStatus(entries[0], workflowStatus.draft, workflowStatus.ready);
    publishWorkflowEntry(entries[0]);
  });

  it('successfully forks repository and loads', () => {
    login({ user: getForkUser() });
  });

  it('can create an entry on fork', () => {
    login({ user: getForkUser() });
    createPostAndExit(entries[0]);
  });

  it('can update a draft entry on fork', () => {
    login({ user: getForkUser() });
    createPostAndExit(entries[0]);
    updateExistingPostAndExit(entries[0], entries[1]);
  });

  it('can change entry status from fork', () => {
    login({ user: getForkUser() });
    createPostAndExit(entries[0]);
    goToWorkflow();
    updateWorkflowStatus(entries[0], workflowStatus.draft, workflowStatus.review);
  });

  it('can delete review entry from fork', () => {
    login({ user: getForkUser() });
    createPostAndExit(entries[0]);
    goToWorkflow();
    updateWorkflowStatus(entries[0], workflowStatus.draft, workflowStatus.review);
    deleteWorkflowEntry(entries[0]);
  });

  it('can return entry to draft and delete it', () => {
    login({ user: getForkUser() });
    createPostAndExit(entries[0]);
    goToWorkflow();
    updateWorkflowStatus(entries[0], workflowStatus.draft, workflowStatus.review);

    updateWorkflowStatus(entries[0], workflowStatus.review, workflowStatus.draft);
    deleteWorkflowEntry(entries[0]);
  });
}
