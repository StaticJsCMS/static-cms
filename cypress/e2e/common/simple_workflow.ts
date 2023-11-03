import {
  assertPublishedEntry,
  createPostAndPublish,
  createPostPublishAndCreateNew,
  createPostPublishAndDuplicate,
  duplicatePostAndPublish,
  editPostAndPublish,
  editPostPublishAndCreateNew,
  editPostPublishAndDuplicate,
  login,
} from '../../utils/steps';
import {
  entry1,
  entry10,
  entry2,
  entry3,
  entry4,
  entry5,
  entry6,
  entry7,
  entry8,
  entry9,
} from './entries';

import type { User } from '@staticcms/cypress/interface';

export interface SimpleWorkflowProps {
  getUser?: () => User;
}

export default function ({ getUser }: SimpleWorkflowProps = {}) {
  it('successfully loads', () => {
    login({ user: getUser?.() });
  });

  it('can create an entry', () => {
    login({ user: getUser?.() });
    createPostAndPublish(entry1);
    assertPublishedEntry(entry1);
  });

  it('can publish a new entry and create new', () => {
    login();
    createPostPublishAndCreateNew(entry2);
    assertPublishedEntry(entry2);
  });

  it('can publish a new entry and duplicate', () => {
    login();
    createPostPublishAndDuplicate(entry3);
    assertPublishedEntry(entry3);
  });

  it('can edit an existing entry and publish', () => {
    login();
    createPostAndPublish(entry4);
    assertPublishedEntry(entry4);

    editPostAndPublish(entry4, entry5);
  });

  it('can edit an existing entry, publish and create new', () => {
    login();
    createPostAndPublish(entry6);
    assertPublishedEntry(entry6);

    editPostPublishAndCreateNew(entry6, entry7);
  });

  it('can edit an existing entry, publish and duplicate', () => {
    login();
    createPostAndPublish(entry8);
    assertPublishedEntry(entry8);

    editPostPublishAndDuplicate(entry8, entry9);
  });

  it('can duplicate an existing entry', () => {
    login();
    createPostAndPublish(entry10);
    assertPublishedEntry(entry10);

    duplicatePostAndPublish(entry10);
  });
}
