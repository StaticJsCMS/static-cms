export {};

import type { Config } from '../interface';
import type CmsAPI from '../index';
import type createReactClass from 'create-react-class';
import type { createElement, useEffect, useState, useMemo, useCallback } from 'react';

declare global {
  interface Window {
    CMS?: CmsAPI;
    CMS_CONFIG?: Config;
    CMS_ENV?: string;
    /**
     * @deprecated Should use react functional components instead
     */
    createClass: createReactClass;
    h: createElement;
    useState: useState;
    useMemo: useMemo;
    useEffect: useEffect;
    useCallback: useCallback;
  }
}
