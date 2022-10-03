import createReactClass from 'create-react-class';
import React from 'react';

import bootstrap from './bootstrap';
import Registry from './lib/registry';

export * from './backends';
export * from './widgets';
export * from './media-libraries';
export * from './editor-components';
export * from './locales';
export * from './lib';
export * from './ui';

export const CMS = {
  ...Registry,
  init: bootstrap,
};

if (typeof window !== 'undefined') {
  window.CMS = CMS;
  window.createClass = window.createClass || createReactClass;
  window.h = window.h || React.createElement;
}

export default CMS;
