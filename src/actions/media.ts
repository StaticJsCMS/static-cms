import { isAbsolutePath } from '../lib/util';
import { selectMediaFilePath } from '../reducers/entries';
import { selectMediaFileByPath } from '../reducers/mediaLibrary';
import { createAssetProxy } from '../valueObjects/AssetProxy';
import { getMediaDisplayURL, getMediaFile, waitForMediaLibraryToLoad } from './mediaLibrary';

import type { AnyAction } from 'redux';
import type { ThunkDispatch } from 'redux-thunk';
import type { CmsField, Collection, Entry } from '../interface';
import type { RootState } from '../store';
import type AssetProxy from '../valueObjects/AssetProxy';

export const ADD_ASSETS = 'ADD_ASSETS';
export const ADD_ASSET = 'ADD_ASSET';
export const REMOVE_ASSET = 'REMOVE_ASSET';

export const LOAD_ASSET_REQUEST = 'LOAD_ASSET_REQUEST';
export const LOAD_ASSET_SUCCESS = 'LOAD_ASSET_SUCCESS';
export const LOAD_ASSET_FAILURE = 'LOAD_ASSET_FAILURE';

export function addAssets(assets: AssetProxy[]) {
  return { type: ADD_ASSETS, payload: assets } as const;
}

export function addAsset(assetProxy: AssetProxy) {
  return { type: ADD_ASSET, payload: assetProxy } as const;
}

export function removeAsset(path: string) {
  return { type: REMOVE_ASSET, payload: path } as const;
}

export function loadAssetRequest(path: string) {
  return { type: LOAD_ASSET_REQUEST, payload: { path } } as const;
}

export function loadAssetSuccess(path: string) {
  return { type: LOAD_ASSET_SUCCESS, payload: { path } } as const;
}

export function loadAssetFailure(path: string, error: Error) {
  return { type: LOAD_ASSET_FAILURE, payload: { path, error } } as const;
}

export function loadAsset(resolvedPath: string) {
  return async (dispatch: ThunkDispatch<RootState, {}, AnyAction>, getState: () => RootState) => {
    try {
      dispatch(loadAssetRequest(resolvedPath));
      // load asset url from backend
      await waitForMediaLibraryToLoad(dispatch, getState());
      const file = selectMediaFileByPath(getState(), resolvedPath);

      if (file) {
        const url = await getMediaDisplayURL(dispatch, getState(), file);
        const asset = createAssetProxy({ path: resolvedPath, url: url || resolvedPath });
        dispatch(addAsset(asset));
      } else {
        const { url } = await getMediaFile(getState(), resolvedPath);
        const asset = createAssetProxy({ path: resolvedPath, url });
        dispatch(addAsset(asset));
      }
      dispatch(loadAssetSuccess(resolvedPath));
    } catch (error: unknown) {
      console.log(error);
      if (error instanceof Error) {
        dispatch(loadAssetFailure(resolvedPath, error));
      }
    }
  };
}

const emptyAsset = createAssetProxy({
  path: 'empty.svg',
  file: new File([`<svg xmlns="http://www.w3.org/2000/svg"></svg>`], 'empty.svg', {
    type: 'image/svg+xml',
  }),
});

export function getAsset(collection: Collection, entry: Entry, path: string, field?: CmsField) {
  return (dispatch: ThunkDispatch<RootState, {}, AnyAction>, getState: () => RootState) => {
    if (!path) {
      return emptyAsset;
    }

    const state = getState();
    if (!state.config.config) {
      return emptyAsset;
    }

    const resolvedPath = selectMediaFilePath(state.config.config, collection, entry, path, field);

    let { asset, isLoading, error } = state.medias[resolvedPath] || {};
    if (isLoading) {
      return emptyAsset;
    }

    if (asset) {
      // There is already an AssetProxy in memory for this path. Use it.
      return asset;
    }

    if (isAbsolutePath(resolvedPath)) {
      // asset path is a public url so we can just use it as is
      asset = createAssetProxy({ path: resolvedPath, url: path });
      dispatch(addAsset(asset));
    } else {
      if (error) {
        // on load error default back to original path
        asset = createAssetProxy({ path: resolvedPath, url: path });
        dispatch(addAsset(asset));
      } else {
        dispatch(loadAsset(resolvedPath));
        asset = emptyAsset;
      }
    }

    return asset;
  };
}

export type MediasAction = ReturnType<
  | typeof addAssets
  | typeof addAsset
  | typeof removeAsset
  | typeof loadAssetRequest
  | typeof loadAssetSuccess
  | typeof loadAssetFailure
>;
