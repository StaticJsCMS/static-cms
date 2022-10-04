type CursorStore = {
  actions: Set<string>;
  data: Record<string, unknown>;
  meta: Record<string, unknown>;
};

type ActionHandler = (action: string) => unknown;

const knownMetaKeys = [
  'index',
  'page',
  'count',
  'pageSize',
  'pageCount',
  'usingOldPaginationAPI',
  'extension',
  'folder',
  'depth',
];

function filterUnknownMetaKeys(meta: Record<string, unknown>) {
  return Object.keys(meta).reduce((acc, k) => {
    if (knownMetaKeys.includes(k)) {
      acc[k] = meta[k];
    }
    return acc;
  }, {} as Record<string, unknown>);
}

/*
  createCursorMap takes one of three signatures:
  - () -> cursor with empty actions, data, and meta
  - (cursorMap: <object/Record with optional actions, data, and meta keys>) -> cursor
  - (actions: <array/List>, data: <object/Record>, meta: <optional object/Record>) -> cursor
*/
function createCursorStore(...args: unknown[]) {
  const { actions, data, meta } =
    args.length === 1
      ? (args[0] as CursorStore)
      : ({ actions: args[0], data: args[1], meta: args[2] } as CursorStore);

  return {
    // actions are a Set, rather than a List, to ensure an efficient .has
    actions: new Set(...actions),
    // data and meta are Maps
    data,
    meta: filterUnknownMetaKeys(meta),
  } as CursorStore;
}

function hasAction(store: CursorStore, action: string) {
  return store.actions.has(action);
}

function getActionHandlers(store: CursorStore, handler: ActionHandler) {
  for (const action in store.actions) {
    handler(action);
  }
}

// The cursor logic is entirely functional, so this class simply
// provides a chainable interface
export default class Cursor {
  store?: CursorStore;
  actions?: Set<string>;
  data?: Record<string, unknown>;
  meta?: Record<string, unknown>;

  static create(...args: {}[]) {
    return new Cursor(...args);
  }

  constructor(...args: {}[]) {
    if (args[0] instanceof Cursor) {
      return args[0] as Cursor;
    }

    this.store = createCursorStore(...args);
    this.actions = this.store.actions;
    this.data = this.store.data;
    this.meta = this.store.meta;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateStore(update: (store: CursorStore) => CursorStore) {
    return new Cursor(update(this.store!));
  }

  hasAction(action: string) {
    return hasAction(this.store!, action);
  }

  addAction(action: string) {
    return this.updateStore(store => ({
      ...store,
      actions: new Set(...store.actions, action),
    }));
  }

  removeAction(action: string) {
    return this.updateStore(store => {
      const newActions = new Set(...store.actions);
      newActions.delete(action);

      return {
        ...store,
        actions: newActions,
      };
    });
  }

  setActions(actions: Iterable<string>) {
    return this.updateStore(store => ({
      ...store,
      actions: new Set(actions),
    }));
  }

  mergeActions(actions: Set<string>) {
    return this.updateStore(store => ({
      ...store,
      actions: new Set({ ...store.actions, ...actions }),
    }));
  }

  getActionHandlers(handler: ActionHandler) {
    return getActionHandlers(this.store!, handler);
  }

  setData(data: Record<string, unknown>) {
    return this.updateStore(store => ({
      ...store,
      data,
    }));
  }

  mergeData(data: Record<string, unknown>) {
    return this.updateStore(store => ({
      ...store,
      data: { ...store.data, ...data },
    }));
  }

  wrapData(data: Record<string, unknown>) {
    return this.updateStore(store => ({
      ...store,
      data: {
        ...data,
        wrapped_cursor_data: store.data,
      },
    }));
  }

  unwrapData(): [CursorStore['data'], Cursor] {
    return [
      this.store!.data,
      this.updateStore(store => ({
        ...store,
        data: store.data.wrapped_cursor_data as Record<string, unknown>,
      })),
    ];
  }

  clearData() {
    return this.updateStore(store => ({
      ...store,
      data: {},
    }));
  }

  setMeta(meta: Record<string, unknown>) {
    return this.updateStore(store => ({
      ...store,
      meta,
    }));
  }

  mergeMeta(meta: Record<string, unknown>) {
    return this.updateStore(store => ({
      ...store,
      meta: { ...store.meta, ...meta },
    }));
  }
}

// This is a temporary hack to allow cursors to be added to the
// interface between backend.js and backends without modifying old
// backends at all. This should be removed in favor of wrapping old
// backends with a compatibility layer, as part of the backend API
// refactor.
export const CURSOR_COMPATIBILITY_SYMBOL = Symbol('cursor key for compatibility with old backends');
