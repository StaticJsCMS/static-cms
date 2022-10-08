import type { PropertiesSchema } from 'ajv/dist/types/json-schema';
import type { ComponentType, FocusEvent, ReactNode } from 'react';
import type { PluggableList } from 'react-markdown';
import type { t, TranslateProps as ReactPolyglotTranslateProps } from 'react-polyglot';
import type { MediaFile as BackendMediaFile } from './backend';
import type { EditorControlProps } from './components/Editor/EditorControlPane/EditorControl';
import type { CollectionType } from './constants/collectionTypes';
import type { formatExtensions } from './formats/formats';
import type { I18N_STRUCTURE } from './lib/i18n';
import type { AllowedEvent } from './lib/registry';
import type Cursor from './lib/util/Cursor';

export interface SlugConfig {
  encoding: string;
  clean_accents: boolean;
  sanitize_replacement: string;
}

export interface Pages {
  [collection: string]: { isFetching?: boolean; page?: number; ids: string[] };
}

export type SortableField =
  | {
      key: string;
      name: string;
      label: string;
    }
  | ({
      key: string;
    } & CmsField);

export interface SortObject {
  key: string;
  direction: SortDirection;
}

export type SortMap = Record<string, SortObject>;

export type Sort = Record<string, SortMap>;

export type FilterMap = ViewFilter & { active?: boolean };

export type GroupMap = ViewGroup & { active?: boolean };

export type Filter = Record<string, Record<string, FilterMap>>; // collection.field.active

export type Group = Record<string, Record<string, GroupMap>>; // collection.field.active

export interface GroupOfEntries {
  id: string;
  label: string;
  value: string | boolean | undefined;
  paths: Set<string>;
}

export type ValueOrNestedValue =
  | string
  | number
  | boolean
  | string[]
  | number[]
  | null
  | undefined
  | ValueOrNestedValue[]
  | {
      [key: string]: ValueOrNestedValue;
    };

export type EntryData = Record<string, ValueOrNestedValue> | undefined | null;
export type EntryMeta = Record<string, ValueOrNestedValue> | undefined | null;

export interface Entry {
  collection: string;
  slug: string;
  path: string;
  partial: boolean;
  raw: string;
  data: EntryData;
  label: string | null;
  isModification: boolean | null;
  mediaFiles: MediaFile[];
  author: string;
  updatedOn: string;
  status?: string;
  meta: EntryMeta;
  newRecord?: boolean;
  isFetching?: boolean;
  isPersisting?: boolean;
  isDeleting?: boolean;
  error?: string;
  i18n?: {
    [locale: string]: {
      data: EntryData;
    };
  };
}

export type Entities = Record<string, Entry>;

export interface FieldError {
  type: string;
  parentIds?: string[];
  message?: string;
}

export interface FieldsErrors {
  [field: string]: FieldError[];
}

export type FieldValidationMethod = (
  field: CmsField,
  value: ValueOrNestedValue | null | undefined,
  parentIds: string[],
  t: t,
) => {
  error: false | FieldError;
};

export interface EntryDraft {
  entry: Entry;
  fieldsErrors: FieldsErrors;
  fieldsMetaData?: Record<string, Record<string, string>>;
}

export interface FilterRule {
  value: string;
  field: string;
}

export interface CollectionFile {
  file: string;
  name: string;
  fields: CmsField[];
  label: string;
  media_folder?: string;
  public_folder?: string;
  preview_path?: string;
  preview_path_date_field?: string;
  editor?: {
    preview?: boolean;
  };
}

interface Nested {
  summary?: string;
  depth: number;
}

interface Meta {
  path?: { label: string; widget: string; index_file: string };
}

export interface I18nSettings {
  currentLocale: string;
  defaultLocale: string;
  locales: string[];
}

export type Format = keyof typeof formatExtensions;

export interface i18nCollection extends Omit<Collection, 'i18n'> {
  i18n: Required<Collection>['i18n'];
}

