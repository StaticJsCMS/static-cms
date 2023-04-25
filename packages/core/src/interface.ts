import type { LanguageName } from '@uiw/codemirror-extensions-langs';
import type { PropertiesSchema } from 'ajv/dist/types/json-schema';
import type {
  ComponentType,
  FunctionComponent,
  JSXElementConstructor,
  ReactElement,
  ReactNode,
} from 'react';
import type { TranslateProps as ReactPolyglotTranslateProps, t } from 'react-polyglot';
import type { MediaFile as BackendMediaFile } from './backend';
import type { EditorControlProps } from './components/entry-editor/editor-control-pane/EditorControl';
import type {
  SORT_DIRECTION_ASCENDING,
  SORT_DIRECTION_DESCENDING,
  SORT_DIRECTION_NONE,
} from './constants';
import type { formatExtensions } from './formats/formats';
import type {
  I18N_FIELD_DUPLICATE,
  I18N_FIELD_NONE,
  I18N_FIELD_TRANSLATE,
  I18N_STRUCTURE_MULTIPLE_FILES,
  I18N_STRUCTURE_MULTIPLE_FOLDERS,
  I18N_STRUCTURE_SINGLE_FILE,
} from './lib/i18n';
import type { AllowedEvent } from './lib/registry';
import type Cursor from './lib/util/Cursor';
import type AssetProxy from './valueObjects/AssetProxy';

export interface Pages {
  [collection: string]: { isFetching?: boolean; page?: number; ids: string[] };
}

export type SortableField<EF extends BaseField = UnknownField> =
  | {
      key: string;
      name: string;
      label: string;
    }
  | ({
      key: string;
    } & Field<EF>);

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
  | (string | number)[]
  | boolean
  | ObjectValue
  | Date
  | ValueOrNestedValue[]
  | null
  | undefined;

export type EntryData = ObjectValue | undefined | null;

export interface Entry<T = ObjectValue> {
  collection: string;
  slug: string;
  path: string;
  partial: boolean;
  raw: string;
  data: T | undefined | null;
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
  meta?: {
    path: string;
  };
}

export type Entities = Record<string, Entry>;

export interface FieldError {
  type: string;
  message?: string;
}

export interface FieldsErrors {
  [field: string]: FieldError[];
}

export type FieldGetValidValueMethod<T = unknown, F extends BaseField = UnknownField> = (
  value: T | undefined | null,
  field: F,
) => T | undefined | null;

export type FieldGetDefaultMethod<T = unknown, F extends BaseField = UnknownField> = (
  defaultValue: T | undefined | null,
  field: F,
) => T;

export interface FieldValidationMethodProps<T = unknown, F extends BaseField = UnknownField> {
  field: F;
  value: T | undefined | null;
  t: t;
}

export type FieldValidationMethod<T = unknown, F extends BaseField = UnknownField> = (
  props: FieldValidationMethodProps<T, F>,
) => false | FieldError | Promise<false | FieldError>;

export interface EntryDraft {
  entry: Entry;
  fieldsErrors: FieldsErrors;
}

export interface FilterRule {
  value: string;
  field: string;
}

export interface EditorConfig {
  preview?: boolean;
  frame?: boolean;
}

export interface CollectionFile<EF extends BaseField = UnknownField> {
  name: string;
  label: string;
  file: string;
  fields: Field<EF>[];
  label_singular?: string;
  description?: string;
  media_folder?: string;
  public_folder?: string;
  media_library?: MediaLibraryConfig;
  i18n?: boolean | I18nInfo;
  editor?: EditorConfig;
}

interface Nested {
  summary?: string;
  depth: number;
  path?: {
    label?: string;
    index_file: string;
  };
}

export interface I18nSettings {
  currentLocale: string;
  defaultLocale: string;
  locales: string[];
}

export type Format = keyof typeof formatExtensions;

export interface i18nCollection<EF extends BaseField = UnknownField>
  extends Omit<Collection<EF>, 'i18n'> {
  i18n: Required<Collection<EF>>['i18n'];
}

