import collections from './collections';
import cursors from './cursors';
import entries from './entries';
import entryDraft from './entryDraft';
import mediaLibrary from './mediaLibrary';
declare const reducers: {
    auth: (state?: import("./auth").AuthState | undefined, action: import("../actions/auth").AuthAction) => import("./auth").AuthState;
    collections: typeof collections;
    config: (state: import("./config").ConfigState<import("..").UnknownField> | undefined, action: import("../actions/config").ConfigAction) => import("./config").ConfigState<import("..").UnknownField>;
    cursors: typeof cursors;
    entries: typeof entries;
    entryDraft: typeof entryDraft;
    globalUI: (state: import("./globalUI").GlobalUIState | undefined, action: {
        readonly type: "THEME_CHANGE";
        readonly payload: "dark" | "light";
    }) => import("./globalUI").GlobalUIState;
    mediaLibrary: typeof mediaLibrary;
    medias: (state: import("./medias").MediasState | undefined, action: import("../actions/media").MediasAction) => import("./medias").MediasState;
    scroll: (state?: import("./scroll").ScrollState | undefined, action: import("../actions/scroll").ScrollAction) => import("./scroll").ScrollState;
    search: (state: import("./search").SearchState | undefined, action: import("../actions/search").SearchAction) => import("./search").SearchState;
    status: (state?: import("./status").StatusState | undefined, action: import("../actions/status").StatusAction) => import("./status").StatusState;
};
export default reducers;
