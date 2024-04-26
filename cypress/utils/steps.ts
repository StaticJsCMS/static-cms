import 'cypress-real-events';
import { format } from 'date-fns/format';

import { editorStatus, notifications, publishTypes, workflowStatus } from './constants';

import { WorkflowStatus } from '@staticcms/core/constants/publishModes';
import type { Author, Post, User } from '../interface';

export interface LoginProps {
  user?: User;
  editorialWorkflow?: boolean;
}

export function login(options?: LoginProps) {
  const { user, editorialWorkflow = false } = options ?? {};

  cy.viewport(1200, 1200);
  if (user) {
    cy.visit('/', {
      onBeforeLoad: () => {
        // https://github.com/cypress-io/cypress/issues/1208
        window.indexedDB.deleteDatabase('localforage');
        window.localStorage.setItem('static-cms-user', JSON.stringify(user));
        if (user.netlifySiteURL) {
          window.localStorage.setItem('netlifySiteURL', user.netlifySiteURL);
        }
      },
    });
    if (user.netlifySiteURL && user.email && user.password) {
      cy.get('input[name="email"]').clear().type(user.email);
      cy.get('input[name="password"]').clear().type(user.password);
      cy.contains('button', 'Login').click();
    }
  } else {
    cy.visit('/');
    cy.contains('button', 'Login').click();
  }

  if (editorialWorkflow) {
    cy.contains('div', 'Editorial Workflow');
  } else {
    cy.contains('a', 'New Post');
  }
}

export function assertNotification(message: string) {
  cy.get('[data-testid="toast-messages"]', { timeout: 10000 })
    .should('be.visible')
    .within(() => {
      cy.contains(message);
      cy.contains(message).invoke('hide');
    });
}

export function exitEditor() {
  cy.get('[data-testid="breadcrumb-link"]').first().click();
}

export function goToWorkflow() {
  cy.get('[data-testid="sidebar-nav-Dashboard"]').click();
}

export function goToMediaLibrary() {
  cy.get('[data-testid="sidebar-nav-Media]').click();
}

export function assertUnpublishedEntryInEditor() {
  cy.contains('button', 'Delete unpublished entry');
}

export function assertPublishedEntryInEditor() {
  cy.contains('button', 'Delete published entry');
}

export function assertUnpublishedChangesInEditor() {
  cy.contains('button', 'Delete unpublished changes');
}

export function goToEntry(entry: Post) {
  cy.contains('a', entry.Title).click();
}

export function updateWorkflowStatus(
  { Title }: Post,
  fromColumnHeading: WorkflowStatus,
  toColumnHeading: WorkflowStatus,
) {
  cy.get(`[data-testid="drop-zone-${fromColumnHeading}"]`).within(() => {
    cy.get(`[data-testid="drag-handle-${Title}"]`).dragTo(
      `[data-testid="drop-zone-${toColumnHeading}"]`,
    );
  });

  assertNotification(notifications.updated);
}

export function publishWorkflowEntry({ Title }: Post, timeout = 3000) {
  cy.get(`[data-testid="drop-zone-${WorkflowStatus.PENDING_PUBLISH}"]`).within(() => {
    cy.get(`[data-testid="drag-handle-${Title}"]`, { timeout })
      .realHover()
      .within(() => {
        cy.get('[data-testid="workflow-dashboard-publish"]').click();
      });
  });

  cy.get('[data-testid="confirm-button"]').click();

  assertNotification(notifications.published);
}

export function deleteWorkflowEntry({ Title }: Post) {
  cy.contains('a', Title)
    .parent()
    .within(() => {
      cy.contains('button', 'Delete new entry').click({ force: true });
    });

  assertNotification(notifications.deletedUnpublished);
}

const STATUS_BUTTON_TEXT = 'Status:';

export function assertWorkflowStatusInEditor(status: string) {
  cy.contains('button', STATUS_BUTTON_TEXT).as('setStatusButton');
  cy.get('@setStatusButton').click();
  cy.contains('[role="menuitem"] div', status)
    .parent()
    .within(() => {
      cy.get('svg');
    });
  cy.get('@setStatusButton').click();
}

