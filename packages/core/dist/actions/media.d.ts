import type { AnyAction } from 'redux';
import type { ThunkDispatch } from 'redux-thunk';
import type { BaseField, Collection, Entry, MediaField, UnknownField } from '../interface';
import type { RootState } from '../store';
import type AssetProxy from '../valueObjects/AssetProxy';
export declare function addAssets(assets: AssetProxy[]): {
    readonly type: "ADD_ASSETS";
    readonly payload: AssetProxy[];
};
export declare function addAsset(assetProxy: AssetProxy): {
    readonly type: "ADD_ASSET";
    readonly payload: AssetProxy;
};
export declare function removeAsset(path: string): {
    readonly type: "REMOVE_ASSET";
    readonly payload: string;
};
export declare function loadAssetRequest(path: string): {
    readonly type: "LOAD_ASSET_REQUEST";
    readonly payload: {
        readonly path: string;
    };
};
export declare function loadAssetSuccess(path: string): {
    readonly type: "LOAD_ASSET_SUCCESS";
    readonly payload: {
        readonly path: string;
    };
};
export declare function loadAssetFailure(path: string, error: Error): {
    readonly type: "LOAD_ASSET_FAILURE";
    readonly payload: {
        readonly path: string;
        readonly error: Error;
    };
};
export declare const emptyAsset: AssetProxy;
export declare function getAsset<T extends MediaField, EF extends BaseField = UnknownField>(collection: Collection<EF> | null | undefined, entry: Entry | null | undefined, path: string, field?: T, currentFolder?: string): (dispatch: ThunkDispatch<RootState, {}, AnyAction>, getState: () => RootState) => Promise<AssetProxy>;
export type MediasAction = ReturnType<typeof addAssets | typeof addAsset | typeof removeAsset | typeof loadAssetRequest | typeof loadAssetSuccess | typeof loadAssetFailure>;
