import deepmerge from 'deepmerge';
import { produce } from 'immer';
import cloneDeep from 'lodash/cloneDeep';
import trim from 'lodash/trim';
import trimStart from 'lodash/trimStart';
import yaml from 'yaml';

import { CONFIG_FAILURE, CONFIG_REQUEST, CONFIG_SUCCESS } from '../constants';
import validateConfig from '../constants/configSchema';
import { SIMPLE as SIMPLE_PUBLISH_MODE } from '../constants/publishModes';
import { I18N_FIELD_NONE, I18N_FIELD_TRANSLATE, I18N_STRUCTURE_SINGLE_FILE } from '../lib/i18n';
import { selectDefaultSortableFields } from '../lib/util/collection.util';

import type { AnyAction } from 'redux';
import type { ThunkDispatch } from 'redux-thunk';
import type { Workflow } from '../constants/publishModes';
import type {
  BaseField,
  Collection,
  CollectionFile,
  CollectionFileWithDefaults,
  CollectionWithDefaults,
  Config,
  ConfigWithDefaults,
  Field,
  FilesCollection,
  FilesCollectionWithDefaults,
  FolderCollection,
  FolderCollectionWithDefaults,
  I18nInfo,
  LocalBackend,
  UnknownField,
} from '../interface';
import type { RootState } from '../store';

function traverseFields(fields: Field[], updater: (field: Field) => Field): Field[] {
  return fields.map(field => {
    const newField = updater(field);
    if ('fields' in newField && newField.fields) {
      return { ...newField, fields: traverseFields(newField.fields, updater) } as Field;
    } else if (newField.widget === 'list' && newField.types) {
      return { ...newField, types: traverseFields(newField.types, updater) } as Field;
    }

    return newField as Field;
  });
}

function getConfigUrl() {
  const validTypes: { [type: string]: string } = {
    'text/yaml': 'yaml',
    'application/x-yaml': 'yaml',
  };
  const configLinkEl = document.querySelector<HTMLLinkElement>('link[rel="cms-config-url"]');
  if (configLinkEl && validTypes[configLinkEl.type] && configLinkEl.href) {
    console.info(`[StaticCMS] Using config file path: "${configLinkEl.href}"`);
    return configLinkEl.href;
  }

  return `${window.location.origin}${window.location.pathname.slice(
    0,
    window.location.pathname.lastIndexOf('/'),
  )}/config.yml`;
}

const setFieldDefaults =
  (collection: Collection, config: Config, collectionFile?: CollectionFile) => (field: Field) => {
    if ('media_folder' in field && !('public_folder' in field)) {
      return { ...field, public_folder: field.media_folder };
    }

    if (field.widget === 'image' || field.widget === 'file' || field.widget === 'markdown') {
      field.media_library = {
        ...(config.media_library ?? {}),
        ...(collectionFile?.media_library ?? {}),
        ...(collection.media_library ?? {}),
        ...(field.media_library ?? {}),
      };
    }

    return field;
  };

function setI18nField<T extends BaseField = UnknownField>(field: T) {
  if (field.i18n === true) {
    return { ...field, ['i18n']: I18N_FIELD_TRANSLATE };
  } else if (field.i18n === false || !field['i18n']) {
    return { ...field, ['i18n']: I18N_FIELD_NONE };
  }
  return field;
}

function getI18nDefaults(
  collectionOrFileI18n: boolean | Partial<I18nInfo>,
  { default_locale, locales = ['en'], structure = I18N_STRUCTURE_SINGLE_FILE }: Partial<I18nInfo>,
): I18nInfo {
  if (typeof collectionOrFileI18n === 'boolean') {
    return { default_locale, locales, structure };
  } else {
    const mergedI18n: I18nInfo = deepmerge(
      { default_locale, locales, structure },
      collectionOrFileI18n,
    );
    mergedI18n.locales = collectionOrFileI18n.locales ?? locales;
    mergedI18n.default_locale = collectionOrFileI18n.default_locale || locales?.[0];
    throwOnMissingDefaultLocale(mergedI18n);
    return mergedI18n;
  }
}

