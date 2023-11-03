import fixture from './common/simple_workflow';
import * as specUtils from './common/spec_utils';

const backend = 'test';

describe('Test Backend Simple Workflow', () => {
  let taskResult = { data: {} };

  before(() => {
    specUtils.before(taskResult, { publish_mode: 'simple' }, backend);
  });

  after(() => {
    specUtils.after(taskResult, backend);
  });

  beforeEach(() => {
    specUtils.beforeEach(taskResult, backend);
  });

  afterEach(() => {
    specUtils.afterEach(taskResult, backend);
  });

  fixture({
    getUser: () => taskResult.data.user,
  });
});