export interface Collection {
  name: string;
  description?: string;
  icon?: string;
  folder?: string;
  files?: CollectionFile[];
  fields: CmsField[];
  isFetching?: boolean;
  media_folder?: string;
  public_folder?: string;
  preview_path?: string;
  preview_path_date_field?: string;
  summary?: string;
  filter?: FilterRule;
  type: 'file_based_collection' | 'folder_based_collection';
  extension?: string;
  format?: Format;
  frontmatter_delimiter?: string | [string, string];
  create?: boolean;
  delete?: boolean;
  identifier_field?: string;
  path?: string;
  slug?: string;
  label_singular?: string;
  label: string;
  sortable_fields: CmsSortableFields;
  view_filters: ViewFilter[];
  view_groups: ViewGroup[];
  nested?: Nested;
  meta?: Meta;
  i18n?:
    | boolean
    | {
        structure: I18N_STRUCTURE;
        locales: string[];
        default_locale: string;
      };
  hide?: boolean;
  editor?: {
    preview?: boolean;
  };
}

export type Collections = Record<string, Collection>;

export interface MediaLibraryInstance {
  show: (args: {
    id?: string;
    value?: string;
    config: Record<string, unknown>;
    allowMultiple?: boolean;
    imagesOnly?: boolean;
  }) => void;
  hide?: () => void;
  onClearControl?: (args: { id: string }) => void;
  onRemoveControl?: (args: { id: string }) => void;
  enableStandalone: () => boolean;
}

export type MediaFile = BackendMediaFile & { key?: string };

export interface DisplayURLState {
  isFetching: boolean;
  url?: string;
  err?: Error;
}

export type Hook = string | boolean;

export interface Integration {
  hooks: string[];
  collections?: string | string[];
  provider: string;
}

export type TranslatedProps<T> = T & ReactPolyglotTranslateProps;

export type GetAssetFunction = (path: string, field?: CmsField) => AssetProxy;

export interface CmsWidgetControlProps<T, F extends CmsField = CmsField> {
  classNameWidget?: string;
  classNameWidgetActive?: string;
  classNameWrapper: string;
  clearFieldErrors: EditorControlProps['clearFieldErrors'];
  clearSearch: EditorControlProps['clearSearch'];
  collapsed?: boolean;
  collection: Collection;
  config: CmsConfig;
  entry: Entry;
  field: F;
  fieldsErrors: FieldsErrors;
  forID: string;
  forList?: boolean;
  getAsset: GetAssetFunction;
  hasActiveStyle: boolean;
  hasError?: boolean;
  isDisabled: boolean;
  isEditorComponent: boolean;
  isFetching: boolean;
  isFieldDuplicate: EditorControlProps['isFieldDuplicate'];
  isFieldHidden: EditorControlProps['isFieldHidden'];
  isNewEditorComponent: boolean;
  loadEntry: EditorControlProps['loadEntry'];
  locale: string | undefined;
  mediaPaths: Record<string, string | string[]>;
  metadata: EntryMeta;
  onAddAsset: EditorControlProps['addAsset'];
  onChange: (value: T | undefined | null, newMetadata?: EntryMeta) => void;
  onChangeObject: (field: CmsField, newValue: ValueOrNestedValue, newMetadata?: EntryMeta) => void;
  onClearMediaControl: EditorControlProps['clearMediaControl'];
  onOpenMediaLibrary: EditorControlProps['openMediaLibrary'];
  onPersistMedia: EditorControlProps['persistMedia'];
  onRemoveInsertedMedia: EditorControlProps['removeInsertedMedia'];
  onRemoveMediaControl: EditorControlProps['removeMediaControl'];
  onValidateObject: (uniqueFieldId: string, errors: FieldError[]) => void;
  parentIds: string[];
  query: EditorControlProps['query'];
  queryHits: Entry[];
  setActiveStyle: (event?: FocusEvent) => void;
  setInactiveStyle: (event?: FocusEvent) => void;
  t: t;
  validate: (newValue: T | undefined | null) => void;
  value: T | undefined | null;
}

export interface CmsWidgetPreviewProps<T = unknown, F extends CmsField = CmsField> {
  entry: Entry;
  field: F;
  fieldsMetaData: EntryMeta;
  getAsset: GetAssetFunction;
  getRemarkPlugins: () => PluggableList;
  metadata?: EntryMeta;
  resolveWidget: <W = unknown, WF extends CmsField = CmsField>(name: string) => Widget<W, WF>;
  value: T | undefined | null;
}

