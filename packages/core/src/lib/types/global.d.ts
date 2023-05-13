export {};

import type { Config } from '../interface';
import type CmsAPI from '../index';
import type { createElement, useEffect, useState, useMemo, useCallback } from 'react';
import type {
  useEntries,
  useFolderSupport,
  useHasChildErrors,
  useIsMediaAsset,
  useMediaAsset,
  useMediaFiles,
  useMediaInsert,
  useUUID,
} from '../lib/hooks';

declare global {
  interface Window {
    CMS?: CmsAPI;
    CMS_CONFIG?: Config;
    CMS_ENV?: string;
    h: createElement;
    useState: useState;
    useMemo: useMemo;
    useEffect: useEffect;
    useCallback: useCallback;

    useEntries: useEntries;
    useFolderSupport: useFolderSupport;
    useHasChildErrors: useHasChildErrors;
    useIsMediaAsset: useIsMediaAsset;
    useMediaAsset: useMediaAsset;
    useMediaFiles: useMediaFiles;
    useMediaInsert: useMediaInsert;
    useUUID: useUUID;
  }
}
