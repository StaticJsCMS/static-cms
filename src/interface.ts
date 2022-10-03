import type { List, Map, OrderedMap, Set } from 'immutable';
import type { ComponentType, FocusEventHandler } from 'react';
import type { t, TranslateProps as ReactPolyglotTranslateProps } from 'react-polyglot';
import type { Action } from 'redux';
import type { Pluggable } from 'unified';
import type { MediaFile as BackendMediaFile } from './backend';
import type { CollectionType } from './constants/collectionTypes';
import type { formatExtensions } from './formats/formats';
import type { AllowedEvent } from './lib/registry';
import type Cursor from './lib/util/Cursor';
import type { Auth } from './reducers/auth';
import type { GlobalUI } from './reducers/globalUI';
import type { Medias } from './reducers/medias';
import type { ScrollState } from './reducers/scroll';
import type { Search } from './reducers/search';
import type { Status } from './reducers/status';
import type { SnackbarState } from './store/slices/snackbars';
import type { StaticallyTypedRecord } from './types/immutable';

export type SlugConfig = StaticallyTypedRecord<{
  encoding: string;
  clean_accents: boolean;
  sanitize_replacement: string;
}>;

type BackendObject = {
  name: string;
  repo?: string | null;
  branch?: string;
  api_root?: string;
  use_graphql?: boolean;
  preview_context?: string;
  identity_url?: string;
  gateway_url?: string;
  large_media_url?: string;
  use_large_media_transforms_in_media_library?: boolean;
  commit_messages: Map<string, string>;
};

type Backend = StaticallyTypedRecord<Backend> & BackendObject;

export type Config = StaticallyTypedRecord<{
  backend: Backend;
  media_folder: string;
  public_folder: string;
  media_library: StaticallyTypedRecord<{ name: string }> & { name: string };
  locale?: string;
  slug: SlugConfig;
  media_folder_relative?: boolean;
  base_url?: string;
  site_id?: string;
  site_url?: string;
  isFetching?: boolean;
  integrations: List<Integration>;
  collections: List<StaticallyTypedRecord<{ name: string }>>;
}>;

type PagesObject = {
  [collection: string]: { isFetching: boolean; page: number; ids: List<string> };
};

type Pages = StaticallyTypedRecord<PagesObject>;

type EntitiesObject = { [key: string]: EntryMap };

export type SortObject = { key: string; direction: SortDirection };

export type SortMap = OrderedMap<string, StaticallyTypedRecord<SortObject>>;

export type Sort = Map<string, SortMap>;

export type FilterMap = StaticallyTypedRecord<ViewFilter & { active: boolean }>;

export type GroupMap = StaticallyTypedRecord<ViewGroup & { active: boolean }>;

export type Filter = Map<string, Map<string, FilterMap>>; // collection.field.active

export type Group = Map<string, Map<string, GroupMap>>; // collection.field.active

export type GroupOfEntries = {
  id: string;
  label: string;
  value: string | boolean | undefined;
  paths: Set<string>;
};

export type Entities = StaticallyTypedRecord<EntitiesObject>;

export type Entries = StaticallyTypedRecord<{
  pages: Pages & PagesObject;
  entities: Entities & EntitiesObject;
  sort: Sort;
  filter: Filter;
  group: Group;
  viewStyle: string;
}>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type EntryObject = {
  path: string;
  slug: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  collection: string;
  mediaFiles: List<MediaFileMap>;
  newRecord: boolean;
  author?: string;
  updatedOn?: string;
  status: string;
  meta: StaticallyTypedRecord<{ path: string }>;
};

export type EntryMap = StaticallyTypedRecord<EntryObject>;

export type Entry = EntryMap & EntryObject;

export type FieldsErrors = StaticallyTypedRecord<{ [field: string]: { type: string }[] }>;

export type EntryDraft = StaticallyTypedRecord<{
  entry: Entry;
  fieldsErrors: FieldsErrors;
  fieldsMetaData?: Map<string, Map<string, string>>;
}>;

