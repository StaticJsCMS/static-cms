import { login } from '../utils/steps';

const filter = (term: string) => {
  cy.get('[data-testid="filter-by"]').click();
  cy.get(`[data-testid="filter-by-option-${term}"]`).click();
};

const assertEntriesCount = (count: number) => {
  cy.get('[class*=CMS_Entries_entry-listing-table-row]').should('have.length', count);
};

describe('View Filter', () => {
  before(() => {
    Cypress.config('defaultCommandTimeout', 4000);
    cy.task('setupBackend', { backend: 'test' });
  });

  after(() => {
    cy.task('teardownBackend', { backend: 'test' });
  });

  beforeEach(() => {
    login();
  });

  it('can apply string filter', () => {
    // enable filter
    filter('Posts With Index');

    assertEntriesCount(20);

    // disable filter
    filter('Posts With Index');
  });

  it('can apply boolean filter', () => {
    // enable filter
    filter('Drafts');

    assertEntriesCount(10);

    // disable filter
    filter('Drafts');

    assertEntriesCount(23);
  });

  it('can apply multiple filters', () => {
    // enable filter
    filter('Posts Without Index');

    assertEntriesCount(3);

    filter('Drafts');

    assertEntriesCount(0);

    cy.contains('div', 'No Entries');
  });
});