function setI18nDefaultsForFields(collectionOrFileFields: Field[], hasI18n: boolean) {
  if (hasI18n) {
    return traverseFields(collectionOrFileFields, setI18nField);
  } else {
    return traverseFields(collectionOrFileFields, field => {
      const newField = { ...field };
      delete newField.i18n;
      return newField;
    });
  }
}

function throwOnInvalidFileCollectionStructure(i18n?: Partial<I18nInfo>) {
  if (i18n && i18n.structure !== I18N_STRUCTURE_SINGLE_FILE) {
    throw new Error(
      `i18n configuration for files collections is limited to ${I18N_STRUCTURE_SINGLE_FILE} structure`,
    );
  }
}

function throwOnMissingDefaultLocale(i18n?: Partial<I18nInfo>) {
  if (i18n && i18n.default_locale && !i18n.locales?.includes(i18n.default_locale)) {
    throw new Error(
      `i18n locales '${i18n.locales?.join(', ')}' are missing the default locale ${
        i18n.default_locale
      }`,
    );
  }
}

function applyFolderCollectionDefaults(
  originalCollection: FolderCollection,
  collectionI18n: I18nInfo | undefined,
  config: Config,
): FolderCollectionWithDefaults {
  const collection: FolderCollectionWithDefaults = {
    ...originalCollection,
    view_filters: undefined,
    view_groups: undefined,
    i18n: collectionI18n,
  };

  if (collection.path && !collection.media_folder) {
    // default value for media folder when using the path config
    collection.media_folder = '';
  }

  if ('media_folder' in collection && !('public_folder' in collection)) {
    collection.public_folder = collection.media_folder;
  }

  if ('fields' in collection && collection.fields) {
    collection.fields = traverseFields(collection.fields, setFieldDefaults(collection, config));
  }

  collection.folder = trim(collection.folder, '/');
  collection.publish = collection.publish ?? true;

  return collection;
}

function applyCollectionFileDefaults(
  originalFile: CollectionFile,
  collection: Collection,
  collectionI18n: I18nInfo | undefined,
  config: Config,
): CollectionFileWithDefaults {
  const file: CollectionFileWithDefaults = {
    ...originalFile,
    i18n: undefined,
  };

  file.file = trimStart(file.file, '/');

  if ('media_folder' in file && !('public_folder' in file)) {
    file.public_folder = file.media_folder;
  }

  file.media_library = {
    ...(collection.media_library ?? {}),
    ...(file.media_library ?? {}),
  };

  if (file.fields) {
    file.fields = traverseFields(file.fields, setFieldDefaults(collection, config, file));
  }

  let fileI18n: I18nInfo | undefined;

  if (originalFile.i18n && collectionI18n) {
    fileI18n = getI18nDefaults(originalFile.i18n, {
      locales: collectionI18n.locales,
      default_locale: collectionI18n.default_locale,
      structure: collectionI18n.structure,
    });
    file.i18n = fileI18n;
  } else {
    fileI18n = undefined;
    delete file.i18n;
  }

  throwOnInvalidFileCollectionStructure(fileI18n);

  if (file.fields) {
    file.fields = setI18nDefaultsForFields(file.fields, Boolean(fileI18n));
  }

  if (collection.editor && !file.editor) {
    file.editor = collection.editor;
  }

  return file;
}

function applyFilesCollectionDefaults(
  originalCollection: FilesCollection,
  collectionI18n: I18nInfo | undefined,
  config: Config,
): FilesCollectionWithDefaults {
  const collection: FilesCollectionWithDefaults = {
    ...originalCollection,
    i18n: collectionI18n,
    view_filters: undefined,
    view_groups: undefined,
    files: originalCollection.files.map(f =>
      applyCollectionFileDefaults(f, originalCollection, collectionI18n, config),
    ),
  };

  throwOnInvalidFileCollectionStructure(collectionI18n);

  return collection;
}

