import type { JSONSchemaType } from 'ajv';
import type { ComponentType, FocusEventHandler, ReactNode } from 'react';
import type { PluggableList } from 'react-markdown';
import type { t, TranslateProps as ReactPolyglotTranslateProps } from 'react-polyglot';
import type { MediaFile as BackendMediaFile } from './backend';
import type { CollectionType } from './constants/collectionTypes';
import type { formatExtensions } from './formats/formats';
import type { I18N_STRUCTURE } from './lib/i18n';
import type { AllowedEvent } from './lib/registry';
import type Cursor from './lib/util/Cursor';
import type { AuthState } from './reducers/auth';
import type { CollectionsState } from './reducers/collections';
import type { ConfigState } from './reducers/config';
import type { CursorsState } from './reducers/cursors';
import type { EntriesState } from './reducers/entries';
import type { EntryDraftState } from './reducers/entryDraft';
import type { GlobalUIState } from './reducers/globalUI';
import type { IntegrationsState } from './reducers/integrations';
import type { MediaLibraryState } from './reducers/mediaLibrary';
import type { MediasState } from './reducers/medias';
import type { ScrollState } from './reducers/scroll';
import type { SearchState } from './reducers/search';
import type { StatusState } from './reducers/status';
import type { SnackbarState } from './store/slices/snackbars';

export interface SlugConfig {
  encoding: string;
  clean_accents: boolean;
  sanitize_replacement: string;
}

export interface Pages {
  [collection: string]: { isFetching?: boolean; page?: number; ids: string[] };
}

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
  | ValueOrNestedValue[]
  | {
      [key: string]: ValueOrNestedValue;
    };

export type EntryData = Record<string, ValueOrNestedValue>;
export type EntryMeta = {
  path?: string;
} & Record<string, ValueOrNestedValue>;

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
  error?: string;
  i18n?: {
    [locale: string]: CmsLocalePhrasesRoot;
  };
}

export type Entities = Record<string, Entry>;

export interface FieldsErrors {
  [field: string]: { type: string; parentIds: string; message?: string }[];
}

export interface EntryDraft {
  entry: Entry;
  fieldsErrors: FieldsErrors;
  fieldsMetaData?: Record<string, Record<string, string>>;
}

export interface EntryField {
  field?: EntryField;
  fields?: EntryField[];
  types?: EntryField[];
  widget: string;
  name: string;
  default: string | null | boolean | unknown[];
  media_folder?: string;
  public_folder?: string;
  comment?: string;
  meta?: boolean;
  i18n: 'translate' | 'duplicate' | 'none';
}

export interface FilterRule {
  value: string;
  field: string;
}

export interface CollectionFile {
  file: string;
  name: string;
  fields: EntryField[];
  label: string;
  media_folder?: string;
  public_folder?: string;
  preview_path?: string;
  preview_path_date_field?: string;
}

interface Nested {
  depth: number;
}

interface Meta {
  path?: { label: string; widget: string; index_file: string };
}

interface i18n {
  structure: I18N_STRUCTURE;
  locales: string[];
  default_locale: string;
}

export type Format = keyof typeof formatExtensions;