export interface BaseCollection {
  name: string;
  description?: string;
  icon?: string;
  isFetching?: boolean;
  summary?: string;
  summary_fields?: string[];
  filter?: FilterRule;
  label_singular?: string;
  label: string;
  sortable_fields?: SortableFields;
  view_filters?: ViewFilter[];
  view_groups?: ViewGroup[];
  i18n?: boolean | I18nInfo;
  hide?: boolean;
  editor?: EditorConfig;
  identifier_field?: string;
  path?: string;
  extension?: string;
  format?: Format;
  frontmatter_delimiter?: string | [string, string];
  slug?: string;
  media_folder?: string;
  public_folder?: string;
  media_library?: MediaLibraryConfig;
}

export interface FilesCollection<EF extends BaseField = UnknownField> extends BaseCollection {
  files: CollectionFile<EF>[];
}

export interface FolderCollection<EF extends BaseField = UnknownField> extends BaseCollection {
  folder: string;
  fields: Field<EF>[];
  create?: boolean;
  delete?: boolean;
  nested?: Nested;
}

export type Collection<EF extends BaseField = UnknownField> =
  | FilesCollection<EF>
  | FolderCollection<EF>;

export type Collections<EF extends BaseField = UnknownField> = Record<string, Collection<EF>>;

export type MediaFile = BackendMediaFile & { key?: string };

export interface DisplayURLState {
  isFetching: boolean;
  url?: string;
  err?: Error;
}

export type TranslatedProps<T> = T & ReactPolyglotTranslateProps;

export interface MediaPath<T = string | string[]> {
  path: T;
  alt?: string;
}

export interface WidgetControlProps<T, F extends BaseField = UnknownField, EV = ObjectValue> {
  collection: Collection<F>;
  collectionFile: CollectionFile<F> | undefined;
  config: Config<F>;
  entry: Entry<EV>;
  field: F;
  fieldsErrors: FieldsErrors;
  submitted: boolean;
  forList: boolean;
  forSingleList: boolean;
  disabled: boolean;
  duplicate: boolean;
  hidden: boolean;
  label: string;
  locale: string | undefined;
  // @deprecated Use useMediaInsert instead
  mediaPaths: Record<string, MediaPath>;
  onChange: (value: T | null | undefined) => void;
  // @deprecated Use useMediaInsert instead
  openMediaLibrary: EditorControlProps['openMediaLibrary'];
  // @deprecated Use useMediaInsert instead
  removeInsertedMedia: EditorControlProps['removeInsertedMedia'];
  i18n: I18nSettings | undefined;
  hasErrors: boolean;
  errors: FieldError[];
  path: string;
  query: EditorControlProps['query'];
  t: t;
  value: T | undefined | null;
  theme: 'dark' | 'light';
  controlled: boolean;
}

export interface WidgetPreviewProps<T = unknown, F extends BaseField = UnknownField> {
  config: Config<F>;
  collection: Collection<F>;
  entry: Entry;
  field: RenderedField<F>;
  value: T | undefined | null;
  theme: 'dark' | 'light';
}

export type WidgetPreviewComponent<T = unknown, F extends BaseField = UnknownField> =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  | ReactElement<unknown, string | JSXElementConstructor<any>>
  | ComponentType<WidgetPreviewProps<T, F>>;

export type WidgetFor<P = ObjectValue> = <K extends keyof P>(name: K) => ReactNode;

export type WidgetsFor<P = ObjectValue> = <K extends keyof P>(
  name: K,
) => P[K] extends Array<infer U>
  ? {
      data: U | null;
      widgets: Record<keyof U, ReactNode>;
    }[]
  : {
      data: P[K] | null;
      widgets: Record<keyof P[K], ReactNode>;
    };

export interface TemplatePreviewProps<T = ObjectValue, EF extends BaseField = UnknownField> {
  collection: Collection<EF>;
  fields: Field<EF>[];
  entry: Entry<T>;
  document: Document | undefined | null;
  window: Window | undefined | null;
  widgetFor: WidgetFor<T>;
  widgetsFor: WidgetsFor<T>;
  theme: 'dark' | 'light';
}

export type TemplatePreviewComponent<
  T = ObjectValue,
  EF extends BaseField = UnknownField,
> = ComponentType<TemplatePreviewProps<T, EF>>;