export type CmsWidgetPreviewComponent<T = unknown, F extends CmsField = CmsField> =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  | React.ReactElement<unknown, string | React.JSXElementConstructor<any>>
  | ComponentType<CmsWidgetPreviewProps<T, F>>;

export interface CmsTemplatePreviewProps {
  collection: Collection;
  fields: CmsField[];
  entry: Entry;
  fieldsMetaData: Record<string, EntryMeta>;
  getAsset: GetAssetFunction;
  widgetFor: (name: string) => ReactNode;
  widgetsFor: (name: string) =>
    | {
        data: EntryData | null;
        widgets: Record<string, React.ReactNode>;
      }
    | {
        data: EntryData | null;
        widgets: Record<string, React.ReactNode>;
      }[];
}

export type CmsTemplatePreviewComponent =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  | React.ReactElement<unknown, string | React.JSXElementConstructor<any>>
  | ComponentType<CmsTemplatePreviewProps>;

export interface WidgetOptions<T = unknown, F extends CmsField = CmsField> {
  validator?: Widget<T, F>['validator'];
  getValidValue?: Widget<T, F>['getValidValue'];
  schema?: Widget<T, F>['schema'];
  globalStyles?: string;
  allowMapValue?: boolean;
}

export interface Widget<T = unknown, F extends CmsField = CmsField> {
  control: ComponentType<CmsWidgetControlProps<T, F>>;
  preview?: CmsWidgetPreviewComponent<T, F>;
  validator: (props: {
    field: F;
    value: T | undefined | null;
    t: t;
  }) => false | { error: false | FieldError } | Promise<false | { error: false | FieldError }>;
  getValidValue: (value: T | undefined | null) => T | undefined | null;
  schema?: PropertiesSchema<unknown>;
  globalStyles?: string;
  allowMapValue?: boolean;
}

export interface CmsWidgetParam<T = unknown, F extends CmsField = CmsField> {
  name: string;
  controlComponent: Widget<T, F>['control'];
  previewComponent?: Widget<T, F>['preview'];
  options?: WidgetOptions<T, F>;
}

export interface PreviewTemplateComponentProps {
  entry: Entry;
  collection: Collection;
  widgetFor: (name: string) => ReactNode;
  widgetsFor: (name: string) =>
    | {
        data: EntryData | null;
        widgets: Record<string, React.ReactNode>;
      }
    | {
        data: EntryData | null;
        widgets: Record<string, React.ReactNode>;
      }[];
  getAsset: GetAssetFunction;
  boundGetAsset: (collection: Collection, path: string) => GetAssetFunction;
  fieldsMetaData: Record<string, EntryMeta>;
  config: CmsConfig;
  fields: CmsField[];
  isLoadingAsset: boolean;
  window: Window;
  document: Document;
}

export interface PersistOptions {
  newEntry?: boolean;
  commitMessage: string;
  collectionName?: string;
  status?: string;
}

export interface ImplementationEntry {
  data: string;
  file: { path: string; label?: string; id?: string | null; author?: string; updatedOn?: string };
}

export interface DisplayURLObject {
  id: string;
  path: string;
}

export type DisplayURL = DisplayURLObject | string;

export interface ImplementationMediaFile {
  name: string;
  id: string;
  size?: number;
  displayURL?: DisplayURL;
  path: string;
  draft?: boolean;
  url?: string;
  file?: File;
}

export interface DataFile {
  path: string;
  slug: string;
  raw: string;
  newPath?: string;
}

export interface AssetProxy {
  path: string;
  fileObj?: File;
  toBase64?: () => Promise<string>;
  toString: () => string;
}

export interface BackendEntry {
  dataFiles: DataFile[];
  assets: AssetProxy[];
}

export type DeleteOptions = {};

export interface Credentials {
  token: string | {};
  refresh_token?: string;
}

export type User = Credentials & {
  backendName?: string;
  login?: string;
  name?: string;
  avatar_url?: string;
};

