import type { AnyAction } from 'redux';
import type { ThunkDispatch } from 'redux-thunk';
import type { BaseField, Collection, CollectionFile, Field, ImplementationMediaFile, MediaField, MediaFile, MediaLibrarInsertOptions, MediaLibraryConfig, UnknownField } from '../interface';
import type { RootState } from '../store';
import type AssetProxy from '../valueObjects/AssetProxy';
export declare function openMediaLibrary<EF extends BaseField = UnknownField>(payload?: {
    controlID?: string;
    forImage?: boolean;
    forFolder?: boolean;
    value?: string | string[];
    alt?: string;
    allowMultiple?: boolean;
    replaceIndex?: number;
    config?: MediaLibraryConfig;
    collection?: Collection<EF>;
    collectionFile?: CollectionFile<EF>;
    field?: EF;
    insertOptions?: MediaLibrarInsertOptions;
}): {
    readonly type: "MEDIA_LIBRARY_OPEN";
    readonly payload: {
        readonly controlID: string | undefined;
        readonly forImage: boolean | undefined;
        readonly forFolder: boolean | undefined;
        readonly value: string | string[] | undefined;
        readonly alt: string | undefined;
        readonly allowMultiple: boolean | undefined;
        readonly replaceIndex: number | undefined;
        readonly config: MediaLibraryConfig;
        readonly collection: Collection;
        readonly collectionFile: CollectionFile<UnknownField>;
        readonly field: Field;
        readonly insertOptions: MediaLibrarInsertOptions | undefined;
    };
};
export declare function closeMediaLibrary(): {
    readonly type: "MEDIA_LIBRARY_CLOSE";
};
export declare function insertMedia(mediaPath: string | string[], field: MediaField | undefined, alt?: string, currentFolder?: string): (dispatch: ThunkDispatch<RootState, {}, AnyAction>, getState: () => RootState) => void;
export declare function removeInsertedMedia(controlID: string): {
    readonly type: "MEDIA_REMOVE_INSERTED";
    readonly payload: {
        readonly controlID: string;
    };
};
export declare function loadMedia(opts?: {
    delay?: number;
    query?: string;
    page?: number;
    currentFolder?: string;
}): (dispatch: ThunkDispatch<RootState, {}, AnyAction>, getState: () => RootState) => Promise<unknown>;
export declare function persistMedia(file: File, opts?: MediaOptions, targetFolder?: string, currentFolder?: string): (dispatch: ThunkDispatch<RootState, {}, AnyAction>, getState: () => RootState) => Promise<AssetProxy | null>;
export declare function deleteMedia(file: MediaFile): (dispatch: ThunkDispatch<RootState, {}, AnyAction>, getState: () => RootState) => Promise<{
    readonly type: "MEDIA_DELETE_FAILURE";
} | undefined>;
export declare function getMediaFile(state: RootState, path: string): Promise<{
    url: string | undefined;
}>;
export declare function loadMediaDisplayURL(file: MediaFile): (dispatch: ThunkDispatch<RootState, {}, AnyAction>, getState: () => RootState) => Promise<void>;
export declare function mediaInserted(mediaPath: string | string[], alt?: string): {
    readonly type: "MEDIA_INSERT";
    readonly payload: {
        readonly mediaPath: string | string[];
        readonly alt: string | undefined;
    };
};
export declare function mediaLoading(page: number): {
    readonly type: "MEDIA_LOAD_REQUEST";
    readonly payload: {
        readonly page: number;
    };
};
export interface MediaOptions {
    field?: MediaField;
    page?: number;
    canPaginate?: boolean;
    dynamicSearch?: boolean;
    dynamicSearchQuery?: string;
}
export declare function mediaLoaded(files: ImplementationMediaFile[], opts?: MediaOptions): {
    readonly type: "MEDIA_LOAD_SUCCESS";
    readonly payload: {
        readonly field?: MediaField | undefined;
        readonly page?: number | undefined;
        readonly canPaginate?: boolean | undefined;
        readonly dynamicSearch?: boolean | undefined;
        readonly dynamicSearchQuery?: string | undefined;
        readonly files: ImplementationMediaFile[];
    };
};
export declare function mediaLoadFailed(): {
    readonly type: "MEDIA_LOAD_FAILURE";
};
export declare function mediaPersisting(): {
    readonly type: "MEDIA_PERSIST_REQUEST";
};
export declare function mediaPersisted(file: ImplementationMediaFile, currentFolder: string | undefined): {
    readonly type: "MEDIA_PERSIST_SUCCESS";
    readonly payload: {
        readonly file: ImplementationMediaFile;
        readonly currentFolder: string | undefined;
    };
};
export declare function mediaPersistFailed(): {
    readonly type: "MEDIA_PERSIST_FAILURE";
};
export declare function mediaDeleting(): {
    readonly type: "MEDIA_DELETE_REQUEST";
};
export declare function mediaDeleted(file: MediaFile): {
    readonly type: "MEDIA_DELETE_SUCCESS";
    readonly payload: {
        readonly file: MediaFile;
    };
};
export declare function mediaDeleteFailed(): {
    readonly type: "MEDIA_DELETE_FAILURE";
};
export declare function mediaDisplayURLRequest(key: string): {
    readonly type: "MEDIA_DISPLAY_URL_REQUEST";
    readonly payload: {
        readonly key: string;
    };
};
export declare function mediaDisplayURLSuccess(key: string, url: string): {
    readonly type: "MEDIA_DISPLAY_URL_SUCCESS";
    readonly payload: {
        readonly key: string;
        readonly url: string;
    };
};
export declare function mediaDisplayURLFailure(key: string, err: Error): {
    readonly type: "MEDIA_DISPLAY_URL_FAILURE";
    readonly payload: {
        readonly key: string;
        readonly err: Error;
    };
};
export declare function waitForMediaLibraryToLoad(dispatch: ThunkDispatch<RootState, {}, AnyAction>, state: RootState): Promise<void>;
export declare function getMediaDisplayURL(dispatch: ThunkDispatch<RootState, {}, AnyAction>, state: RootState, file: MediaFile): Promise<string | null | undefined>;
export type MediaLibraryAction = ReturnType<typeof openMediaLibrary | typeof closeMediaLibrary | typeof mediaInserted | typeof removeInsertedMedia | typeof mediaLoading | typeof mediaLoaded | typeof mediaLoadFailed | typeof mediaPersisting | typeof mediaPersisted | typeof mediaPersistFailed | typeof mediaDeleting | typeof mediaDeleted | typeof mediaDeleteFailed | typeof mediaDisplayURLRequest | typeof mediaDisplayURLSuccess | typeof mediaDisplayURLFailure>;