export type EntryField = StaticallyTypedRecord<{
  field?: EntryField;
  fields?: List<EntryField>;
  types?: List<EntryField>;
  widget: string;
  name: string;
  default: string | null | boolean | List<unknown>;
  media_folder?: string;
  public_folder?: string;
  comment?: string;
  meta?: boolean;
  i18n: 'translate' | 'duplicate' | 'none';
}>;

export type EntryFields = List<EntryField>;

export type FilterRule = StaticallyTypedRecord<{
  value: string;
  field: string;
}>;

export type CollectionFile = StaticallyTypedRecord<{
  file: string;
  name: string;
  fields: EntryFields;
  label: string;
  media_folder?: string;
  public_folder?: string;
  preview_path?: string;
  preview_path_date_field?: string;
}>;

export type CollectionFiles = List<CollectionFile>;

type NestedObject = { depth: number };

type Nested = StaticallyTypedRecord<NestedObject>;

type PathObject = { label: string; widget: string; index_file: string };

type MetaObject = {
  path?: StaticallyTypedRecord<PathObject>;
};

type Meta = StaticallyTypedRecord<MetaObject>;

type i18n = StaticallyTypedRecord<{
  structure: string;
  locales: string[];
  default_locale: string;
}>;

export type Format = keyof typeof formatExtensions;

type CollectionObject = {
  name: string;
  icon?: string;
  folder?: string;
  files?: CollectionFiles;
  fields: EntryFields;
  isFetching: boolean;
  media_folder?: string;
  public_folder?: string;
  preview_path?: string;
  preview_path_date_field?: string;
  summary?: string;
  filter?: FilterRule;
  type: 'file_based_collection' | 'folder_based_collection';
  extension?: string;
  format?: Format;
  frontmatter_delimiter?: List<string> | string | [string, string];
  create?: boolean;
  delete?: boolean;
  identifier_field?: string;
  path?: string;
  slug?: string;
  label_singular?: string;
  label: string;
  sortable_fields: StaticallyTypedRecord<CmsSortableFields>;
  view_filters: List<StaticallyTypedRecord<ViewFilter>>;
  view_groups: List<StaticallyTypedRecord<ViewGroup>>;
  nested?: Nested;
  meta?: Meta;
  i18n: i18n;
};

export type Collection = StaticallyTypedRecord<CollectionObject>;

export type Collections = StaticallyTypedRecord<{ [path: string]: Collection & CollectionObject }>;

export interface MediaLibraryInstance {
  show: (args: {
    id?: string;
    value?: string;
    config: StaticallyTypedRecord<{}>;
    allowMultiple?: boolean;
    imagesOnly?: boolean;
  }) => void;
  hide: () => void;
  onClearControl: (args: { id: string }) => void;
  onRemoveControl: (args: { id: string }) => void;
  enableStandalone: () => boolean;
}

export type MediaFile = BackendMediaFile & { key?: string };

export type MediaFileMap = StaticallyTypedRecord<MediaFile>;

type DisplayURLStateObject = {
  isFetching: boolean;
  url?: string;
  err?: Error;
};

export type DisplayURLState = StaticallyTypedRecord<DisplayURLStateObject>;

interface DisplayURLsObject {
  [id: string]: DisplayURLState;
}

export type MediaLibrary = StaticallyTypedRecord<{
  externalLibrary?: MediaLibraryInstance;
  files: MediaFile[];
  displayURLs: StaticallyTypedRecord<DisplayURLsObject> & DisplayURLsObject;
  isLoading: boolean;
}>;

export type Hook = string | boolean;

export type Integrations = StaticallyTypedRecord<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  hooks: { [collectionOrHook: string]: any };
}>;

export type Cursors = StaticallyTypedRecord<{}>;

export interface State {
  auth: Auth;
  config: CmsConfig;
  cursors: Cursors;
  collections: Collections;
  globalUI: GlobalUI;
  entries: Entries;
  entryDraft: EntryDraft;
  integrations: Integrations;
  medias: Medias;
  mediaLibrary: MediaLibrary;
  search: Search;
  status: Status;
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
  entry: EntryObject;
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
  entries: EntryObject[];
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
  entries: EntryObject[];
}

