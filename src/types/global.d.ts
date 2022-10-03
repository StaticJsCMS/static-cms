export {};

import type { CmsConfig } from '../interface';
import type CmsAPI from '../index';
import type createReactClass from 'create-react-class';
import type { createElement } from 'react';

declare global {
  interface Window {
    CMS?: CmsAPI;
    CMS_CONFIG?: CmsConfig;
    CMS_ENV?: string;
    createClass: createReactClass;
    h: createElement;
  }
}