export interface Collection {
  name: string;
  icon?: string;
  folder?: string;
  files?: CollectionFile[];
  fields: EntryField[];
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
  frontmatter_delimiter?: string[] | string | [string, string];
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
  i18n: i18n;
  hide?: boolean;
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

export interface State {
  auth: AuthState;
  config: ConfigState;
  cursors: CursorsState;
  collections: CollectionsState;
  globalUI: GlobalUIState;
  entries: EntriesState;
  entryDraft: EntryDraftState;
  integrations: IntegrationsState;
  medias: MediasState;
  mediaLibrary: MediaLibraryState;
  search: SearchState;
  status: StatusState;
  scroll: ScrollState;
  snackbar: SnackbarState;
}

export interface Integration {
  hooks: string[];
  collections?: string | string[];
  provider: string;
}

interface EntryPayload {
  collection: string;
}

export interface EntryRequestPayload extends EntryPayload {
  slug: string;
}

export interface EntrySuccessPayload extends EntryPayload {
  entry: Entry;
}

export interface EntryFailurePayload extends EntryPayload {
  slug: string;
  error: Error;
}

export interface EntryDeletePayload {
  entrySlug: string;
  collectionName: string;
}

export type EntriesRequestPayload = EntryPayload;

export interface EntriesSuccessPayload extends EntryPayload {
  entries: Entry[];
  append: boolean;
  page: number;
}
export interface EntriesSortRequestPayload extends EntryPayload {
  key: string;
  direction: string;
}

export interface EntriesSortFailurePayload extends EntriesSortRequestPayload {
  error: Error;
}

export interface EntriesFilterRequestPayload {
  filter: ViewFilter;
  collection: string;
}

export interface EntriesFilterFailurePayload {
  filter: ViewFilter;
  collection: string;
  error: Error;
}

export interface EntriesGroupRequestPayload {
  group: ViewGroup;
  collection: string;
}

export interface EntriesGroupFailurePayload {
  group: ViewGroup;
  collection: string;
  error: Error;
}

export interface ChangeViewStylePayload {
  style: string;
}

export interface EntriesMoveSuccessPayload extends EntryPayload {
  entries: Entry[];
}

export type TranslatedProps<T> = T & ReactPolyglotTranslateProps;

export type GetAssetFunction = (path: string, field?: EntryField) => AssetProxy;

export interface CmsWidgetControlProps<T = unknown> {
  value: T;
  field: CmsField;
  onChange: (value: T) => void;
  forID: string;
  classNameWrapper: string;
  setActiveStyle: FocusEventHandler;
  setInactiveStyle: FocusEventHandler;
  t: t;
}

export interface CmsWidgetPreviewProps<T = unknown> {
  value: T;
  field: CmsField;
  metadata?: Record<string, unknown>;
  getAsset: GetAssetFunction;
  entry: Entry;
  fieldsMetaData: Record<string, EntryMeta>;
  resolveWidget: <W = unknown>(name: string) => RegisteredWidget<W>;
  getRemarkPlugins: () => PluggableList;
}

export type CmsWidgetPreviewComponent<T = unknown> =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  | React.ReactElement<unknown, string | React.JSXElementConstructor<any>>
  | ComponentType<CmsWidgetPreviewProps<T>>;

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

export interface RegisteredWidget<T = unknown> extends Record<string, unknown> {
  control: ComponentType<CmsWidgetControlProps<T>>;
  preview?: CmsWidgetPreviewComponent<T>;
  validator: (props: {
    field: CmsField;
    value: T | undefined | null;
    t: t;
  }) => boolean | { error: unknown } | Promise<boolean | { error: unknown }>;
  schema?: JSONSchemaType<unknown>;
  globalStyles?: string;
  allowMapValue?: boolean;
}

export interface CmsWidgetParam<T = unknown> extends Record<string, unknown> {
  name: string;
  controlComponent: RegisteredWidget<T>['control'];
  previewComponent: RegisteredWidget<T>['preview'];
  validator?: RegisteredWidget<T>['validator'];
  schema: RegisteredWidget<T>['schema'];
  globalStyles?: string;
  allowMapValue?: boolean;
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
  serialize: (value: EntryData) => EntryData;
  deserialize: (value: EntryData) => EntryData;
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
  name: string;
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
  value: any;
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

export interface CmsFieldBoolean {
  widget: 'boolean';
  default?: boolean;
}

export interface CmsFieldCode {
  widget: 'code';
  default?: any;

  default_language?: string;
  allow_language_selection?: boolean;
  keys?: { code: string; lang: string };
  output_code_only?: boolean;
}

export interface CmsFieldColor {
  widget: 'color';
  default?: string;

  allowInput?: boolean;
  enableAlpha?: boolean;
}

export interface CmsFieldDateTime {
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

export interface CmsFieldFileOrImage {
  widget: 'file' | 'image';
  default?: string;

  media_library?: CmsMediaLibrary;
  allow_multiple?: boolean;
  config?: any;
}

export interface CmsFieldObject {
  widget: 'object';
  default?: any;

  collapsed?: boolean;
  summary?: string;
  fields: CmsField[];
}

export interface CmsFieldList {
  widget: 'list';
  default?: any;

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
  types?: (CmsFieldBase & CmsFieldObject)[];
}

export interface CmsFieldMap {
  widget: 'map';
  default?: string;

  decimals?: number;
  type?: CmsMapWidgetType;
}

export interface CmsFieldMarkdown {
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

export interface CmsFieldNumber {
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

export interface CmsFieldSelect {
  widget: 'select';
  default?: string | string[];

  options: string[] | CmsSelectWidgetOptionObject[];
  multiple?: boolean;
  min?: number;
  max?: number;
}

export interface CmsFieldRelation {
  widget: 'relation';
  default?: string | string[];

  collection: string;
  value_field: string;
  search_fields: string[];
  file?: string;
  display_fields?: string[];
  multiple?: boolean;
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

export interface CmsFieldHidden {
  widget: 'hidden';
  default?: any;
}

export interface CmsFieldStringOrText {
  // This is the default widget, so declaring its type is optional.
  widget?: 'string' | 'text';
  default?: string;
}

export interface CmsFieldMeta {
  name: string;
  label: string;
  widget: string;
  required: boolean;
  index_file: string;
  meta: boolean;
}

export type CmsField = CmsFieldBase &
  (
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
    | CmsFieldMeta
  );

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
  filter?: { field: string; value: any };
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
  toPreview: (data: T, getAsset: GetAssetFunction, fields: EntryField[]) => ReactNode;
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
  options?: {
    data?: string | (() => JSX.Element);
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
  provider: 'asset-store';
}

export interface AssetStoreConfig {
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
