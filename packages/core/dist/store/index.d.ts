import type { BaseField, UnknownField } from '../interface';
import type { CollectionsState } from '../reducers/collections';
import type { ConfigState } from '../reducers/config';
declare const store: import("@reduxjs/toolkit/dist/configureStore").ToolkitStore<import("redux").EmptyObject & {
    snackbar: import("./slices/snackbars").SnackbarState;
    auth: import("../reducers/auth").AuthState;
    collections: CollectionsState<UnknownField>;
    config: ConfigState<UnknownField>;
    cursors: import("../reducers/cursors").CursorsState;
    entries: import("../reducers/entries").EntriesState;
    entryDraft: import("../reducers/entryDraft").EntryDraftState;
    globalUI: import("../reducers/globalUI").GlobalUIState;
    mediaLibrary: import("../reducers/mediaLibrary").MediaLibraryState;
    medias: import("../reducers/medias").MediasState;
    scroll: import("../reducers/scroll").ScrollState;
    search: import("../reducers/search").SearchState;
    status: import("../reducers/status").StatusState;
}, import("redux").AnyAction | import("../actions/entries").EntriesAction | import("../actions/auth").AuthAction | import("../actions/config").ConfigAction | {
    readonly type: "THEME_CHANGE";
    readonly payload: "dark" | "light";
} | import("../actions/media").MediasAction | import("../actions/scroll").ScrollAction | import("../actions/search").SearchAction | import("../actions/status").StatusAction | import("../actions/mediaLibrary").MediaLibraryAction, import("@reduxjs/toolkit").MiddlewareArray<[import("@reduxjs/toolkit").ThunkMiddleware<import("redux").CombinedState<{
    snackbar: import("./slices/snackbars").SnackbarState;
    auth: import("../reducers/auth").AuthState;
    collections: CollectionsState<UnknownField>;
    config: ConfigState<UnknownField>;
    cursors: import("../reducers/cursors").CursorsState;
    entries: import("../reducers/entries").EntriesState;
    entryDraft: import("../reducers/entryDraft").EntryDraftState;
    globalUI: import("../reducers/globalUI").GlobalUIState;
    mediaLibrary: import("../reducers/mediaLibrary").MediaLibraryState;
    medias: import("../reducers/medias").MediasState;
    scroll: import("../reducers/scroll").ScrollState;
    search: import("../reducers/search").SearchState;
    status: import("../reducers/status").StatusState;
}>, import("redux").AnyAction>, import("redux").Middleware<{}, any, import("redux").Dispatch<import("redux").AnyAction>>]>>;
export { store };
export type RootState<EF extends BaseField = UnknownField> = Omit<ReturnType<typeof store.getState>, 'collection' | 'config'> & {
    collection: CollectionsState<EF>;
    config: ConfigState<EF>;
};
export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
