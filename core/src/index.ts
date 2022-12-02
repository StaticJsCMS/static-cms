import createReactClass from 'create-react-class';
import { createElement, useCallback, useEffect, useMemo, useState } from 'react';

import bootstrap from './bootstrap';
import Registry from './lib/registry';

export * from './backends';
export * from './widgets';
export * from './media-libraries';
export { default as locales } from './locales';
export * from './lib';

export * from './interface';

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
}

export default CMS;
