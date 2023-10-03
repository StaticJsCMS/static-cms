import { WorkflowStatus } from '@staticcms/core/constants/publishModes';
import { CMS_BRANCH_PREFIX } from '@staticcms/core/lib/util/APIUtils';
import API from '../API';

global.fetch = jest.fn().mockRejectedValue(new Error('should not call fetch inside tests'));

describe('bitbucket API', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('should get preview statuses', async () => {
    const api = new API({
      squashMerges: false,
      initialWorkflowStatus: WorkflowStatus.DRAFT,
      cmsLabelPrefix: CMS_BRANCH_PREFIX,
    });

    const pr = { id: 1 };
    const statuses = [
      { key: 'deploy', state: 'SUCCESSFUL', url: 'deploy-url' },
      { key: 'build', state: 'FAILED' },
    ];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (api as any).getBranchPullRequest = jest.fn(() => Promise.resolve(pr));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (api as any).getPullRequestStatuses = jest.fn(() => Promise.resolve(statuses));

    const collectionName = 'posts';
    const slug = 'title';
    await expect(api.getStatuses(collectionName, slug)).resolves.toEqual([
      { context: 'deploy', state: 'success', target_url: 'deploy-url' },
      { context: 'build', state: 'other' },
    ]);

    expect(api.getBranchPullRequest).toHaveBeenCalledTimes(1);
    expect(api.getBranchPullRequest).toHaveBeenCalledWith(`cms/posts/title`);

    expect(api.getPullRequestStatuses).toHaveBeenCalledTimes(1);
    expect(api.getPullRequestStatuses).toHaveBeenCalledWith(pr);
  });
});