export interface TemplatePreviewCardProps<T = EntryData, EF extends BaseField = UnknownField> {
  collection: Collection<EF>;
  fields: Field<EF>[];
  entry: Entry<T>;
  widgetFor: WidgetFor<T>;
  widgetsFor: WidgetsFor<T>;
  theme: 'dark' | 'light';
  hasLocalBackup: boolean;
}

export type TemplatePreviewCardComponent<
  T = EntryData,
  EF extends BaseField = UnknownField,
> = ComponentType<TemplatePreviewCardProps<T, EF>>;

export interface FieldPreviewProps<T = unknown, F extends BaseField = UnknownField> {
  collection: Collection<F>;
  field: Field<F>;
  value: T;
  theme: 'dark' | 'light';
}

export type FieldPreviewComponent<T = unknown, F extends BaseField = UnknownField> = ComponentType<
  FieldPreviewProps<T, F>
>;

export interface WidgetOptions<T = unknown, F extends BaseField = UnknownField> {
  validator?: Widget<T, F>['validator'];
  getValidValue?: Widget<T, F>['getValidValue'];
  getDefaultValue?: Widget<T, F>['getDefaultValue'];
  schema?: Widget<T, F>['schema'];
}

export interface Widget<T = unknown, F extends BaseField = UnknownField> {
  control: ComponentType<WidgetControlProps<T, F>>;
  preview?: WidgetPreviewComponent<T, F>;
  validator: FieldValidationMethod<T, F>;
  getValidValue: FieldGetValidValueMethod<T, F>;
  getDefaultValue?: FieldGetDefaultMethod<T, F>;
  schema?: PropertiesSchema<unknown>;
}

export interface WidgetParam<T = unknown, F extends BaseField = UnknownField> {
  name: string;
  controlComponent: Widget<T, F>['control'];
  previewComponent?: Widget<T, F>['preview'];
  options?: WidgetOptions<T, F>;
}

export interface PersistOptions {
  newEntry?: boolean;
  commitMessage: string;
  collectionName?: string;
  status?: string;
}

export interface PersistArgs {
  config: Config;
  rootSlug: string | undefined;
  collection: Collection;
  entryDraft: EntryDraft;
  assetProxies: AssetProxy[];
  usedSlugs: string[];
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
  field?: MediaField;
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
  abstract getMedia(
    mediaFolder?: string,
    folderSupport?: boolean,
    publicFolder?: string,
  ): Promise<ImplementationMediaFile[]>;
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

export type CustomIcon = FunctionComponent;

export type WidgetValueSerializer = {
  serialize: (value: ValueOrNestedValue) => ValueOrNestedValue;
  deserialize: (value: ValueOrNestedValue) => ValueOrNestedValue;
};

export interface MediaLibraryInitOptions {
  options: Record<string, unknown> | undefined;
  handleInsert: (url: string | string[]) => void;
}

export interface MediaLibraryConfig {
  max_file_size?: number;
  folder_support?: boolean;
}

export type BackendType = 'git-gateway' | 'github' | 'gitlab' | 'bitbucket' | 'test-repo' | 'proxy';

export type MapWidgetType = 'Point' | 'LineString' | 'Polygon';

export interface SelectWidgetOptionObject {
  label: string;
  value: string | number;
}

export type AuthScope = 'repo' | 'public_repo';

export type SlugEncoding = 'unicode' | 'ascii';

export type RenderedField<F extends BaseField = UnknownField> = F & {
  renderedFields?: ReactNode[];
};

export interface BaseField {
  name: string;
  label?: string;
  required?: boolean;
  hint?: string;
  pattern?: [string, string];
  i18n?: boolean | 'translate' | 'duplicate' | 'none';
  comment?: string;
  widget: string;
}

export interface MediaField extends BaseField {
  media_folder?: string;
  public_folder?: string;
  choose_url?: boolean;
  multiple?: boolean;
  media_library?: MediaLibraryConfig;
  select_folder?: boolean;
}

export interface BooleanField extends BaseField {
  widget: 'boolean';
  default?: boolean;
}

export interface CodeField extends BaseField {
  widget: 'code';
  default?: string | { [key: string]: string };

  default_language?: string;
  allow_language_selection?: boolean;
  keys?: { code: string; lang: string };
  output_code_only?: boolean;