export function assertPublishedEntry(entry: Post | Post[]) {
  if (Array.isArray(entry)) {
    const entries = entry.reverse();
    cy.wrap(entry.slice(0, entries.length)).each((_el, idx) => {
      cy.contains('a', entries[idx].Title);
    });
  } else {
    cy.contains('a', entry.Title);
  }
}

export function deleteEntryInEditor() {
  cy.contains('button', 'Delete').click();
  assertNotification(notifications.deletedUnpublished);
}

export function assertOnCollectionsPage() {
  cy.url().should('contain', '/#/collections/posts');
}

export function assertEntryDeleted(entry: Post) {
  cy.get('body').then($body => {
    const entriesHeaders = $body.find('a');
    if (entriesHeaders.length > 0) {
      if (Array.isArray(entry)) {
        const titles = entry.map(e => e.title);
        cy.get('a').each(el => {
          expect(titles).not.to.include(el.text());
        });
      } else {
        cy.get('a').each(el => {
          expect(entry.Title).not.to.equal(el.text());
        });
      }
    }
  });
}

export function assertWorkflowStatus({ Title }: Post, status: string) {
  cy.contains('h2', status).parent().contains('a', Title);
}

export function updateWorkflowStatusInEditor(newStatus: string) {
  selectDropdownItem(STATUS_BUTTON_TEXT, newStatus);
  assertNotification(notifications.updated);
}

export function publishEntryInEditor(publishType: string) {
  selectDropdownItem('Publish', publishType);
  assertNotification(notifications.published);
}

export function publishAndCreateNewEntryInEditor() {
  selectDropdownItem('Publish', publishTypes.publishAndCreateNew);
  assertNotification(notifications.published);
  cy.url().should('eq', `http://localhost:8080/#/collections/posts/new`);
  cy.get('[data-testid="field-Title"]').should('have.value', '');
}

export function publishAndDuplicateEntryInEditor(entry: Post) {
  selectDropdownItem('Publish', publishTypes.publishAndDuplicate);
  assertNotification(notifications.published);
  cy.url().should('eq', `http://localhost:8080/#/collections/posts/new`);
  cy.get('[data-testid="field-Title"]').should('have.value', entry.Title);
}

function selectDropdownItem(label: string, item: string) {
  cy.contains('button', label).click();
  cy.contains('[role="menuitem"] div', item).click();
}

function flushClockAndSave() {
  cy.wait(260);

  cy.contains('button', 'Save').should('not.be.disabled').click();

  assertNotification(notifications.saved);
}

export function populateEntry(entry: Post, onDone = flushClockAndSave) {
  const keys = Object.keys(entry) as (keyof Post)[];
  for (const key of keys) {
    const value = entry[key];
    if (key === 'Body') {
      cy.getMarkdownEditor().click().clear({ force: true }).type(value, { force: true });
      cy.getMarkdownEditor().first().click().clear({ force: true }).type(value, { force: true });
    } else {
      cy.get(`[data-testid="field-${key}"]`).click();
      cy.focused().clear({ force: true });
      cy.focused().type(value, { force: true });
    }
  }

  onDone();
}

function newPost() {
  cy.contains('a', 'New Post').click();
}

export function createPost(entry: Post) {
  newPost();
  populateEntry(entry);
}

export function createPostAndExit(entry: Post) {
  createPost(entry);
  exitEditor();
}

function publishEntry({ createNew = false, duplicate = false } = {}) {
  cy.wait(500);

  if (createNew) {
    selectDropdownItem('Publish', publishTypes.publishAndCreateNew);
  } else if (duplicate) {
    selectDropdownItem('Publish', publishTypes.publishAndDuplicate);
  } else {
    selectDropdownItem('Publish', publishTypes.publishNow);
  }

  assertNotification(notifications.saved);

  // eslint-disable-next-line cypress/no-unnecessary-waiting
  cy.wait(500);
}

