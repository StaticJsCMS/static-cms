declare function createRootReducer(): import("redux").Reducer<import("redux").CombinedState<{
    snackbar: import("../store/slices/snackbars").SnackbarState;
    auth: import("./auth").AuthState;
    collections: import("./collections").CollectionsState<import("..").UnknownField>;
    config: import("./config").ConfigState<import("..").UnknownField>;
    cursors: import("./cursors").CursorsState;
    entries: import("./entries").EntriesState;
    entryDraft: import("./entryDraft").EntryDraftState;
    globalUI: import("./globalUI").GlobalUIState;
    mediaLibrary: import("./mediaLibrary").MediaLibraryState;
    medias: import("./medias").MediasState;
    scroll: import("./scroll").ScrollState;
    search: import("./search").SearchState;
    status: import("./status").StatusState;
}>, import("redux").AnyAction | import("../actions/entries").EntriesAction | import("../actions/auth").AuthAction | import("../actions/config").ConfigAction | {
    readonly type: "THEME_CHANGE";
    readonly payload: "dark" | "light";
} | import("../actions/media").MediasAction | import("../actions/scroll").ScrollAction | import("../actions/search").SearchAction | import("../actions/status").StatusAction | import("../actions/mediaLibrary").MediaLibraryAction>;
export default createRootReducer;
