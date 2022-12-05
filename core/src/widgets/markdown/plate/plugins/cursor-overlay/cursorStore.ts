import { createStore } from '@udecode/plate';

const cursorStore = createStore('cursor')({
  cursors: {},
});

export default cursorStore;
