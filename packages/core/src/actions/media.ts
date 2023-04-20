import {
  ADD_ASSET,
  ADD_ASSETS,
  LOAD_ASSET_FAILURE,
  LOAD_ASSET_REQUEST,
  LOAD_ASSET_SUCCESS,
  REMOVE_ASSET,
} from '../constants';
import { selectMediaFilePath } from '../lib/util/media.util';
import { createAssetProxy } from '../valueObjects/AssetProxy';
import { getMediaFile } from './mediaLibrary';

import type { AnyAction } from 'redux';
import type { ThunkDispatch } from 'redux-thunk';
import type { BaseField, Collection, Entry, Field, MediaField, UnknownField } from '../interface';
import type { RootState } from '../store';
import type AssetProxy from '../valueObjects/AssetProxy';

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

export const emptyAsset = createAssetProxy({
  path: 'empty.svg',
  file: new File([`<svg xmlns="http://www.w3.org/2000/svg"></svg>`], 'empty.svg', {
    type: 'image/svg+xml',
  }),
});

async function loadAsset(
  resolvedPath: string,
  dispatch: ThunkDispatch<RootState, {}, AnyAction>,
  getState: () => RootState,
): Promise<AssetProxy> {
  try {
    dispatch(loadAssetRequest(resolvedPath));
    const { url } = await getMediaFile(getState(), resolvedPath);
    const asset = createAssetProxy({ path: resolvedPath, url });
    dispatch(addAsset(asset));
    dispatch(loadAssetSuccess(resolvedPath));
    return asset;
  } catch (error: unknown) {
    console.error(error);
    if (error instanceof Error) {
      dispatch(loadAssetFailure(resolvedPath, error));
    }
    return emptyAsset;
  }
}

const promiseCache: Record<string, Promise<AssetProxy>> = {};

export function getAsset<T extends MediaField, EF extends BaseField = UnknownField>(
  collection: Collection<EF> | null | undefined,
  entry: Entry | null | undefined,
  path: string,
  field?: T,
  currentFolder?: string,
) {
  return (
    dispatch: ThunkDispatch<RootState, {}, AnyAction>,
    getState: () => RootState,
  ): Promise<AssetProxy> => {
    const state = getState();
    if (!state.config.config) {
      return Promise.resolve(emptyAsset);
    }

    const resolvedPath = selectMediaFilePath(
      state.config.config,
      collection as Collection,
      entry,
      path,
      field as Field,
      currentFolder,
    );

    const { asset, isLoading } = state.medias[resolvedPath] || {};
    if (isLoading) {
      return promiseCache[resolvedPath];
    }

    if (asset) {
      // There is already an AssetProxy in memory for this path. Use it.
      return Promise.resolve(asset);
    }

    const p = new Promise<AssetProxy>(resolve => {
      loadAsset(resolvedPath, dispatch, getState).then(asset => {
        resolve(asset);
      });
    });

    promiseCache[resolvedPath] = p;

    return p;
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