export interface ImplementationFile {
  id?: string | null | undefined;
  label?: string;
  path: string;
}

export interface AuthenticatorConfig {
  site_id?: string;
  base_url?: string;
  auth_endpoint?: string;
  auth_token_endpoint?: string;
  auth_url?: string;
  app_id?: string;
  clearHash?: () => void;
}

export abstract class CmsBackendClass {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(_config: CmsConfig, _options: CmsBackendInitializerOptions) {}

  abstract authComponent(): (props: TranslatedProps<AuthenticationPageProps>) => JSX.Element;
  abstract restoreUser(user: User): Promise<User>;

  abstract authenticate(credentials: Credentials): Promise<User>;
  abstract logout(): Promise<void> | void | null;
  abstract getToken(): Promise<string | null>;

  abstract getEntry(path: string): Promise<ImplementationEntry>;
  abstract entriesByFolder(
    folder: string,
    extension: string,
    depth: number,
  ): Promise<ImplementationEntry[]>;
  abstract entriesByFiles(files: ImplementationFile[]): Promise<ImplementationEntry[]>;

  abstract getMediaDisplayURL(displayURL: DisplayURL): Promise<string>;
  abstract getMedia(folder?: string): Promise<ImplementationMediaFile[]>;
  abstract getMediaFile(path: string): Promise<ImplementationMediaFile>;

  abstract persistEntry(entry: BackendEntry, opts: PersistOptions): Promise<void>;
  abstract persistMedia(file: AssetProxy, opts: PersistOptions): Promise<ImplementationMediaFile>;
  abstract deleteFiles(paths: string[], commitMessage: string): Promise<unknown>;

  abstract allEntriesByFolder(
    folder: string,
    extension: string,
    depth: number,
  ): Promise<ImplementationEntry[]>;
  abstract traverseCursor(
    cursor: Cursor,
    action: string,
  ): Promise<{ entries: ImplementationEntry[]; cursor: Cursor }>;

  abstract isGitBackend(): boolean;
  abstract status(): Promise<{
    auth: { status: boolean };
    api: { status: boolean; statusPage: string };
  }>;
}

export interface CmsLocalePhrasesRoot {
  [property: string]: CmsLocalePhrases;
}
export type CmsLocalePhrases = string | { [property: string]: CmsLocalePhrases };

export type CmsIcon = () => JSX.Element;

export type CmsWidgetValueSerializer = {
  serialize: (value: ValueOrNestedValue) => ValueOrNestedValue;
  deserialize: (value: ValueOrNestedValue) => ValueOrNestedValue;
};

export type CmsMediaLibraryOptions = Record<string, unknown>;

export interface CmsMediaLibraryInitOptions {
  options: Record<string, unknown> | undefined;
  handleInsert: (url: string | string[]) => void;
}

export interface CmsMediaLibraryExternalLibrary {
  name: string;
  config?: CmsMediaLibraryOptions;
  init: ({ options, handleInsert }: CmsMediaLibraryInitOptions) => Promise<MediaLibraryInstance>;
}

export interface CmsMediaLibraryInternalOptions {
  allow_multiple?: boolean;
}

export type CmsMediaLibrary = CmsMediaLibraryExternalLibrary | CmsMediaLibraryInternalOptions;

export type CmsBackendType =
  | 'azure'
  | 'git-gateway'
  | 'github'
  | 'gitlab'
  | 'bitbucket'
  | 'test-repo'
  | 'proxy';

export type CmsMapWidgetType = 'Point' | 'LineString' | 'Polygon';

export type CmsMarkdownWidgetButton =
  | 'bold'
  | 'italic'
  | 'code'
  | 'link'
  | 'heading-one'
  | 'heading-two'
  | 'heading-three'
  | 'heading-four'
  | 'heading-five'
  | 'heading-six'
  | 'quote'
  | 'code-block'
  | 'bulleted-list'
  | 'numbered-list';

export interface CmsSelectWidgetOptionObject {
  label: string;
  value: string;
}

export type CmsCollectionFormatType =
  | 'yml'
  | 'yaml'
  | 'toml'
  | 'json'
  | 'frontmatter'
  | 'yaml-frontmatter'
  | 'toml-frontmatter'
  | 'json-frontmatter';