  code_mirror_config?: {
    extra_keys?: Record<string, string>;
  } & Record<string, unknown>;
}

export interface ColorField extends BaseField {
  widget: 'color';
  default?: string;

  allow_input?: boolean;
  enable_alpha?: boolean;
}

export interface DateTimeField extends BaseField {
  widget: 'datetime';
  default?: string;

  format?: string;
  date_format?: boolean | string;
  time_format?: boolean | string;
  picker_utc?: boolean;
}

export interface FileOrImageField extends MediaField {
  widget: 'file' | 'image';
  default?: string;
}

export interface ObjectField<EF extends BaseField = UnknownField> extends BaseField {
  widget: 'object';

  collapsed?: boolean;
  summary?: string;
  fields: Field<EF>[];
}

export interface ListField<EF extends BaseField = UnknownField> extends BaseField {
  widget: 'list';
  default?: ValueOrNestedValue[];

  allow_add?: boolean;
  collapsed?: boolean;
  summary?: string;
  label_singular?: string;
  fields?: Field<EF>[];
  max?: number;
  min?: number;
  add_to_top?: boolean;
  types?: ObjectField<EF>[];
  type_key?: string;
}

export interface MapField extends BaseField {
  widget: 'map';
  default?: string;

  decimals?: number;
  type?: MapWidgetType;
  height?: string;
}

export interface MarkdownField extends MediaField {
  widget: 'markdown';
  default?: string;
}

export interface NumberField extends BaseField {
  widget: 'number';
  default?: string | number;

  value_type?: 'int' | 'float' | 'string';
  min?: number;
  max?: number;

  step?: number;
}

export interface SelectField extends BaseField {
  widget: 'select';
  default?: string | number | (string | number)[];