export function createPostAndPublish(entry: Post) {
  newPost();
  populateEntry(entry, publishEntry);
  exitEditor();
}

export function createPostPublishAndCreateNew(entry: Post) {
  newPost();
  populateEntry(entry, () => publishEntry({ createNew: true }));
  cy.url().should('eq', `http://localhost:8080/#/collections/posts/new`);

  cy.get('[data-testid="field-Title"] input').should('have.value', '');

  exitEditor();
}

export function createPostPublishAndDuplicate(entry: Post) {
  newPost();
  populateEntry(entry, () => publishEntry({ duplicate: true }));
  cy.url().should('eq', `http://localhost:8080/#/collections/posts/new?duplicate=true`);
  cy.get('[data-testid="field-Title"] input').should('have.value', entry.Title);

  exitEditor();
}

export function editPostAndPublish(entry1: Post, entry2: Post) {
  goToEntry(entry1);
  cy.wait(1000);
  cy.get('[data-testid="editor-extra-menu"]', { timeout: 5000 }).should('be.enabled');
  cy.get('[data-testid="editor-extra-menu"]').click();
  cy.get('[data-testid="delete-button"]');
  cy.contains('[data-testid="publish-dropdown"]', 'Published');

  populateEntry(entry2, publishEntry);
  // existing entry slug should remain the same after save
  cy.url().should(
    'eq',
    `http://localhost:8080/#/collections/posts/entries/${format(
      new Date(),
      'yyyy-MM-dd',
    )}-${entry1.Title.toLowerCase().replace(/\s/, '-')}`,
  );
}

export function editPostPublishAndCreateNew(entry1: Post, entry2: Post) {
  goToEntry(entry1);
  cy.wait(1000);
  cy.get('[data-testid="editor-extra-menu"]', { timeout: 5000 }).should('be.enabled');
  cy.get('[data-testid="editor-extra-menu"]').click();
  cy.get('[data-testid="delete-button"]');
  cy.contains('[data-testid="publish-dropdown"]', 'Published');

  populateEntry(entry2, () => publishEntry({ createNew: true }));
  cy.url().should('eq', `http://localhost:8080/#/collections/posts/new`);
  cy.get('[data-testid="field-Title"] input').should('have.value', '');
}

export function editPostPublishAndDuplicate(entry1: Post, entry2: Post) {
  goToEntry(entry1);
  cy.wait(1000);
  cy.get('[data-testid="editor-extra-menu"]', { timeout: 5000 }).should('be.enabled');
  cy.get('[data-testid="editor-extra-menu"]').click();
  cy.get('[data-testid="delete-button"]');
  cy.contains('[data-testid="publish-dropdown"]', 'Published');

  populateEntry(entry2, () => publishEntry({ duplicate: true }));
  cy.url().should('eq', `http://localhost:8080/#/collections/posts/new?duplicate=true`);
  cy.get('[data-testid="field-Title"] input').should('have.value', entry2.Title);
}

export function duplicatePostAndPublish(entry1: Post) {
  goToEntry(entry1);
  cy.wait(1000);
  cy.get('[data-testid="editor-extra-menu"]', { timeout: 5000 }).should('be.enabled');
  cy.get('[data-testid="editor-extra-menu"]').click();
  cy.get('[data-testid="delete-button"]');
  selectDropdownItem('Published', 'Duplicate');
  publishEntry();

  cy.url().should(
    'eq',
    `http://localhost:8080/#/collections/posts/entries/${format(
      new Date(),
      'yyyy-MM-dd',
    )}-${entry1.Title.toLowerCase().replace(/\s/, '-')}-1`,
  );
}

export function updateExistingPostAndExit(fromEntry: Post, toEntry: Post) {
  goToWorkflow();
  cy.contains('a', fromEntry.Title).click({ force: true });
  populateEntry(toEntry);
  exitEditor();
  goToWorkflow();
  cy.contains('a', toEntry.Title);
}

