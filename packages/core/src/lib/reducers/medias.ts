import {
  ADD_ASSET,
  ADD_ASSETS,
  LOAD_ASSET_FAILURE,
  LOAD_ASSET_REQUEST,
  LOAD_ASSET_SUCCESS,
  REMOVE_ASSET,
} from '../constants';

import type { MediasAction } from '../actions/media';
import type AssetProxy from '../valueObjects/AssetProxy';

export type MediasState = Record<
  string,
  { asset: AssetProxy | undefined; isLoading: boolean; error: Error | null }
>;

const defaultState: MediasState = {};

const medias = (state: MediasState = defaultState, action: MediasAction) => {
  switch (action.type) {
    case ADD_ASSETS: {
      const assets = action.payload;
      const newState = {
        ...state,
      };
      assets.forEach(asset => {
        newState[asset.path] = { asset, isLoading: false, error: null };
      });
      return newState;
    }
    case ADD_ASSET: {
      const asset = action.payload;
      return {
        ...state,
        [asset.path]: { asset, isLoading: false, error: null },
      };
    }
    case REMOVE_ASSET: {
      const path = action.payload;
      const newState = {
        ...state,
      };
      delete newState[path];
      return newState;
    }
    case LOAD_ASSET_REQUEST: {
      const { path } = action.payload;
      return {
        ...state,
        [path]: { ...state[path], isLoading: true },
      };
    }
    case LOAD_ASSET_SUCCESS: {
      const { path } = action.payload;
      return {
        ...state,
        [path]: { ...state[path], isLoading: false, error: null },
      };
    }
    case LOAD_ASSET_FAILURE: {
      const { path, error } = action.payload;
      return {
        ...state,
        [path]: { ...state[path], isLoading: false, error },
      };
    }

    default:
      return state;
  }
};

export default medias;
