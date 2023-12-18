export interface CursorStore {
    actions: Set<string>;
    data: Record<string, unknown>;
    meta: Record<string, unknown>;
}
type ActionHandler = (action: string) => unknown;
export default class Cursor {
    store: CursorStore;
    actions: Set<string>;
    data: Record<string, unknown>;
    meta: Record<string, unknown>;
    static create(...args: {}[]): Cursor;
    constructor(...args: {}[]);
    updateStore(update: (store: CursorStore) => CursorStore): Cursor;
    hasAction(action: string): boolean;
    addAction(action: string): Cursor;
    removeAction(action: string): Cursor;
    setActions(actions: Iterable<string>): Cursor;
    mergeActions(actions: Set<string>): Cursor;
    getActionHandlers(handler: ActionHandler): void;
    setData(data: Record<string, unknown>): Cursor;
    mergeData(data: Record<string, unknown>): Cursor;
    wrapData(data: Record<string, unknown>): Cursor;
    unwrapData(): [CursorStore['data'], Cursor];
    clearData(): Cursor;
    setMeta(meta: Record<string, unknown>): Cursor;
    mergeMeta(meta: Record<string, unknown>): Cursor;
}
export declare const CURSOR_COMPATIBILITY_SYMBOL: unique symbol;
export {};
