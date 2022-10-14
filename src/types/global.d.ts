export {};

import type { Config } from '../interface';
import type CmsAPI from '../index';
import type createReactClass from 'create-react-class';
import type { createElement } from 'react';

declare global {
  interface Window {
    CMS?: CmsAPI;
    CMS_CONFIG?: Config;
    CMS_ENV?: string;
    createClass: createReactClass;
    h: createElement;
  }
}