export type CmsAuthScope = 'repo' | 'public_repo';

export type CmsSlugEncoding = 'unicode' | 'ascii';

export interface CmsI18nConfig {
  structure: 'multiple_folders' | 'multiple_files' | 'single_file';
  locales: string[];
  default_locale?: string;
}

export interface CmsFieldBase {
  name: string;
  label?: string;
  required?: boolean;
  hint?: string;
  pattern?: [string, string];
  i18n?: boolean | 'translate' | 'duplicate' | 'none';
  media_folder?: string;
  public_folder?: string;
  comment?: string;
}

export interface CmsFieldBoolean extends CmsFieldBase {
  widget: 'boolean';
  default?: boolean;
}

export interface CmsFieldCode extends CmsFieldBase {
  widget: 'code';
  default?: unknown;

  default_language?: string;
  allow_language_selection?: boolean;
  keys?: { code: string; lang: string };
  output_code_only?: boolean;

  codeMirrorConfig: {
    extraKeys?: Record<string, string>;
  } & Record<string, unknown>;
}

export interface CmsFieldColor extends CmsFieldBase {
  widget: 'color';
  default?: string;

  allowInput?: boolean;
  enableAlpha?: boolean;
}

export interface CmsFieldDateTime extends CmsFieldBase {
  widget: 'datetime';
  default?: string;

  format?: string;
  date_format?: boolean | string;
  time_format?: boolean | string;
  picker_utc?: boolean;

  /**
   * @deprecated Use date_format instead
   */
  dateFormat?: boolean | string;
  /**
   * @deprecated Use time_format instead
   */
  timeFormat?: boolean | string;
  /**
   * @deprecated Use picker_utc instead
   */
  pickerUtc?: boolean;
}

export interface CmsFieldFileOrImage extends CmsFieldBase {
  widget: 'file' | 'image';
  default?: string;

  media_library?: CmsMediaLibrary;
  allow_multiple?: boolean;
  config?: unknown;
}

export interface CmsFieldObject extends CmsFieldBase {
  widget: 'object';
  default?: unknown;

  collapsed?: boolean;
  summary?: string;
  fields: CmsField[];
}

export type ListValue = string | boolean | number | { [key: string]: ListValue };

export interface CmsFieldList extends CmsFieldBase {
  widget: 'list';
  default?: unknown;

  allow_add?: boolean;
  collapsed?: boolean;
  summary?: string;
  minimize_collapsed?: boolean;
  label_singular?: string;
  field?: CmsField;
  fields?: CmsField[];
  max?: number;
  min?: number;
  add_to_top?: boolean;
  types?: CmsField[];
  typeKey?: string;
}

export interface CmsFieldMap extends CmsFieldBase {
  widget: 'map';
  default?: string;

  decimals?: number;
  type?: CmsMapWidgetType;
}

export interface CmsFieldMarkdown extends CmsFieldBase {
  widget: 'markdown';
  default?: string;

  minimal?: boolean;
  buttons?: CmsMarkdownWidgetButton[];
  editor_components?: string[];
  modes?: ('raw' | 'rich_text')[];

  /**
   * @deprecated Use editor_components instead
   */
  editorComponents?: string[];
}

export interface CmsFieldNumber extends CmsFieldBase {
  widget: 'number';
  default?: string | number;

  value_type?: 'int' | 'float' | string;
  min?: number;
  max?: number;

  step?: number;

  /**
   * @deprecated Use valueType instead
   */
  valueType?: 'int' | 'float' | string;
}

export interface CmsFieldSelect extends CmsFieldBase {
  widget: 'select';
  default?: string | string[];

  options: string[] | CmsSelectWidgetOptionObject[];
  multiple?: boolean;
  min?: number;
  max?: number;
}

export interface CmsFieldRelation extends CmsFieldBase {
  widget: 'relation';
  default?: string | string[];

  collection: string;
  value_field: string;
  search_fields: string[];
  file?: string;
  display_fields?: string[];
  multiple?: boolean;
  min?: number;
  max?: number;
  options_length?: number;

