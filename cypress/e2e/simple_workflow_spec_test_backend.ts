import { TaskResult } from '../interface';
import fixture from './common/simple_workflow';
import * as specUtils from './common/spec_utils';

const backend = 'test';

describe('Test Backend Simple Workflow', () => {
  const taskResult: TaskResult = { data: {} };

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

  fixture();
});
