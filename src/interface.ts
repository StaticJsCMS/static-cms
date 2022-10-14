import type { PropertiesSchema } from 'ajv/dist/types/json-schema';
import type { ComponentType, ReactNode } from 'react';
import type { t, TranslateProps as ReactPolyglotTranslateProps } from 'react-polyglot';
import type { Pluggable } from 'unified';
import type { MediaFile as BackendMediaFile } from './backend';
import type { EditorControlProps } from './components/Editor/EditorControlPane/EditorControl';
import type { formatExtensions } from './formats/formats';
import type { I18N_STRUCTURE } from './lib/i18n';
import type { AllowedEvent } from './lib/registry';
import type Cursor from './lib/util/Cursor';
import type AssetProxy from './valueObjects/AssetProxy';

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
    } & Field);

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

export type ObjectValue = {
  [key: string]: ValueOrNestedValue;
};

export type ValueOrNestedValue =
  | string
  | number
  | boolean
  | string[]
  | number[]
  | null
  | undefined
  | ValueOrNestedValue[]
  | ObjectValue;

export type EntryData = ObjectValue | undefined | null;

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
  field: Field,
  value: ValueOrNestedValue | null | undefined,
  parentIds: string[],
  t: t,
) => {
  error: false | FieldError;
};

export interface EntryDraft {
  entry: Entry;
  fieldsErrors: FieldsErrors;
}

export interface FilterRule {
  value: string;
  field: string;
}

export interface CollectionFile {
  name: string;
  label: string;
  file: string;
  fields: Field[];
  label_singular?: string;
  description?: string;
  media_folder?: string;
  public_folder?: string;
  i18n?: boolean | I18nInfo;
  editor?: {
    preview?: boolean;
  };
}

interface Nested {
  summary?: string;
  depth: number;
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
  fields: Field[];
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
  sortable_fields: SortableFields;
  view_filters: ViewFilter[];
  view_groups: ViewGroup[];
  nested?: Nested;
  i18n?: boolean | I18nInfo;
  hide?: boolean;
  editor?: {
    preview?: boolean;
  };
}

export type Collections = Record<string, Collection>;

