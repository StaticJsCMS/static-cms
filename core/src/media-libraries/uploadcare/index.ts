import uploadcare from 'uploadcare-widget';
import uploadcareTabEffects from 'uploadcare-widget-tab-effects';

import type { MediaLibraryInitOptions, MediaLibraryInstance } from '@staticcms/core/interface';

declare global {
  interface Window {
    UPLOADCARE_PUBLIC_KEY: string;
    UPLOADCARE_LIVE: boolean;
    UPLOADCARE_MANUAL_START: boolean;
  }
}

window.UPLOADCARE_LIVE = false;
window.UPLOADCARE_MANUAL_START = true;

const USER_AGENT = 'StaticCms-Uploadcare-MediaLibrary';
const CDN_BASE_URL = 'https://ucarecdn.com';

/**
 * Default Uploadcare widget configuration, can be overridden via config.yml.
 */
const defaultConfig = {
  previewStep: true,
  integration: USER_AGENT,
};

/**
 * Determine whether an array of urls represents an unaltered set of Uploadcare
 * group urls. If they've been changed or any are missing, a new group will need
 * to be created to represent the current values.
 */
function isFileGroup(files: string[]) {
  const basePatternString = `~${files.length}/nth/`;

  function mapExpression(_val: string, idx: number) {
    return new RegExp(`${basePatternString}${idx}/$`);
  }

  const expressions = Array.from({ length: files.length }, mapExpression);
  return expressions.every(exp => files.some(url => exp.test(url)));
}

export interface UploadcareFileGroupInfo {
  cdnUrl: string;
  name: string;
  isImage: boolean;
}

/**
 * Returns a fileGroupInfo object wrapped in a promise-like object.
 */
function getFileGroup(files: string[]): Promise<UploadcareFileGroupInfo> {
  /**
   * Capture the group id from the first file in the files array.
   */
  const groupId = new RegExp(`^.+/([^/]+~${files.length})/nth/`).exec(files[0])?.[1];

  /**
   * The `openDialog` method handles the jQuery promise object returned by
   * `fileFrom`, but requires the promise returned by `loadFileGroup` to provide
   * the result of it's `done` method.
   */
  return new Promise(resolve => uploadcare.loadFileGroup(groupId).done(group => resolve(group)));
}

/**
 * Convert a url or array/List of urls to Uploadcare file objects wrapped in
 * promises, or Uploadcare groups when possible. Output is wrapped in a promise
 * because the value we're returning may be a promise that we created.
 */
function getFiles(
  value: string[] | string | undefined,
): Promise<UploadcareFileGroupInfo | UploadcareFileGroupInfo[]> | null {
  if (Array.isArray(value)) {
    return isFileGroup(value) ? getFileGroup(value) : Promise.all(value.map(val => getFile(val)));
  }
  return value && typeof value === 'string' ? getFile(value) : null;
}

/**
 * Convert a single url to an Uploadcare file object wrapped in a promise-like
 * object. Group urls that get passed here were not a part of a complete and
 * untouched group, so they'll be uploaded as new images (only way to do it).
 */
function getFile(url: string): Promise<UploadcareFileGroupInfo> {
  const groupPattern = /~\d+\/nth\/\d+\//;
  const uploaded = url.startsWith(CDN_BASE_URL) && !groupPattern.test(url);
  return uploadcare.fileFrom(uploaded ? 'uploaded' : 'url', url);
}

interface OpenDialogOptions {
  files:
    | UploadcareFileGroupInfo
    | UploadcareFileGroupInfo[]
    | Promise<UploadcareFileGroupInfo | UploadcareFileGroupInfo[]>
    | null;
  config: {
    multiple: boolean;
    imagesOnly: boolean;
    previewStep: boolean;
    integration: string;
  };
  handleInsert: (url: string | string[]) => void;
  settings: {
    defaultOperations?: string;
    autoFilename?: boolean;
  };
}

/**
 * Open the standalone dialog. A single instance is created and destroyed for
 * each use.
 */
function openDialog({ files, config, handleInsert, settings = {} }: OpenDialogOptions) {
  if (!files) {
    return;
  }

  if (settings.defaultOperations && !settings.defaultOperations.startsWith('/')) {
    console.warn(
      'Uploadcare default operations should start with `/`. Example: `/preview/-/resize/100x100/image.png`',
    );
  }

  function buildUrl(fileInfo: UploadcareFileGroupInfo) {
    const { cdnUrl, name, isImage } = fileInfo;

    let url =
      isImage && settings.defaultOperations ? `${cdnUrl}-${settings.defaultOperations}` : cdnUrl;
    const filenameDefined = !url.endsWith('/');

    if (!filenameDefined && settings.autoFilename) {
      url = url + name;
    }

    return url;
  }

  uploadcare.openDialog(files, config).done(({ promise, files }) => {
    const isGroup = Boolean(files);

    return promise().then(info => {
      if (isGroup) {
        return Promise.all(
          files().map(promise => promise.then(fileInfo => buildUrl(fileInfo))),
        ).then(urls => handleInsert(urls));
      } else {
        handleInsert(buildUrl(info));
      }
    });
  });
}

/**
 * Initialization function will only run once, returns an API object for Simple
 * CMS to call methods on.
 */
async function init({
  options = { config: {}, settings: {} },
  handleInsert,
}: MediaLibraryInitOptions): Promise<MediaLibraryInstance> {
  const { publicKey, ...globalConfig } = options.config as {
    publicKey: string;
  } & Record<string, unknown>;
  const baseConfig = { ...defaultConfig, ...globalConfig };

  window.UPLOADCARE_PUBLIC_KEY = publicKey;

  /**
   * Register the effects tab by default because the effects tab is awesome. Can
   * be disabled via config.
   */
  uploadcare.registerTab('preview', uploadcareTabEffects);

  return {
    /**
     * On show, create a new widget, cache it in the widgets object, and open.
     * No hide method is provided because the widget doesn't provide it.
     */
    show: ({ value, config: instanceConfig = {}, allowMultiple, imagesOnly = false }) => {
      const config = { ...baseConfig, imagesOnly, ...instanceConfig } as {
        imagesOnly: boolean;
        previewStep: boolean;
        integration: string;
        multiple?: boolean;
      };
      const multiple = allowMultiple === false ? false : Boolean(config.multiple);
      const resolvedConfig = { ...config, multiple };
      const files = getFiles(value);

      /**
       * Resolve the promise only if it's ours. Only the jQuery promise objects
       * from the Uploadcare library will have a `state` method.
       */
      if (files && !('state' in files)) {
        return files.then(result =>
          openDialog({
            files: result,
            config: resolvedConfig,
            settings: options.settings as Record<string, unknown>,
            handleInsert,
          }),
        );
      } else {
        return openDialog({
          files,
          config: resolvedConfig,
          settings: options.settings as Record<string, unknown>,
          handleInsert,
        });
      }
    },

    /**
     * Uploadcare doesn't provide a "media library" widget for viewing and
     * selecting existing files, so we return `false` here so Static CMS only
     * opens the Uploadcare widget when called from an editor control. This
     * results in the "Media" button in the global nav being hidden.
     */
    enableStandalone: () => false,
  };
}

/**
 * The object that will be registered only needs a (default) name and `init`
 * method. The `init` method returns the API object.
 */
const uploadcareMediaLibrary = { name: 'uploadcare', init };

export const StaticMediaLibraryUploadcare = uploadcareMediaLibrary;
export default uploadcareMediaLibrary;