function applyCollectionDefaults(
  originalCollection: Collection,
  config: Config,
): CollectionWithDefaults {
  let collection: CollectionWithDefaults;

  let collectionI18n: I18nInfo | undefined;

  if (config.i18n && originalCollection.i18n) {
    collectionI18n = getI18nDefaults(originalCollection.i18n, config.i18n);
  } else {
    collectionI18n = undefined;
  }

  if ('folder' in originalCollection) {
    collection = applyFolderCollectionDefaults(originalCollection, collectionI18n, config);
  } else {
    collection = applyFilesCollectionDefaults(originalCollection, collectionI18n, config);
  }

  if (config.editor && !collection.editor) {
    collection.editor = config.editor;
  }

  collection.media_library = {
    ...(config.media_library ?? {}),
    ...(collection.media_library ?? {}),
  };

  if ('fields' in collection && collection.fields) {
    collection.fields = setI18nDefaultsForFields(collection.fields, Boolean(collectionI18n));
  }

  const { view_filters, view_groups } = originalCollection;

  if (!collection.sortable_fields) {
    collection.sortable_fields = {
      fields: selectDefaultSortableFields(collection, config),
    };
  }

  collection.view_filters = {
    default: originalCollection.view_filters?.default,
    filters: (view_filters?.filters ?? []).map(filter => {
      return {
        ...filter,
        id: `${filter.field}__${filter.pattern}`,
      };
    }),
  };

  collection.view_groups = {
    default: originalCollection.view_groups?.default,
    groups: (view_groups?.groups ?? []).map(group => {
      return {
        ...group,
        id: `${group.field}__${group.pattern}`,
      };
    }),
  };

  return collection;
}

export function applyDefaults<EF extends BaseField = UnknownField>(
  originConfig: Config<EF>,
): ConfigWithDefaults<EF> {
  const clonedConfig = cloneDeep(originConfig) as Config;

  const i18n = clonedConfig.i18n;

  if (i18n) {
    i18n.default_locale = i18n.default_locale ?? i18n.locales[0];
  }

  throwOnMissingDefaultLocale(i18n);

  const config: ConfigWithDefaults = {
    ...clonedConfig,
    collections: (clonedConfig.collections ?? []).map(c =>
      applyCollectionDefaults(c, clonedConfig),
    ),
  };

  config.publish_mode = config.publish_mode ?? SIMPLE_PUBLISH_MODE;
  config.slug = config.slug ?? {};
  config.collections = config.collections ?? [];

  // Use `site_url` as default `display_url`.
  if (!config.display_url && config.site_url) {
    config.display_url = config.site_url;
  }

  // Use media_folder as default public_folder.
  const defaultPublicFolder = `/${trimStart(config.media_folder, '/')}`;
  if (!('public_folder' in config)) {
    config.public_folder = defaultPublicFolder;
  }

  // default values for the slug config
  if (!('encoding' in config.slug)) {
    config.slug.encoding = 'unicode';
  }

  if (!('clean_accents' in config.slug)) {
    config.slug.clean_accents = false;
  }

  if (!('sanitize_replacement' in config.slug)) {
    config.slug.sanitize_replacement = '-';
  }

  return config as ConfigWithDefaults<EF>;
}

export function parseConfig(data: string) {
  const config = yaml.parse(data, { maxAliasCount: -1, prettyErrors: true, merge: true });
  if (
    typeof window !== 'undefined' &&
    typeof window.CMS_ENV === 'string' &&
    config[window.CMS_ENV]
  ) {
    const configKeys = Object.keys(config[window.CMS_ENV]) as ReadonlyArray<keyof Config>;
    for (const key of configKeys) {
      config[key] = config[window.CMS_ENV][key] as Config[keyof Config];
    }
  }
  return config as Config;
}

async function getConfigYaml(file: string): Promise<Config> {
  const response = await fetch(file, { credentials: 'same-origin' }).catch(error => error as Error);
  if (response instanceof Error || response.status !== 200) {
    const message = response instanceof Error ? response.message : response.status;
    throw new Error(`Failed to load config.yml (${message})`);
  }
  const contentType = response.headers.get('Content-Type') ?? 'Not-Found';
  const isYaml = contentType.indexOf('yaml') !== -1;
  if (!isYaml) {
    console.info(`[StaticCMS] Response for ${file} was not yaml. (Content-Type: ${contentType})`);
  }
  return parseConfig(await response.text());
}