export interface MediaLibraryInstance {
  show: (args: {
    id?: string;
    value?: string | string[];
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

export type TranslatedProps<T> = T & ReactPolyglotTranslateProps;

export type GetAssetFunction = (path: string, field?: Field) => AssetProxy;

export interface WidgetControlProps<T, F extends Field = Field> {
  clearFieldErrors: EditorControlProps['clearFieldErrors'];
  clearSearch: EditorControlProps['clearSearch'];
  collapsed?: boolean;
  collection: Collection;
  config: Config;
  entry: Entry;
  field: F;
  fieldsErrors: FieldsErrors;
  forList?: boolean;
  getAsset: GetAssetFunction;
  hasError?: boolean;
  isDisabled: boolean;
  isEditorComponent: boolean;
  isFetching: boolean;
  isFieldDuplicate: EditorControlProps['isFieldDuplicate'];
  isFieldHidden: EditorControlProps['isFieldHidden'];
  isNewEditorComponent: boolean;
  label: string;
  loadEntry: EditorControlProps['loadEntry'];
  locale: string | undefined;
  mediaPaths: Record<string, string | string[]>;
  onAddAsset: EditorControlProps['addAsset'];
  onChange: EditorControlProps['onChange'];
  onClearMediaControl: EditorControlProps['clearMediaControl'];
  onOpenMediaLibrary: EditorControlProps['openMediaLibrary'];
  onPersistMedia: EditorControlProps['persistMedia'];
  onRemoveInsertedMedia: EditorControlProps['removeInsertedMedia'];
  onRemoveMediaControl: EditorControlProps['removeMediaControl'];
  onValidate: EditorControlProps['onValidate'];
  path: string;
  query: EditorControlProps['query'];
  queryHits: Entry[];
  t: t;
  value: T | undefined | null;
}

export interface WidgetPreviewProps<T = unknown, F extends Field = Field> {
  entry: Entry;
  field: F;
  getAsset: GetAssetFunction;
  getRemarkPlugins: () => Pluggable[];
  resolveWidget: <W = unknown, WF extends Field = Field>(name: string) => Widget<W, WF>;
  value: T | undefined | null;
}

export type WidgetPreviewComponent<T = unknown, F extends Field = Field> =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  | React.ReactElement<unknown, string | React.JSXElementConstructor<any>>
  | ComponentType<WidgetPreviewProps<T, F>>;

export interface TemplatePreviewProps {
  collection: Collection;
  fields: Field[];
  entry: Entry;
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

export type TemplatePreviewComponent =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  | React.ReactElement<unknown, string | React.JSXElementConstructor<any>>
  | ComponentType<TemplatePreviewProps>;

export interface WidgetOptions<T = unknown, F extends Field = Field> {
  validator?: Widget<T, F>['validator'];
  getValidValue?: Widget<T, F>['getValidValue'];
  schema?: Widget<T, F>['schema'];
  globalStyles?: string;
  allowMapValue?: boolean;
}

export interface Widget<T = unknown, F extends Field = Field> {
  control: ComponentType<WidgetControlProps<T, F>>;
  preview?: WidgetPreviewComponent<T, F>;
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

export interface WidgetParam<T = unknown, F extends Field = Field> {
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
  config: Config;
  fields: Field[];
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

export abstract class BackendClass {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(_config: Config, _options: BackendInitializerOptions) {}

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

export interface LocalePhrasesRoot {
  [property: string]: LocalePhrases;
}
export type LocalePhrases = string | { [property: string]: LocalePhrases };

export type CustomIcon = () => JSX.Element;

export type WidgetValueSerializer = {
  serialize: (value: ValueOrNestedValue) => ValueOrNestedValue;
  deserialize: (value: ValueOrNestedValue) => ValueOrNestedValue;
};

export type MediaLibraryOptions = Record<string, unknown>;

export interface MediaLibraryInitOptions {
  options: Record<string, unknown> | undefined;
  handleInsert: (url: string | string[]) => void;
}

export interface MediaLibraryExternalLibrary {
  name: string;
  config?: MediaLibraryOptions;
  init: ({ options, handleInsert }: MediaLibraryInitOptions) => Promise<MediaLibraryInstance>;
}

export interface MediaLibraryInternalOptions {
  allow_multiple?: boolean;
  choose_url?: boolean;
}

export type MediaLibrary = MediaLibraryExternalLibrary | MediaLibraryInternalOptions;

export type BackendType =
  | 'azure'
  | 'git-gateway'
  | 'github'
  | 'gitlab'
  | 'bitbucket'
  | 'test-repo'
  | 'proxy';

export type MapWidgetType = 'Point' | 'LineString' | 'Polygon';

export type MarkdownWidgetButton =
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

export interface SelectWidgetOptionObject {
  label: string;
  value: string;
}

export type AuthScope = 'repo' | 'public_repo';

export type SlugEncoding = 'unicode' | 'ascii';

export interface FieldBase {
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

export interface FieldBoolean extends FieldBase {
  widget: 'boolean';
  default?: boolean;
}

export interface FieldCode extends FieldBase {
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

export interface FieldColor extends FieldBase {
  widget: 'color';
  default?: string;

  allowInput?: boolean;
  enableAlpha?: boolean;
}

export interface FieldDateTime extends FieldBase {
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

export interface FieldFileOrImage extends FieldBase {
  widget: 'file' | 'image';
  default?: string;

  media_library?: MediaLibrary;
  private?: boolean;
}

export interface FieldObject extends FieldBase {
  widget: 'object';
  default?: unknown;

  collapsed?: boolean;
  summary?: string;
  fields: Field[];
}

export interface FieldList extends FieldBase {
  widget: 'list';
  default?: unknown;

  allow_add?: boolean;
  collapsed?: boolean;
  summary?: string;
  minimize_collapsed?: boolean;
  label_singular?: string;
  field?: Field;
  fields?: Field[];
  max?: number;
  min?: number;
  add_to_top?: boolean;
  types?: Field[];
  typeKey?: string;
}

export interface FieldMap extends FieldBase {
  widget: 'map';
  default?: string;

  decimals?: number;
  type?: MapWidgetType;
  height?: string;
}

export interface FieldMarkdown extends FieldBase {
  widget: 'markdown';
  default?: string;

  minimal?: boolean;
  buttons?: MarkdownWidgetButton[];
  editor_components?: string[];

  /**
   * @deprecated Use editor_components instead
   */
  editorComponents?: string[];
  sanitize_preview?: boolean;
  media_library?: MediaLibrary;
  media_folder?: string;
  public_folder?: string;
}

export interface FieldNumber extends FieldBase {
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

export interface FieldSelect extends FieldBase {
  widget: 'select';
  default?: string | string[];

  options: string[] | SelectWidgetOptionObject[];
  multiple?: boolean;
  min?: number;
  max?: number;
}

export interface FieldRelation extends FieldBase {
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

export interface FieldHidden extends FieldBase {
  widget: 'hidden';
  default?: unknown;
}

export interface FieldStringOrText extends FieldBase {
  // This is the default widget, so declaring its type is optional.
  widget?: 'string' | 'text';
  default?: string;
}

export type Field =
  | FieldBoolean
  | FieldCode
  | FieldColor
  | FieldDateTime
  | FieldFileOrImage
  | FieldList
  | FieldMap
  | FieldMarkdown
  | FieldNumber
  | FieldObject
  | FieldRelation
  | FieldSelect
  | FieldHidden
  | FieldStringOrText;

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

export interface SortableFieldsDefault {
  field: string;
  direction?: SortDirection;
}

export interface SortableFields {
  default?: SortableFieldsDefault;
  fields: string[];
}

export interface Backend {
  name: BackendType;
  auth_scope?: AuthScope;
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

export interface Slug {
  encoding?: SlugEncoding;
  clean_accents?: boolean;
  sanitize_replacement?: string;
}

export interface LocalBackend {
  url?: string;
  allowed_hosts?: string[];
}

export interface Config {
  backend: Backend;
  collections: Collection[];
  locale?: string;
  site_id?: string;
  site_url?: string;
  display_url?: string;
  base_url?: string;
  logo_url?: string;
  media_folder?: string;
  public_folder?: string;
  media_folder_relative?: boolean;
  media_library?: MediaLibrary;
  load_config_file?: boolean;
  integrations?: Integration[];
  slug?: Slug;
  i18n?: I18nInfo;
  local_backend?: boolean | LocalBackend;
  editor?: {
    preview?: boolean;
  };
  search?: boolean;
}

export interface InitOptions {
  config: Config;
}

export interface BackendInitializerOptions {
  updateUserCredentials: (credentials: Credentials) => void;
}

export interface BackendInitializer {
  init: (config: Config, options: BackendInitializerOptions) => BackendClass;
}

export interface EditorComponentWidgetOptions {
  id: string;
  label: string;
  widget?: string;
  type: string;
}

export interface EditorComponentManualOptions<T = EntryData> {
  id: string;
  label: string;
  fields: Field[];
  pattern: RegExp;
  allow_add?: boolean;
  fromBlock: (match: RegExpMatchArray) => T;
  toBlock: (data: T) => string;
  toPreview: (data: T, getAsset: GetAssetFunction, fields: Field[]) => ReactNode;
}

export function isEditorComponentWidgetOptions(
  options: EditorComponentOptions,
): options is EditorComponentWidgetOptions {
  return 'widget' in options;
}

export type EditorComponentOptions<T = EntryData> =
  | EditorComponentManualOptions<T>
  | EditorComponentWidgetOptions;

export interface EventData {
  entry: Entry;
  author: { login: string | undefined; name: string };
}

export interface EventListener {
  name: AllowedEvent;
  handler: (
    data: EventData,
    options: Record<string, unknown>,
  ) => Promise<EntryData | undefined | null | void>;
}

export type EventListenerOptions = Record<string, unknown>;

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
  config: Config;
  error?: string | undefined;
  clearHash?: () => void;
}

export type Integration = {
  collections?: '*' | string[];
} & (AlgoliaIntegration | AssetStoreIntegration);

export type IntegrationProvider = Integration['provider'];
export type SearchIntegrationProvider = 'algolia';
export type MediaIntegrationProvider = 'assetStore';

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

export type FileMetadata = {
  author: string;
  updatedOn: string;
};