  /**
   * @deprecated Use value_field instead
   */
  valueField?: string;
  /**
   * @deprecated Use search_fields instead
   */
  searchFields?: string[];
  /**
   * @deprecated Use display_fields instead
   */
  displayFields?: string[];
  /**
   * @deprecated Use options_length instead
   */
  optionsLength?: number;
}

export interface CmsFieldHidden extends CmsFieldBase {
  widget: 'hidden';
  default?: unknown;
}

export interface CmsFieldStringOrText extends CmsFieldBase {
  // This is the default widget, so declaring its type is optional.
  widget?: 'string' | 'text';
  default?: string;
}

export interface CmsFieldMeta extends CmsFieldBase {
  name: string;
  label: string;
  widget: string;
  required: boolean;
  index_file: string;
  meta: boolean;
}

export type CmsField =
  | CmsFieldBoolean
  | CmsFieldCode
  | CmsFieldColor
  | CmsFieldDateTime
  | CmsFieldFileOrImage
  | CmsFieldList
  | CmsFieldMap
  | CmsFieldMarkdown
  | CmsFieldNumber
  | CmsFieldObject
  | CmsFieldRelation
  | CmsFieldSelect
  | CmsFieldHidden
  | CmsFieldStringOrText
  | CmsFieldMeta;

export interface CmsCollectionFile {
  name: string;
  label: string;
  file: string;
  fields: CmsField[];
  label_singular?: string;
  description?: string;
  preview_path?: string;
  preview_path_date_field?: string;
  i18n?: boolean | CmsI18nConfig;
  media_folder?: string;
  public_folder?: string;
  editor?: {
    preview?: boolean;
  };
}

export interface ViewFilter {
  id: string;
  label: string;
  field: string;
  pattern: string;
}

export interface ViewGroup {
  id: string;
  label: string;
  field: string;
  pattern?: string;
}

export enum SortDirection {
  Ascending = 'Ascending',
  Descending = 'Descending',
  None = 'None',
}

export interface CmsSortableFieldsDefault {
  field: string;
  direction?: SortDirection;
}

export interface CmsSortableFields {
  default?: CmsSortableFieldsDefault;
  fields: string[];
}

export interface CmsCollection {
  name: string;
  type?: CollectionType;
  icon?: string;
  label: string;
  label_singular?: string;
  description?: string;
  folder?: string;
  files?: CmsCollectionFile[];
  identifier_field?: string;
  summary?: string;
  slug?: string;
  preview_path?: string;
  preview_path_date_field?: string;
  create?: boolean;
  delete?: boolean;
  hide?: boolean;
  editor?: {
    preview?: boolean;
  };
  publish?: boolean;
  nested?: {
    depth: number;
  };
  meta?: { path?: { label: string; widget: string; index_file: string } };

  /**
   * It accepts the following values: yml, yaml, toml, json, md, markdown, html
   *
   * You may also specify a custom extension not included in the list above, by specifying the format value.
   */
  extension?: string;
  format?: CmsCollectionFormatType;

  frontmatter_delimiter?: string[] | string;
  fields?: CmsField[];
  filter?: { field: string; value: string };
  path?: string;
  media_folder?: string;
  public_folder?: string;
  sortable_fields?: CmsSortableFields;
  view_filters?: ViewFilter[];
  view_groups?: ViewGroup[];
  i18n?: boolean | CmsI18nConfig;
}

export interface CmsBackend {
  name: CmsBackendType;
  auth_scope?: CmsAuthScope;
  repo?: string;
  branch?: string;
  api_root?: string;
  api_version?: string;
  tenant_id?: string;
  site_domain?: string;
  base_url?: string;
  auth_endpoint?: string;
  app_id?: string;
  auth_type?: 'implicit' | 'pkce';
  proxy_url?: string;
  large_media_url?: string;
  login?: boolean;
  use_graphql?: boolean;
  graphql_api_root?: string;
  use_large_media_transforms_in_media_library?: boolean;
  identity_url?: string;
  gateway_url?: string;
  commit_messages?: {
    create?: string;
    update?: string;
    delete?: string;
    uploadMedia?: string;
    deleteMedia?: string;
  };
}