export interface EntriesAction extends Action<string> {
  payload:
    | EntryRequestPayload
    | EntrySuccessPayload
    | EntryFailurePayload
    | EntriesSuccessPayload
    | EntriesRequestPayload
    | EntryDeletePayload;
  meta: {
    collection: string;
  };
}

export type TranslatedProps<T> = T & ReactPolyglotTranslateProps;

export type GetAssetFunction = (asset: string) => {
  url: string;
  path: string;
  field?: any;
  fileObj: File;
};

export interface CmsWidgetControlProps<T = any> {
  value: T;
  field: Map<string, any>;
  onChange: (value: T) => void;
  forID: string;
  classNameWrapper: string;
  setActiveStyle: FocusEventHandler;
  setInactiveStyle: FocusEventHandler;
  t: t;
}

export interface CmsWidgetPreviewProps<T = any> {
  value: T;
  field: Map<string, any>;
  metadata: Map<string, any>;
  getAsset: GetAssetFunction;
  entry: Map<string, any>;
  fieldsMetaData: Map<string, any>;
}

export interface CmsWidgetParam<T = any> {
  name: string;
  controlComponent: ComponentType<CmsWidgetControlProps<T>>;
  previewComponent?: ComponentType<CmsWidgetPreviewProps<T>>;
  validator?: (props: {
    field: Map<string, any>;
    value: T | undefined | null;
    t: t;
  }) => boolean | { error: any } | Promise<boolean | { error: any }>;
  globalStyles?: any;
}

export interface CmsWidget<T = any> {
  control: ComponentType<CmsWidgetControlProps<T>>;
  preview?: ComponentType<CmsWidgetPreviewProps<T>>;
  globalStyles?: any;
}

export type PreviewTemplateComponentProps = {
  entry: Map<string, any>;
  collection: Map<string, any>;
  widgetFor: (name: any, fields?: any, values?: any, fieldsMetaData?: any) => JSX.Element | null;
  widgetsFor: (name: any) => any;
  getAsset: GetAssetFunction;
  boundGetAsset: (collection: any, path: any) => GetAssetFunction;
  fieldsMetaData: Map<string, any>;
  config: Map<string, any>;
  fields: List<Map<string, any>>;
  isLoadingAsset: boolean;
  window: Window;
  document: Document;
};
export type DisplayURLObject = { id: string; path: string };

export type DisplayURL = DisplayURLObject | string;

export type DataFile = {
  path: string;
  slug: string;
  raw: string;
  newPath?: string;
};

export type AssetProxy = {
  path: string;
  fileObj?: File;
  toBase64?: () => Promise<string>;
};

export type BackendEntry = {
  dataFiles: DataFile[];
  assets: AssetProxy[];
};

export type PersistOptions = {
  newEntry?: boolean;
  commitMessage: string;
  collectionName?: string;
  status?: string;
};

export type DeleteOptions = {};

export type Credentials = { token: string | {}; refresh_token?: string };

export type User = Credentials & {
  backendName?: string;
  login?: string;
  name: string;
};

export interface ImplementationEntry {
  data: string;
  file: { path: string; label?: string; id?: string | null; author?: string; updatedOn?: string };
}

export type ImplementationFile = {
  id?: string | null | undefined;
  label?: string;
  path: string;
};
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

export type CursorStoreObject = {
  actions: Set<string>;
  data: Map<string, unknown>;
  meta: Map<string, unknown>;
};

export type CursorStore = {
  get<K extends keyof CursorStoreObject>(
    key: K,
    defaultValue?: CursorStoreObject[K],
  ): CursorStoreObject[K];
  getIn<V>(path: string[]): V;
  set<K extends keyof CursorStoreObject, V extends CursorStoreObject[K]>(
    key: K,
    value: V,
  ): CursorStoreObject[K];
  setIn(path: string[], value: unknown): CursorStore;
  hasIn(path: string[]): boolean;
  mergeIn(path: string[], value: unknown): CursorStore;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  update: (...args: any[]) => CursorStore;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateIn: (...args: any[]) => CursorStore;
};