export function unpublishEntry(entry: Post) {
  cy.contains('a', entry.Title).click({ force: true });
  selectDropdownItem('Published', 'Unpublish');
  assertNotification(notifications.unpublished);
  goToWorkflow();
  assertWorkflowStatus(entry, workflowStatus.ready);
}

export function duplicateEntry(entry: Post) {
  selectDropdownItem('Published', 'Duplicate');
  cy.url().should('contain', '/#/collections/posts/new?duplicate=true');
  flushClockAndSave();
  updateWorkflowStatusInEditor(editorStatus.ready);
  publishEntryInEditor(publishTypes.publishNow);
  exitEditor();
  cy.get('a').should($h2s => {
    expect($h2s.eq(0)).to.contain(entry.Title);
    expect($h2s.eq(1)).to.contain(entry.Title);
  });
}

export interface ValidateObjectFieldsProps {
  limit: string;
  author: string;
}

function validateObjectFields({ limit, author }: ValidateObjectFieldsProps) {
  cy.contains('a', 'Settings').click();
  cy.contains('a', 'Site Settings').click();

  discardDraft();

  cy.contains('label', 'Number of posts on frontpage').click();
  cy.focused().type(limit);
  flushClockAndSave();
  assertNotification(notifications.error.missingField);
  cy.get('[data-testid="field-Default Author"]').should('have.class', 'CMS_Field_error');
  cy.contains('label', 'Default Author').click();
  cy.focused().type(author);
  flushClockAndSave();
  assertNotification(notifications.saved);
  cy.get('[data-testid="field-Default Author"]').should('not.have.class', 'CMS_Field_error');
}

function validateNestedObjectFields({ limit, author }: ValidateObjectFieldsProps) {
  cy.contains('a', 'Settings').click();
  cy.contains('a', 'Site Settings').click();

  discardDraft();

  cy.contains('label', 'Default Author').click();
  cy.focused().type(author);
  flushClockAndSave();
  assertNotification(notifications.error.missingField);
  cy.get('input[type=number]').type(limit + 1);
  flushClockAndSave();
  assertFieldValidationError(notifications.validation.range);
  cy.get('input[type=number]').clear().type('-1');
  flushClockAndSave();
  assertFieldValidationError(notifications.validation.range);
  cy.get('input[type=number]').clear().type(limit);
  flushClockAndSave();
  assertNotification(notifications.saved);
}

function validateListFields({ name, description }: Author) {
  cy.contains('a', 'Settings').click();
  cy.contains('a', 'Authors').click();

  discardDraft();

  cy.contains('button', 'Add').click();
  flushClockAndSave();
  assertNotification(notifications.error.missingField);
  cy.get('[data-testid="list-field-Authors"]').should('have.class', 'CMS_WidgetList_error');
  cy.get('[data-testid="list-item-field-Author"]').eq(2).as('listControl');
  cy.get('@listControl').should('have.class', 'CMS_WidgetList_ListItem_error');
  cy.get('@listControl').get('[data-testid="field-Name"]').should('have.class', 'CMS_Field_error');
  cy.get('input').eq(2).type(name);
  cy.get('textarea').eq(2).type(description);
  flushClockAndSave();
  assertNotification(notifications.saved);
  cy.get('[data-testid="list-field-Authors"]').should('not.have.class', 'CMS_WidgetList_error');
}