export interface CmsSlug {
  encoding?: CmsSlugEncoding;
  clean_accents?: boolean;
  sanitize_replacement?: string;
}

export interface CmsLocalBackend {
  url?: string;
  allowed_hosts?: string[];
}

export interface CmsConfig {
  backend: CmsBackend;
  collections: CmsCollection[];
  locale?: string;
  site_id?: string;
  site_url?: string;
  display_url?: string;
  base_url?: string;
  logo_url?: string;
  media_folder?: string;
  public_folder?: string;
  media_folder_relative?: boolean;
  media_library?: CmsMediaLibrary;
  load_config_file?: boolean;
  integrations?: CmsIntegration[];
  slug?: CmsSlug;
  i18n?: CmsI18nConfig;
  local_backend?: boolean | CmsLocalBackend;
  editor?: {
    preview?: boolean;
  };
  search?: boolean;
}

export interface InitOptions {
  config: CmsConfig;
}

export interface CmsBackendInitializerOptions {
  updateUserCredentials: (credentials: Credentials) => void;
}

export interface CmsBackendInitializer {
  init: (config: CmsConfig, options: CmsBackendInitializerOptions) => CmsBackendClass;
}

export interface EditorComponentWidgetOptions {
  id: string;
  label: string;
  widget: string;
  type: string;
}

export interface EditorComponentManualOptions<T = EntryData> {
  id: string;
  label: string;
  fields: CmsField[];
  pattern: RegExp;
  allow_add?: boolean;
  fromBlock: (match: RegExpMatchArray) => T;
  toBlock: (data: T) => string;
  toPreview: (data: T, getAsset: GetAssetFunction, fields: CmsField[]) => ReactNode;
}

export function isEditorComponentWidgetOptions(
  options: EditorComponentOptions,
): options is EditorComponentWidgetOptions {
  return 'widget' in options;
}

export type EditorComponentOptions = EditorComponentManualOptions | EditorComponentWidgetOptions;

export interface EventData {
  entry: Entry;
  author: { login: string | undefined; name: string };
}

export interface CmsEventListener {
  name: AllowedEvent;
  handler: (
    data: EventData,
    options: Record<string, unknown>,
  ) => Promise<EntryData | undefined | null | void>;
}

export type CmsEventListenerOptions = Record<string, unknown>;

export interface AdditionalLink {
  id: string;
  title: string;
  data: string | (() => JSX.Element);
  options?: {
    iconName?: string;
  };
}

export interface AuthenticationPageProps {
  onLogin: (user: User) => void;
  inProgress?: boolean;
  base_url?: string;
  siteId?: string;
  authEndpoint?: string;
  config: CmsConfig;
  error?: string | undefined;
  clearHash?: () => void;
}

export type CmsIntegration = {
  collections?: '*' | string[];
} & (AlgoliaIntegration | AssetStoreIntegration);

export type CmsIntegrationProvider = CmsIntegration['provider'];
export type CmsSearchIntegrationProvider = 'algolia';
export type CmsMediaIntegrationProvider = 'assetStore';

export interface AlgoliaIntegration extends AlgoliaConfig {
  provider: 'algolia';
}

export interface AlgoliaConfig {
  hooks: ['search' | 'listEntries'];
  applicationID: string;
  apiKey: string;
  indexPrefix?: string;
}

export interface AssetStoreIntegration extends AssetStoreConfig {
  provider: 'assetStore';
}

export interface AssetStoreConfig {
  hooks: ['assetStore'];
  shouldConfirmUpload?: boolean;
  getSignedFormURL: string;
}

export interface SearchResponse {
  entries: Entry[];
  pagination: number;
}

export interface SearchQueryResponse {
  hits: Entry[];
  query: string;
}

export interface EditorPersistOptions {
  createNew?: boolean;
  duplicate?: boolean;
}

export interface I18nInfo {
  locales: string[];
  defaultLocale: string;
  structure?: I18N_STRUCTURE;
}

export interface ProcessedCodeLanguage {
  label: string;
  identifiers: string[];
  codemirror_mode: string;
  codemirror_mime_type: string;
}