export interface Implementation {
  authComponent: () => void;
  restoreUser: (user: User) => Promise<User>;

  authenticate: (credentials: Credentials) => Promise<User>;
  logout: () => Promise<void> | void | null;
  getToken: () => Promise<string | null>;

  getEntry: (path: string) => Promise<ImplementationEntry>;
  entriesByFolder: (
    folder: string,
    extension: string,
    depth: number,
  ) => Promise<ImplementationEntry[]>;
  entriesByFiles: (files: ImplementationFile[]) => Promise<ImplementationEntry[]>;

  getMediaDisplayURL?: (displayURL: DisplayURL) => Promise<string>;
  getMedia: (folder?: string) => Promise<ImplementationMediaFile[]>;
  getMediaFile: (path: string) => Promise<ImplementationMediaFile>;

  persistEntry: (entry: BackendEntry, opts: PersistOptions) => Promise<void>;
  persistMedia: (file: AssetProxy, opts: PersistOptions) => Promise<ImplementationMediaFile>;
  deleteFiles: (paths: string[], commitMessage: string) => Promise<void>;

  allEntriesByFolder?: (
    folder: string,
    extension: string,
    depth: number,
  ) => Promise<ImplementationEntry[]>;
  traverseCursor?: (
    cursor: Cursor,
    action: string,
  ) => Promise<{ entries: ImplementationEntry[]; cursor: Cursor }>;

  isGitBackend?: () => boolean;
  status: () => Promise<{
    auth: { status: boolean };
    api: { status: boolean; statusPage: string };
  }>;
}

export interface CmsRegistryBackend {
  init: (args: any) => Implementation;
}

export type CmsLocalePhrasesRoot = { [property: string]: CmsLocalePhrases };
export type CmsLocalePhrases = string | { [property: string]: CmsLocalePhrases };

export type CmsIcon = () => JSX.Element;

export type CmsWidgetValueSerializer = any; // TODO: type properly

export type CmsMediaLibraryOptions = any; // TODO: type properly

export interface CmsMediaLibrary {
  name: string;
  config?: CmsMediaLibraryOptions;
}

export interface PreviewStyleOptions {
  raw: boolean;
}

export interface PreviewStyle extends PreviewStyleOptions {
  value: string;
}

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
  site_domain?: string;
  base_url?: string;
  auth_endpoint?: string;
  app_id?: string;
  auth_type?: 'implicit' | 'pkce';
  proxy_url?: string;
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
  site_url?: string;
  display_url?: string;
  logo_url?: string;
  media_folder?: string;
  public_folder?: string;
  media_folder_relative?: boolean;
  media_library?: CmsMediaLibrary;
  load_config_file?: boolean;
  integrations?: {
    hooks: string[];
    provider: string;
    collections?: '*' | string[];
    applicationID?: string;
    apiKey?: string;
    getSignedFormURL?: string;
  }[];
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

export type CmsBackendClass = Implementation;

export interface EditorComponentField {
  name: string;
  label: string;
  widget: string;
}

export interface EditorComponentWidgetOptions {
  id: string;
  label: string;
  widget: string;
  type: string;
}

export interface EditorComponentManualOptions {
  id: string;
  label: string;
  fields: EditorComponentField[];
  pattern: RegExp;
  allow_add?: boolean;
  fromBlock: (match: RegExpMatchArray) => any;
  toBlock: (data: any) => string;
  toPreview: (data: any) => string;
}

export function isEditorComponentWidgetOptions(
  options: EditorComponentOptions,
): options is EditorComponentWidgetOptions {
  return 'widget' in options;
}

export type EditorComponentOptions = EditorComponentManualOptions | EditorComponentWidgetOptions;

export interface EventData {
  entry: EntryMap;
  author: { login: string | undefined; name: string };
}

export interface CmsEventListener {
  name: AllowedEvent;
  handler: (data: EventData, options: Record<string, unknown>) => Promise<EventData | void>;
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
