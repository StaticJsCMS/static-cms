import fixture from './common/simple_workflow';
import * as specUtils from './common/spec_utils';

const backend = 'bitbucket';

describe('BitBucket Backend Simple Workflow', () => {
  let taskResult = { data: {} };

  before(() => {
    specUtils.before(taskResult, { publish_mode: 'simple' }, backend);
  });

  after(() => {
    specUtils.after(backend);
  });

  beforeEach(() => {
    specUtils.beforeEach(backend);
  });

  afterEach(() => {
    specUtils.afterEach(backend);
  });

  fixture({
    getUser: () => taskResult.data.user,
  });
});
