import createReactClass from 'create-react-class';
import React from 'react';

import bootstrap from './bootstrap';
import Registry from './lib/registry';

export * from './backends';
export * from './widgets';
export * from './media-libraries';
export * from './locales';
export * from './lib';

export const CMS = {
  ...Registry,
  init: bootstrap,
};

if (typeof window !== 'undefined') {
  window.CMS = CMS;
  window.createClass = window.createClass || createReactClass;
  window.useState = window.useState || React.useState;
  window.useMemo = window.useMemo || React.useMemo;
  window.useEffect = window.useEffect || React.useEffect;
  window.h = window.h || React.createElement;
}

export default CMS;
