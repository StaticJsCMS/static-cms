import createReactClass from 'create-react-class';
import { createElement, useCallback, useEffect, useMemo, useState } from 'react';

import bootstrap from './bootstrap';
import useIsMediaAsset from './lib/hooks/useIsMediaAsset';
import useMediaAsset from './lib/hooks/useMediaAsset';
import useMediaInsert from './lib/hooks/useMediaInsert';
import useUUID from './lib/hooks/useUUID';
import Registry from './lib/registry';

export * from './backends';
export * from './interface';
export * from './lib';
export { default as locales } from './locales';
export * from './media-libraries';
export * from './widgets';

const CMS = {
  ...Registry,
  init: bootstrap,
};

if (typeof window !== 'undefined') {
  window.CMS = CMS;
  window.createClass = window.createClass || createReactClass;
  window.useState = window.useState || useState;
  window.useMemo = window.useMemo || useMemo;
  window.useEffect = window.useEffect || useEffect;
  window.useCallback = window.useCallback || useCallback;
  window.h = window.h || createElement;
  window.useIsMediaAsset = window.useIsMediaAsset || useIsMediaAsset;
  window.useMediaAsset = window.useMediaAsset || useMediaAsset;
  window.useMediaInsert = window.useMediaInsert || useMediaInsert;
  window.useUUID = window.useUUID || useUUID;
}

export default CMS;
