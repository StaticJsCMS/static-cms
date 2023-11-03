import type { Config } from '@staticcms/core/interface';
import type { TaskResult } from 'cypress/interface';

export const before = (taskResult: TaskResult, options: Partial<Config>, backend: string) => {
  Cypress.config('taskTimeout', 7 * 60 * 1000);
  cy.task('setupBackend', { backend, options }).then(data => {
    taskResult.data = data;
  });
};

export const after = (backend: string) => {
  cy.task('teardownBackend', {
    backend,
  });
};

export const beforeEach = (backend: string) => {
  cy.task('setupBackendTest', {
    backend,
    testName: Cypress.currentTest.title,
  });
};

export const afterEach = (backend: string) => {
  cy.task('teardownBackendTest', {
    backend,
    testName: Cypress.currentTest.title,
  });

  const {
    suite: {
      ctx: {
        currentTest: { state, _retries: retries, _currentRetry: currentRetry },
      },
    },
  } = (Cypress as any).mocha.getRunner();

  if (state === 'failed' && retries === currentRetry) {
    (Cypress as any).runner.stop();
  }
};

export const seedRepo = (backend: string) => {
  cy.task('seedRepo', {
    backend,
  });
};
