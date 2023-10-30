export const before = (taskResult, options, backend) => {
  Cypress.config("taskTimeout", 7 * 60 * 1000);
  cy.task("setupBackend", { backend, options }).then((data) => {
    taskResult.data = data;
  });
};

export const after = (taskResult, backend) => {
  cy.task("teardownBackend", {
    backend,
    ...taskResult.data,
  });
};

export const beforeEach = (taskResult, backend) => {
  const spec = Cypress.mocha.getRunner().suite.ctx.currentTest.parent.title;
  const testName = Cypress.mocha.getRunner().suite.ctx.currentTest.title;
  cy.task("setupBackendTest", {
    backend,
    ...taskResult.data,
    spec,
    testName,
  });
};

export const afterEach = (taskResult, backend) => {
  const spec = Cypress.mocha.getRunner().suite.ctx.currentTest.parent.title;
  const testName = Cypress.mocha.getRunner().suite.ctx.currentTest.title;

  cy.task("teardownBackendTest", {
    backend,
    ...taskResult.data,
    spec,
    testName,
  });

  const {
    suite: {
      ctx: {
        currentTest: { state, _retries: retries, _currentRetry: currentRetry },
      },
    },
  } = Cypress.mocha.getRunner();
  if (state === "failed" && retries === currentRetry) {
    Cypress.runner.stop();
  }
};

export const seedRepo = (taskResult, backend) => {
  cy.task("seedRepo", {
    backend,
    ...taskResult.data,
  });
};
