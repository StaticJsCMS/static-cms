import { format } from 'date-fns/format';

import { WorkflowStatus } from '@staticcms/core/constants/publishModes';
import { editorStatus, notifications, publishTypes } from '../utils/constants';
import {
  assertEntryDeleted,
  assertFieldValidationError,
  assertNotification,
  assertOnCollectionsPage,
  assertPublishedEntry,
  assertWorkflowStatus,
  assertWorkflowStatusInEditor,
  createPost,
  createPostAndExit,
  deleteEntryInEditor,
  duplicateEntry,
  exitEditor,
  goToEntry,
  goToWorkflow,
  login,
  populateEntry,
  publishAndCreateNewEntryInEditor,
  publishAndDuplicateEntryInEditor,
  publishEntryInEditor,
  publishWorkflowEntry,
  unpublishEntry,
  updateWorkflowStatus,
  updateWorkflowStatusInEditor,
} from '../utils/steps';
import {
  entry1,
  entry10,
  entry11,
  entry12,
  entry13,
  entry14,
  entry15,
  entry2,
  entry3,
  entry4,
  entry5,
  entry6,
  entry7,
  entry8,
  entry9,
} from './common/entries';

describe('Test Backend Editorial Workflow', () => {
  after(() => {
    cy.task('teardownBackend', { backend: 'test' });
  });

  before(() => {
    Cypress.config('defaultCommandTimeout', 4000);
    cy.task('setupBackend', { backend: 'test' });
  });

  beforeEach(() => {
    cy.task('updateConfig', {
      collections: [{ publish: true }],
      publish_mode: 'editorial_workflow',
    });
  });

  it('successfully loads', () => {
    login({ editorialWorkflow: true });
  });

  it('can create an entry', () => {
    login({ editorialWorkflow: true });

    cy.get('[data-testid="sidebar-collection-nav-Posts').click();

    createPost(entry1);

    // new entry should show 'Delete unpublished entry'
    cy.wait(1000);
    cy.get('[data-testid="editor-extra-menu"]', { timeout: 5000 }).should('be.enabled');
    cy.get('[data-testid="editor-extra-menu"]').click();
    cy.contains('[data-testid="delete-button"]', 'Delete unpublished entry');
    cy.url().should(
      'eq',
      `http://localhost:8080/#/collections/posts/entries/${format(
        new Date(),
        'yyyy-MM-dd',
      )}-${entry1.Title.toLowerCase().replace(/\s/, '-')}`,
    );
    exitEditor();
  });

  it.only('can publish an editorial workflow entry', () => {
    login({ editorialWorkflow: true });

    cy.get('[data-testid="sidebar-collection-nav-Posts').click();

    createPostAndExit(entry2);
    goToWorkflow();
    updateWorkflowStatus(entry2, WorkflowStatus.DRAFT, WorkflowStatus.PENDING_PUBLISH);
    publishWorkflowEntry(entry2);
  });

  it('can update an entry', () => {
    login({ editorialWorkflow: true });

    cy.get('[data-testid="sidebar-collection-nav-Posts').click();

    createPostAndExit(entry3);
    goToWorkflow();
    updateWorkflowStatus(entry3, WorkflowStatus.DRAFT, WorkflowStatus.PENDING_PUBLISH);
    publishWorkflowEntry(entry3);

    goToEntry(entry3);
    populateEntry(entry4);
    // existing entry should show 'Delete unpublished changes'
    cy.contains('button', 'Delete unpublished changes');
    // existing entry slug should remain the same after save'
    cy.url().should(
      'eq',
      `http://localhost:8080/#/collections/posts/entries/${format(
        new Date(),
        'yyyy-MM-dd',
      )}-${entry3.Title.toLowerCase().replace(/\s/, '-')}`,
    );
    exitEditor();
  });

  it('can change workflow status', () => {
    login({ editorialWorkflow: true });

    cy.get('[data-testid="sidebar-collection-nav-Posts').click();

    createPostAndExit(entry5);
    goToWorkflow();
    updateWorkflowStatus(entry5, WorkflowStatus.DRAFT, WorkflowStatus.PENDING_REVIEW);
    updateWorkflowStatus(entry5, WorkflowStatus.PENDING_REVIEW, WorkflowStatus.PENDING_PUBLISH);
    updateWorkflowStatus(entry5, WorkflowStatus.PENDING_PUBLISH, WorkflowStatus.PENDING_REVIEW);
    updateWorkflowStatus(entry5, WorkflowStatus.PENDING_REVIEW, WorkflowStatus.DRAFT);
    updateWorkflowStatus(entry5, WorkflowStatus.DRAFT, WorkflowStatus.PENDING_PUBLISH);
  });

  it('can change status on and publish multiple entries', () => {
    login({ editorialWorkflow: true });

    cy.get('[data-testid="sidebar-collection-nav-Posts').click();

    createPostAndExit(entry6);
    createPostAndExit(entry7);
    createPostAndExit(entry8);
    goToWorkflow();
    updateWorkflowStatus(entry8, WorkflowStatus.DRAFT, WorkflowStatus.PENDING_PUBLISH);
    updateWorkflowStatus(entry7, WorkflowStatus.DRAFT, WorkflowStatus.PENDING_PUBLISH);
    updateWorkflowStatus(entry6, WorkflowStatus.DRAFT, WorkflowStatus.PENDING_PUBLISH);
    publishWorkflowEntry(entry8);
    publishWorkflowEntry(entry7);
    publishWorkflowEntry(entry6);
    assertPublishedEntry([entry8, entry7, entry6]);
  });

  it('can delete an entry', () => {
    login({ editorialWorkflow: true });

    cy.get('[data-testid="sidebar-collection-nav-Posts').click();

    createPost(entry9);
    deleteEntryInEditor();
    assertOnCollectionsPage();
    assertEntryDeleted(entry9);
  });

  it('can update workflow status from within the editor', () => {
    login({ editorialWorkflow: true });

    cy.get('[data-testid="sidebar-collection-nav-Posts').click();

    createPost(entry10);
    assertWorkflowStatusInEditor(editorStatus.draft);
    updateWorkflowStatusInEditor(editorStatus.review);
    assertWorkflowStatusInEditor(editorStatus.review);
    updateWorkflowStatusInEditor(editorStatus.ready);
    assertWorkflowStatusInEditor(editorStatus.ready);
    exitEditor();
    goToWorkflow();
    assertWorkflowStatus(entry10, WorkflowStatus.PENDING_PUBLISH);
  });

  it('can unpublish an existing entry', () => {
    // first publish an entry
    login({ editorialWorkflow: true });

    cy.get('[data-testid="sidebar-collection-nav-Posts').click();

    createPostAndExit(entry11);
    goToWorkflow();
    updateWorkflowStatus(entry11, WorkflowStatus.DRAFT, WorkflowStatus.PENDING_PUBLISH);
    publishWorkflowEntry(entry11);
    // then unpublish it
    unpublishEntry(entry11);
  });

  it('can duplicate an existing entry', () => {
    login({ editorialWorkflow: true });

    cy.get('[data-testid="sidebar-collection-nav-Posts').click();

    createPost(entry12);
    updateWorkflowStatusInEditor(editorStatus.ready);
    publishEntryInEditor(publishTypes.publishNow);
    duplicateEntry(entry12);
  });

  it('cannot publish when "publish" is false', () => {
    cy.task('updateConfig', { collections: [{ publish: false }] });
    login({ editorialWorkflow: true });

    cy.get('[data-testid="sidebar-collection-nav-Posts').click();

    createPost(entry13);
    cy.contains('span', 'Publish').should('not.exist');
    exitEditor();
    goToWorkflow();
    updateWorkflowStatus(entry13, WorkflowStatus.DRAFT, WorkflowStatus.PENDING_PUBLISH);
    cy.contains('button', 'Publish new entry').should('not.exist');
  });

  it('can create a new entry, publish and create new', () => {
    login({ editorialWorkflow: true });

    cy.get('[data-testid="sidebar-collection-nav-Posts').click();

    createPost(entry14);
    updateWorkflowStatusInEditor(editorStatus.ready);

    publishAndCreateNewEntryInEditor();
  });

  it('can create a new entry, publish and duplicate', () => {
    login({ editorialWorkflow: true });

    cy.get('[data-testid="sidebar-collection-nav-Posts').click();

    createPost(entry15);
    updateWorkflowStatusInEditor(editorStatus.ready);
    publishAndDuplicateEntryInEditor(entry15);
  });

  const inSidebar = (func: (currentSubject: JQuery<HTMLElement>) => void) => {
    cy.get('[class*=SidebarNavList]').within(func);
  };

  const inGrid = (func: (currentSubject: JQuery<HTMLElement>) => void) => {
    cy.get('[class*=CardsGrid]').within(func);
  };

  it('can access nested collection items', () => {
    login();

    inSidebar(() => cy.contains('a', 'Pages').click());
    inSidebar(() => cy.contains('a', 'Directory'));
    inGrid(() => cy.contains('a', 'Root Page'));
    inGrid(() => cy.contains('a', 'Directory'));

    inSidebar(() => cy.contains('a', 'Directory').click());

    inGrid(() => cy.contains('a', 'Sub Directory'));
    inGrid(() => cy.contains('a', 'Another Sub Directory'));

    inSidebar(() => cy.contains('a', 'Sub Directory').click());
    inGrid(() => cy.contains('a', 'Nested Directory'));
    cy.url().should(
      'eq',
      'http://localhost:8080/#/collections/pages/filter/directory/sub-directory',
    );

    inSidebar(() => cy.contains('a', 'Pages').click());
    inSidebar(() => cy.contains('a', 'Pages').click());

    inGrid(() => cy.contains('a', 'Another Sub Directory').should('not.exist'));
  });

  it('can navigate to nested entry', () => {
    login();

    inSidebar(() => cy.contains('a', 'Pages').click());
    inSidebar(() => cy.contains('a', 'Directory').click());
    inGrid(() => cy.contains('a', 'Another Sub Directory').click());

    cy.url().should(
      'eq',
      'http://localhost:8080/#/collections/pages/entries/directory/another-sub-directory/index',
    );
  });

  it(`can create a new entry with custom path`, () => {
    login();

    inSidebar(() => cy.contains('a', 'Pages').click());
    inSidebar(() => cy.contains('a', 'Directory').click());
    inSidebar(() => cy.contains('a', 'Sub Directory').click());
    cy.contains('a', 'New Page').click();

    cy.get('[data-testid="field-Path"]').should('have.value', 'directory/sub-directory');
    cy.get('[data-testid="field-Path"]').type('/new-path');
    cy.get('[data-testid="field-Title"]').type('New Path Title');
    cy.wait(150);
    cy.contains('button', 'Save').click();
    assertNotification(notifications.saved);
    updateWorkflowStatusInEditor(editorStatus.ready);
    publishEntryInEditor(publishTypes.publishNow);
    exitEditor();

    inGrid(() => cy.contains('a', 'New Path Title'));
    inSidebar(() => cy.contains('a', 'Directory').click());
    inSidebar(() => cy.contains('a', 'Directory').click());
    inGrid(() => cy.contains('a', 'New Path Title').should('not.exist'));
  });

  it(`can't create an entry with an existing path`, () => {
    login();

    inSidebar(() => cy.contains('a', 'Pages').click());
    inSidebar(() => cy.contains('a', 'Directory').click());
    inSidebar(() => cy.contains('a', 'Sub Directory').click());

    cy.contains('a', 'New Page').click();
    cy.get('[data-testid="field-Title"]').type('New Path Title');
    cy.wait(150);
    cy.contains('button', 'Save').click();

    assertFieldValidationError({
      message: `Path 'directory/sub-directory' already exists`,
      fieldLabel: 'Path',
    });
  });

  it('can move an existing entry to a new path', () => {
    login();

    inSidebar(() => cy.contains('a', 'Pages').click());
    inGrid(() => cy.contains('a', 'Directory').click());

    cy.get('[data-testid="field-Path"]').should('have.value', 'directory');
    cy.get('[data-testid="field-Path"]').clear();
    cy.get('[data-testid="field-Path"]').type('new-directory');
    cy.get('[data-testid="field-Title"]').clear();
    cy.get('[data-testid="field-Title"]').type('New Directory');
    cy.wait(150);
    cy.contains('button', 'Save').click();
    assertNotification(notifications.saved);
    updateWorkflowStatusInEditor(editorStatus.ready);
    publishEntryInEditor(publishTypes.publishNow);
    exitEditor();

    inSidebar(() => cy.contains('a', 'New Directory').click());

    inGrid(() => cy.contains('a', 'Sub Directory'));
    inGrid(() => cy.contains('a', 'Another Sub Directory'));
  });
});