export function configLoaded(config: ConfigWithDefaults, originalConfig: Config) {
  return {
    type: CONFIG_SUCCESS,
    payload: {
      config,
      originalConfig,
    },
  } as const;
}

export function configLoading() {
  return {
    type: CONFIG_REQUEST,
  } as const;
}

export function configFailed(err: Error) {
  return {
    type: CONFIG_FAILURE,
    error: 'Error loading config',
    payload: err,
  } as const;
}

export async function detectProxyServer(localBackend?: boolean | LocalBackend) {
  const allowedHosts = [
    'localhost',
    '127.0.0.1',
    ...(typeof localBackend === 'boolean' ? [] : localBackend?.allowed_hosts || []),
  ];

  if (!allowedHosts.includes(location.hostname) || !localBackend) {
    return {};
  }

  const defaultUrl = 'http://localhost:8081/api/v1';
  const proxyUrl =
    localBackend === true
      ? defaultUrl
      : localBackend.url || defaultUrl.replace('localhost', location.hostname);

  try {
    console.info(`[StaticCMS] Looking for Static CMS Proxy Server at '${proxyUrl}'`);
    const res = await fetch(`${proxyUrl}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'info' }),
    });
    const { repo, publish_modes, type } = (await res.json()) as {
      repo?: string;
      publish_modes?: Workflow[];
      type?: string;
    };
    if (typeof repo === 'string' && Array.isArray(publish_modes) && typeof type === 'string') {
      console.info(
        `[StaticCMS] Detected Static CMS Proxy Server at '${proxyUrl}' with repo: '${repo}'`,
      );
      return { proxyUrl, publish_modes, type };
    } else {
      console.info(`[StaticCMS] Static CMS Proxy Server not detected at '${proxyUrl}'`);
      return {};
    }
  } catch {
    console.info(`[StaticCMS] Static CMS Proxy Server not detected at '${proxyUrl}'`);
    return {};
  }
}

function getPublishMode(config: Config, publishModes?: Workflow[], backendType?: string) {
  if (config.publish_mode && publishModes && !publishModes.includes(config.publish_mode)) {
    const newPublishMode = publishModes[0];
    console.info(
      `'${config.publish_mode}' is not supported by '${backendType}' backend, switching to '${newPublishMode}'`,
    );
    return newPublishMode;
  }

  return config.publish_mode;
}

export async function handleLocalBackend(originalConfig: Config) {
  if (!originalConfig.local_backend) {
    return originalConfig;
  }

  const {
    proxyUrl,
    publish_modes: publishModes,
    type: backendType,
  } = await detectProxyServer(originalConfig.local_backend);

  if (!proxyUrl) {
    return originalConfig;
  }

  return produce(originalConfig, config => {
    config.backend.name = 'proxy';
    config.backend.proxy_url = proxyUrl;

    if (config.publish_mode) {
      config.publish_mode = getPublishMode(config as Config, publishModes, backendType);
    }
  });
}

export function loadConfig(
  manualConfig: Config | undefined,
  onLoad: (config: ConfigWithDefaults) => unknown,
) {
  return async (dispatch: ThunkDispatch<RootState, {}, AnyAction>) => {
    dispatch(configLoading());

    try {
      let originalConfig: Config;

      if (window.CMS_CONFIG) {
        originalConfig = window.CMS_CONFIG;
      } else {
        const configUrl = getConfigUrl();
        originalConfig = manualConfig ? manualConfig : await getConfigYaml(configUrl);
      }

      validateConfig(originalConfig);

      const withLocalBackend = await handleLocalBackend(originalConfig);
      const config = applyDefaults(withLocalBackend);

      dispatch(configLoaded(config, originalConfig));

      if (typeof onLoad === 'function') {
        onLoad(config);
      }
    } catch (error: unknown) {
      console.error(error);
      if (error instanceof Error) {
        dispatch(configFailed(error));
      }
      throw error;
    }
  };
}

export type ConfigAction = ReturnType<
  typeof configLoading | typeof configLoaded | typeof configFailed
>;
