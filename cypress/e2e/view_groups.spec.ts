import { login } from '../utils/steps';

const group = (term: string) => {
  cy.get('[data-testid="group-by"]').click();
  cy.get(`[data-testid="group-by-option-${term}"]`).click();
};

const assertGroupsCount = (count: number) => {
  cy.get('[class*=CMS_Entries_group-button]').should('have.length', count);
};

const assertEachGroupCount = (name: string, count: number) => {
  cy.get(`[data-testid="group-by-${name}"]`).click();
  assertEntriesCount(count);
};

const assertEntriesCount = (count: number) => {
  cy.get('[class*=CMS_Entries_entry-listing-table-row]').should('have.length', count);
};

describe('View Group', () => {
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

  it('can apply string group', () => {
    // enable group
    group('Year');

    assertGroupsCount(2);
    const year = new Date().getFullYear();
    assertEachGroupCount(`Year ${year}`, 20);
    assertEachGroupCount('Year 2015', 3);

    //disable group
    group('Year');

    assertEntriesCount(23);

    //enable group
    group('Drafts');

    assertGroupsCount(3);

    assertEachGroupCount('Drafts', 10);
    assertEachGroupCount('Not Drafts', 10);
    assertEachGroupCount('Other', 3);
  });
});
