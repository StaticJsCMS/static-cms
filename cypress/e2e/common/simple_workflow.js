import { login, createPostAndPublish, assertPublishedEntry } from '../../utils/steps';
import { entry1, entry2 } from './entries';

export default function ({ getUser }) {
  it('successfully loads', () => {
    login({ user: getUser() });
  });

  it('can create an entry', () => {
    login({ user: getUser() });
    createPostAndPublish(entry1);
    assertPublishedEntry(entry1);
  });

  it('can publish a new entry and create new', () => {
    login();
    createPostPublishAndCreateNew(entry1);
    assertPublishedEntry(entry1);
  });

  it('can publish a new entry and duplicate', () => {
    login();
    createPostPublishAndDuplicate(entry1);
    assertPublishedEntry(entry1);
  });

  it('can edit an existing entry and publish', () => {
    login();
    createPostAndPublish(entry1);
    assertPublishedEntry(entry1);

    editPostAndPublish(entry1, entry2);
  });

  it('can edit an existing entry, publish and create new', () => {
    login();
    createPostAndPublish(entry1);
    assertPublishedEntry(entry1);

    editPostPublishAndCreateNew(entry1, entry2);
  });

  it('can edit an existing entry, publish and duplicate', () => {
    login();
    createPostAndPublish(entry1);
    assertPublishedEntry(entry1);

    editPostPublishAndDuplicate(entry1, entry2);
  });

  it('can duplicate an existing entry', () => {
    login();
    createPostAndPublish(entry1);
    assertPublishedEntry(entry1);

    duplicatePostAndPublish(entry1);
  });
}
