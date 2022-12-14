/**
 * This module is currently concerned only with external media libraries
 * registered via `registerMediaLibrary`.
 */
import once from 'lodash/once';

import { configFailed } from './actions/config';
import { createMediaLibrary, insertMedia } from './actions/mediaLibrary';
import { getMediaLibrary } from './lib/registry';
import { store } from './store';

import type { MediaLibrary, MediaLibraryExternalLibrary } from './interface';
import type { RootState } from './store';

function handleInsert(url: string | string[]) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return store.dispatch(insertMedia(url, undefined));
}

const initializeMediaLibrary = once(async function initializeMediaLibrary(
  name: string,
  { config }: MediaLibraryExternalLibrary,
) {
  const lib = getMediaLibrary(name);
  if (!lib) {
    const err = new Error(
      `Missing external media library '${name}'. Please use 'registerMediaLibrary' to register it.`,
    );
    store.dispatch(configFailed(err));
  } else {
    const instance = await lib.init({ options: config, handleInsert });
    store.dispatch(createMediaLibrary(instance));
  }
});

function isExternalMediaLibraryConfig(
  config: MediaLibrary | undefined,
): config is MediaLibraryExternalLibrary {
  return Boolean(config && 'name' in config);
}

store.subscribe(() => {
  const state = store.getState() as unknown as RootState;
  if (state.config.config && isExternalMediaLibraryConfig(state.config.config.media_library)) {
    const mediaLibraryName = state.config.config.media_library?.name;
    if (mediaLibraryName && !state.mediaLibrary.externalLibrary) {
      const mediaLibraryConfig = state.config.config.media_library;
      initializeMediaLibrary(mediaLibraryName, mediaLibraryConfig);
    }
  }
});