function validateNestedListFields() {
  cy.contains('a', 'Settings').click();
  cy.contains('a', 'Hotel Locations').click();

  discardDraft();

  // add first city list item
  cy.contains('button', 'Add Hotel Locations').click();
  cy.contains('button', 'Add Cities').click();
  cy.contains('label', 'City').next().type('Washington DC');
  cy.contains('label', 'Number of Hotels in City').next().type('5');
  cy.contains('button', 'Add City Locations').click();
  cy.get('[data-testid="field-Hotel Name"]').should('exist');

  // add second city list item
  cy.contains('button', 'Add Cities').click();

  cy.get('[data-testid="list-item-field-Cities"]')
    .eq(0)
    .within(() => {});
  cy.get('[data-testid="list-item-field-Cities"]').eq(1).as('secondCitiesListControl');

  cy.get('@secondCitiesListControl').contains('label', 'City').next().type('Boston');
  cy.get('@secondCitiesListControl').contains('button', 'Add City Locations').click();

  flushClockAndSave();
  assertNotification(notifications.error.missingField);

  // assert on fields
  cy.get('[data-testid="list-field-Hotel Locations"]').should('have.class', 'CMS_WidgetList_error');
  cy.get('[data-testid="list-item-field-Cities"]').should(
    'have.class',
    'CMS_WidgetList_ListItem_error',
  );

  cy.get('[data-testid="list-item-field-Cities"]')
    .eq(0)
    .within(() => {
      cy.get('[data-testid="field-City"]').should('not.have.class', 'CMS_Field_error');
      cy.get('[data-testid="field-Number of Hotels in City"]').should(
        'not.have.class',
        'CMS_Field_error',
      );
      cy.get('[data-testid="list-field-City Locations"]').should(
        'have.class',
        'CMS_WidgetList_error',
      );
      cy.get('[data-testid="field-Hotel Name"]').should('have.class', 'CMS_Field_error');
    });

  cy.get('[data-testid="list-item-field-Cities"]')
    .eq(1)
    .within(() => {
      cy.get('[data-testid="field-City"]').should('not.have.class', 'CMS_Field_error');
      cy.get('[data-testid="field-Number of Hotels in City"]').should(
        'have.class',
        'CMS_Field_error',
      );
      cy.get('[data-testid="list-field-City Locations"]').should(
        'have.class',
        'CMS_WidgetList_error',
      );
      cy.get('[data-testid="field-Hotel Name"]').should('have.class', 'CMS_Field_error');
    });

  // list control aliases
  cy.contains('label', 'Hotel Name').next().type('The Ritz Carlton');
  flushClockAndSave();
  assertNotification(notifications.error.missingField);

  // fill out rest of form and save
  cy.get('@secondCitiesListControl').contains('label', 'Number of Hotels in City').type('3');
  cy.get('@secondCitiesListControl').contains('label', 'Hotel Name').type('Grand Hyatt');
  cy.contains('label', 'Country').next().type('United States');
  flushClockAndSave();
  assertNotification(notifications.saved);
}

export function validateObjectFieldsAndExit(setting: ValidateObjectFieldsProps) {
  validateObjectFields(setting);
  exitEditor();
}

export function validateNestedObjectFieldsAndExit(setting: ValidateObjectFieldsProps) {
  validateNestedObjectFields(setting);
  exitEditor();
}

export function validateListFieldsAndExit(setting: Author) {
  validateListFields(setting);
  exitEditor();
}

export function validateNestedListFieldsAndExit() {
  validateNestedListFields();
  exitEditor();
}

export interface AssertFieldValidationErrorProps {
  message: string;
  fieldLabel: string;
}

export function assertFieldValidationError({
  message,
  fieldLabel,
}: AssertFieldValidationErrorProps) {
  cy.contains('label', fieldLabel).siblings('[data-testid="error"]').contains(message);
  cy.get(`[data-testid="field-${fieldLabel}"]`).should('have.class', 'CMS_Field_error');
}

function discardDraft() {
  cy.get('[data-testid="editor-extra-menu"]', { timeout: 5000 })
    .should(_ => {})
    .then($el => {
      if ($el.length) {
        cy.wait(1000);
        cy.get('[data-testid="editor-extra-menu"]', { timeout: 5000 }).should('be.enabled');
        cy.get('[data-testid="editor-extra-menu"]').click();
        cy.get('[data-testid="discard-button"]')
          .should(_ => {})
          .then($el => {
            if ($el.length) {
              $el.trigger('click');
              cy.get('[data-testid="confirm-button"]').click();
            }
          });
      }
    });
}