  options: (string | number)[] | SelectWidgetOptionObject[];
  multiple?: boolean;
  min?: number;
  max?: number;
}

export interface RelationField extends BaseField {
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
}

export interface HiddenField extends BaseField {
  widget: 'hidden';
  default?: ValueOrNestedValue;
}

export interface StringOrTextField extends BaseField {
  widget: 'string' | 'text';
  default?: string;
}

export interface UUIDField extends BaseField {
  widget: 'uuid';
  allow_regenerate?: boolean;
  prefix?: string;
}

export interface UnknownField extends BaseField {
  widget: 'unknown';
}

export type Field<EF extends BaseField = UnknownField> =
  | BooleanField
  | CodeField
  | ColorField
  | DateTimeField
  | FileOrImageField
  | ListField<EF>
  | MapField
  | MarkdownField
  | NumberField
  | ObjectField<EF>
  | RelationField
  | SelectField
  | HiddenField
  | StringOrTextField
  | UUIDField
  | EF;

export interface ViewFilter {
  id?: string;
  label: string;
  field: string;
  pattern: string | boolean | number;
}

export interface ViewGroup {
  id?: string;
  label: string;
  field: string;
  pattern?: string;
}

export type SortDirection =
  | typeof SORT_DIRECTION_ASCENDING
  | typeof SORT_DIRECTION_DESCENDING
  | typeof SORT_DIRECTION_NONE;

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
  repo?: string;
  branch?: string;
  api_root?: string;
  site_domain?: string;
  base_url?: string;
  auth_endpoint?: string;
  app_id?: string;
  auth_type?: 'implicit' | 'pkce';
  proxy_url?: string;
  large_media_url?: string;
  login?: boolean;
  identity_url?: string;
  gateway_url?: string;
  auth_scope?: AuthScope;
  commit_messages?: {
    create?: string;
    update?: string;
    delete?: string;
    uploadMedia?: string;
    deleteMedia?: string;
  };
  use_large_media_transforms_in_media_library?: boolean;
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

export interface Config<EF extends BaseField = UnknownField> {
  backend: Backend;
  collections: Collection<EF>[];
  locale?: string;
  site_id?: string;
  site_url?: string;
  display_url?: string;
  base_url?: string;
  logo_url?: string;
  media_folder?: string;
  public_folder?: string;
  media_folder_relative?: boolean;
  media_library?: MediaLibraryConfig;
  slug?: Slug;
  i18n?: I18nInfo;
  local_backend?: boolean | LocalBackend;
  disable_local_backup?: boolean;
  editor?: EditorConfig;
  search?: boolean;
}

export interface InitOptions<EF extends BaseField = UnknownField> {
  config: Config<EF>;
}

export interface BackendInitializerOptions {
  updateUserCredentials: (credentials: Credentials) => void;
}

export interface BackendInitializer<EF extends BaseField = UnknownField> {
  init: (config: Config<EF>, options: BackendInitializerOptions) => BackendClass;
}

export interface EventData {
  entry: Entry;
  author: { login: string | undefined; name: string };
}

export type EventListenerOptions = Record<string, unknown>;

export type EventListenerHandler = (
  data: EventData | undefined,
  options: EventListenerOptions,
) => Promise<EntryData | undefined | null | void>;

export interface EventListener {
  name: AllowedEvent;
  handler: EventListenerHandler;
}

export interface AdditionalLinkOptions {
  icon?: string;
}

export interface AdditionalLink {
  id: string;
  title: string;
  data: string | FunctionComponent;
  options?: AdditionalLinkOptions;
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

export type I18nStructure =
  | typeof I18N_STRUCTURE_MULTIPLE_FILES
  | typeof I18N_STRUCTURE_MULTIPLE_FOLDERS
  | typeof I18N_STRUCTURE_SINGLE_FILE;

export type I18nField =
  | typeof I18N_FIELD_DUPLICATE
  | typeof I18N_FIELD_TRANSLATE
  | typeof I18N_FIELD_NONE;

export interface I18nInfo {
  locales: string[];
  defaultLocale: string;
  structure?: I18nStructure;
}

export interface ProcessedCodeLanguage {
  label: string;
  identifiers: string[];
  codemirror_mode: LanguageName;
  codemirror_mime_type: string;
}

export interface FileMetadata {
  author: string;
  updatedOn: string;
}

export interface PreviewStyleOptions {
  raw?: boolean;
}

export interface PreviewStyle {
  value: string;
  raw: boolean;
}

export interface MarkdownPluginFactoryProps {
  config: Config<MarkdownField>;
  field: MarkdownField;
  mode: 'editor' | 'preview';
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type MarkdownPluginFactory = (props: MarkdownPluginFactoryProps) => any;

export interface MarkdownToolbarItemsFactoryProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  imageToolbarButton: any;
}

export type MarkdownToolbarItemsFactory = (
  props: MarkdownToolbarItemsFactoryProps,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
) => (string | any)[][];

export interface MarkdownEditorOptions {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialEditType?: any;
  height?: string;
  toolbarItems?: MarkdownToolbarItemsFactory;
  plugins?: MarkdownPluginFactory[];
}

export type ShortcodeControlProps<P = {}> = P & {
  onChange: (props: P) => void;
  controlProps: WidgetControlProps<string, MarkdownField>;
  theme: 'dark' | 'light';
};

export type ShortcodePreviewProps<P = {}> = P & {
  previewProps: WidgetPreviewProps<string, MarkdownField>;
};

export interface ShortcodeConfig<P = {}> {
  label?: string;
  openTag: string;
  closeTag: string;
  separator: string;
  toProps?: (args: string[]) => P;
  toArgs?: (props: P) => string[];
  control: ComponentType<ShortcodeControlProps>;
  preview: ComponentType<ShortcodePreviewProps>;
}

export enum CollectionType {
  FOLDER,
  FILES,
}

export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

export interface InferredField {
  type: string;
  secondaryTypes: string[];
  synonyms: string[];
  defaultPreview: (value: string | boolean | number) => JSX.Element | ReactNode;
  fallbackToFirstField: boolean;
  showError: boolean;
}

export interface SvgProps {
  className: string;
}

export interface Breadcrumb {
  name?: string;
  to?: string;
}

export interface MediaLibraryDisplayURL {
  url?: string;
  isFetching: boolean;
  err?: unknown;
}

export interface MediaLibrarInsertOptions {
  showAlt?: boolean;
  chooseUrl?: boolean;
}

export interface BackupEntry {
  raw: string;
  path: string;
  mediaFiles: MediaFile[];
  i18n?: Record<string, { raw: string }>;
}
