/// <reference types="cypress" />

import type { SetupBackendProps, SetupBackendResponse } from './interface';

declare global {
  namespace Cypress {
    interface Chainable {
      task(event: 'setupBackend', props: SetupBackendProps): Chainable<SetupBackendResponse>;
      task(event: 'setupBackendTest', props: SetupBackendTestProps): Chainable<Promise<null>>;
      task(event: 'seedRepo', props: SeedRepoProps): Chainable<Promise<null>>;
      task(event: 'teardownBackendTest', props: TeardownBackendTestProps): Chainable<Promise<null>>;
      task(event: 'teardownBackend', props: TeardownBackendProps): Chainable<Promise<null>>;

      drag(): Chainable<void>;
      drop(): Chainable<void>;
      getMarkdownEditor(): Chainable<void>;
    }
  }
}
