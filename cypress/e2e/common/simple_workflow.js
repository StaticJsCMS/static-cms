import { login, createPostAndPublish, assertPublishedEntry } from '../../utils/steps';

export default function({ entries, getUser }) {
  it('successfully loads', () => {
    login({ user: getUser() });
  });

  it('can create an entry', () => {
    login({ user: getUser() });
    createPostAndPublish(entries[0]);
    assertPublishedEntry(entries[0]);
  });
}
