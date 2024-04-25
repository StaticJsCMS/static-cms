import * as fuzzy from 'fuzzy';
import attempt from 'lodash/attempt';
import flatten from 'lodash/flatten';
import get from 'lodash/get';
import isError from 'lodash/isError';
import uniq from 'lodash/uniq';
import { dirname, extname } from 'path';

import { DRAFT_MEDIA_FILES } from './constants/mediaLibrary';
import { WorkflowStatus, workflowStatusFromString } from './constants/publishModes';
import { formatExtensions, resolveFormat } from './formats/formats';
import { commitMessageFormatter, slugFormatter } from './lib/formatters';
import {
  I18N_STRUCTURE_MULTIPLE_FILES,
  I18N_STRUCTURE_MULTIPLE_FOLDERS,
  formatI18nBackup,
  getFilePaths,
  getI18nBackup,
  getI18nDataFiles,
  getI18nEntry,
  getI18nFiles,
  getI18nFilesDepth,
  getI18nInfo,
  groupEntries,
  hasI18n,
} from './lib/i18n';
import { getBackend, invokeEvent } from './lib/registry';
import { joinUrlPath, sanitizeChar } from './lib/urlHelper';
import {
  CURSOR_COMPATIBILITY_SYMBOL,
  Cursor,
  asyncLock,
  blobToFileObj,
  getPathDepth,
  localForage,
} from './lib/util';
import { EDITORIAL_WORKFLOW_ERROR } from './lib/util/EditorialWorkflowError';
import { getEntryBackupKey } from './lib/util/backup.util';
import {
  getFields,
  selectAllowDeletion,
  selectAllowNewEntries,
  selectEntryPath,
  selectEntrySlug,
  selectFieldsComments,
  selectFileEntryLabel,
  selectFolderEntryExtension,
  selectInferredField,
  selectMediaFolders,
} from './lib/util/collection.util';
import filterEntries from './lib/util/filter.util';
import { selectMediaFilePublicPath } from './lib/util/media.util';
import { selectCustomPath, slugFromCustomPath } from './lib/util/nested.util';
import { isNotNullish, isNullish } from './lib/util/null.util';
import { fileSearch, sortByScore } from './lib/util/search.util';
import set from './lib/util/set.util';
import { dateParsers, expandPath, extractTemplateVars } from './lib/widgets/stringTemplate';
import { getUseWorkflow } from './reducers/selectors/config';
import createEntry from './valueObjects/createEntry';

import type {
  BackendClass,
  BackendInitializer,
  BackupEntry,
  BaseField,
  CollectionFile,
  CollectionWithDefaults,
  CollectionsWithDefaults,
  ConfigWithDefaults,
  Credentials,
  DataFile,
  DisplayURL,
  Entry,
  EntryData,
  EventData,
  FilterRule,
  FolderCollectionWithDefaults,
  I18nInfo,
  ImplementationEntry,
  MediaField,
  ObjectValue,
  PersistArgs,
  SearchQueryResponse,
  SearchResponse,
  UnknownField,
  UnpublishedEntry,
  UnpublishedEntryDiff,
  User,
  ValueOrNestedValue,
} from './interface';
import type { AsyncLock } from './lib/util';
import type { RootState } from './store';
import type AssetProxy from './valueObjects/AssetProxy';

const LIST_ALL_ENTRIES_CACHE_TIME = 5000;

function updatePath(entryPath: string, assetPath: string): string | null {
  const pathDir = dirname(entryPath);

  const pathParts = assetPath.split(DRAFT_MEDIA_FILES);
  const restOfPath = pathParts.length > 1 ? pathParts[1] : null;
  if (restOfPath === null) {
    return null;
  }

  return joinUrlPath(pathDir, restOfPath).replace(/\/\//g, '');
}

function updateAssetFields(data: ValueOrNestedValue, path: string): ValueOrNestedValue {
  if (
    isNullish(data) ||
    typeof data === 'number' ||
    typeof data === 'boolean' ||
    data instanceof Date
  ) {
    return data;
  }

  if (Array.isArray(data)) {
    return data.map(child => updateAssetFields(child, path));
  }

  if (typeof data === 'object') {
    return Object.keys(data).reduce((acc, key) => {
      acc[key] = updateAssetFields(data[key], path);

      return acc;
    }, {} as ObjectValue);
  }

  const newPath = updatePath(path, data);
  if (!newPath) {
    return data;
  }

  return newPath;
}

function updateAssetProxies(assetProxies: AssetProxy[], path: string) {
  assetProxies.forEach(asset => {
    const newPath = updatePath(path, asset.path);
    if (newPath) {
      asset.path = newPath;
    }
  });
}

export class LocalStorageAuthStore {
  storageKey = 'static-cms-user';

  retrieve() {
    const data = window.localStorage.getItem(this.storageKey);
    return data && JSON.parse(data);
  }

  store(userData: unknown) {
    window.localStorage.setItem(this.storageKey, JSON.stringify(userData));
  }

  logout() {
    window.localStorage.removeItem(this.storageKey);
  }
}

export function getEntryField(field: string, entry: Entry): string {
  const value = get(entry.data, field);
  if (value) {
    return String(value);
  } else {
    const firstFieldPart = field.split('.')[0];
    if (entry[firstFieldPart as keyof Entry]) {
      // allows searching using entry.slug/entry.path etc.
      return String(entry[firstFieldPart as keyof Entry]);
    } else {
      return '';
    }
  }
}

export function extractSearchFields(searchFields: string[]) {
  return (entry: Entry) =>
    searchFields.reduce((acc, field) => {
      const value = getEntryField(field, entry);
      if (value) {
        return `${acc} ${value}`;
      } else {
        return acc;
      }
    }, '');
}

export function expandSearchEntries(
  entries: Entry[],
  searchFields: string[],
): (Entry & {
  field: string;
})[] {
  // expand the entries for the purpose of the search
  const expandedEntries = entries.reduce(
    (acc, e) => {
      const expandedFields = searchFields.reduce((acc, f) => {
        const fields = expandPath({ data: e.data, path: f });
        acc.push(...fields);
        return acc;
      }, [] as string[]);

      for (let i = 0; i < expandedFields.length; i++) {
        acc.push({ ...e, field: expandedFields[i] });
      }

      return acc;
    },
    [] as (Entry & { field: string })[],
  );

  return expandedEntries;
}

export function mergeExpandedEntries(entries: (Entry & { field: string })[]): Entry[] {
  // merge the search results by slug and only keep data that matched the search
  const fields = entries.map(f => f.field);
  const arrayPaths: Record<string, Set<string>> = {};

  const merged = entries.reduce(
    (acc, e) => {
      if (!acc[e.slug]) {
        const { field: _field, ...rest } = e;
        acc[e.slug] = rest;
        arrayPaths[e.slug] = new Set();
      }

      const nestedFields = e.field.split('.');
      let value: ValueOrNestedValue = acc[e.slug].data;
      for (let i = 0; i < nestedFields.length; i++) {
        if (isNotNullish(value)) {
          value = value[nestedFields[i]];
          if (Array.isArray(value)) {
            const path = nestedFields.slice(0, i + 1).join('.');
            arrayPaths[e.slug] = arrayPaths[e.slug].add(path);
          }
        }
      }

      return acc;
    },
    {} as Record<string, Entry>,
  );

  // this keeps the search score sorting order designated by the order in entries
  // and filters non matching items
  return Object.keys(merged).map(slug => {
    let data = merged[slug].data ?? {};
    for (const path of arrayPaths[slug]) {
      const array = get(data, path) as unknown[];
      const filtered = array.filter((_, index) => {
        return fields.some(f => `${f}.`.startsWith(`${path}.${index}.`));
      });
      filtered.sort((a, b) => {
        const indexOfA = array.indexOf(a);
        const indexOfB = array.indexOf(b);
        const pathOfA = `${path}.${indexOfA}.`;
        const pathOfB = `${path}.${indexOfB}.`;

        const matchingFieldIndexA = fields.findIndex(f => `${f}.`.startsWith(pathOfA));
        const matchingFieldIndexB = fields.findIndex(f => `${f}.`.startsWith(pathOfB));

        return matchingFieldIndexA - matchingFieldIndexB;
      });

      data = set(data, path, filtered);
    }

    return {
      ...merged[slug],
      data,
    };
  });
}

interface AuthStore {
  retrieve: () => User;
  store: (user: User) => void;
  logout: () => void;
}

interface BackendOptions<EF extends BaseField> {
  backendName: string;
  config: ConfigWithDefaults<EF>;
  authStore?: AuthStore;
}

export interface MediaFile {
  name: string;
  id: string;
  size?: number;
  displayURL?: DisplayURL;
  path: string;
  draft?: boolean;
  url?: string;
  file?: File;
  field?: MediaField;
  queryOrder?: unknown;
  isViewableImage?: boolean;
  type?: string;
  isDirectory?: boolean;
}

function selectHasMetaPath(
  collection: CollectionWithDefaults,
): collection is FolderCollectionWithDefaults {
  return Boolean('folder' in collection && collection.meta?.path);
}

function prepareMetaPath(path: string, collection: CollectionWithDefaults) {
  if (!selectHasMetaPath(collection)) {
    return path;
  }
  const dir = dirname(path);
  return dir.slice(collection.folder!.length + 1) || '/';
}

function collectionDepth<EF extends BaseField>(collection: CollectionWithDefaults<EF>) {
  let depth;
  depth =
    ('nested' in collection && collection.nested?.depth) || getPathDepth(collection.path ?? '');

  if (hasI18n(collection)) {
    depth = getI18nFilesDepth(collection, depth);
  }

  return depth;
}

function i18nRuleString(ruleString: string, { default_locale, structure }: I18nInfo): string {
  if (structure === I18N_STRUCTURE_MULTIPLE_FOLDERS) {
    return `${default_locale}\\/${ruleString}`;
  }

  if (structure === I18N_STRUCTURE_MULTIPLE_FILES) {
    return `${ruleString}\\.${default_locale}\\..*`;
  }

  return ruleString;
}

function collectionRegex<EF extends BaseField>(
  collection: CollectionWithDefaults<EF>,
): RegExp | undefined {
  let ruleString = '';

  if ('folder' in collection && collection.path) {
    ruleString = `${collection.folder}/${collection.path}`.replace(/{{.*}}/gm, '(.*)');
  }

  if (hasI18n(collection)) {
    ruleString = i18nRuleString(ruleString, getI18nInfo(collection));
  }

  return ruleString ? new RegExp(ruleString) : undefined;
}

export class Backend<EF extends BaseField = UnknownField, BC extends BackendClass = BackendClass> {
  implementation: BC;
  backendName: string;
  config: ConfigWithDefaults<EF>;
  authStore?: AuthStore;
  user?: User | null;
  backupSync: AsyncLock;

  constructor(
    implementation: BackendInitializer<EF>,
    { backendName, authStore, config }: BackendOptions<EF>,
  ) {
    // We can't reliably run this on exit, so we do cleanup on load.
    this.deleteAnonymousBackup();
    this.config = config;
    this.implementation = implementation.init(this.config, {
      useWorkflow: getUseWorkflow(this.config as ConfigWithDefaults),
      updateUserCredentials: this.updateUserCredentials,
      initialWorkflowStatus: WorkflowStatus.DRAFT,
    }) as BC;
    this.backendName = backendName;
    this.authStore = authStore;
    if (this.implementation === null) {
      throw new Error('Cannot instantiate a Backend with no implementation');
    }
    this.backupSync = asyncLock();
  }

  async status() {
    const attempts = 3;
    let status: {
      auth: { status: boolean };
      api: { status: boolean; statusPage: string };
    } = {
      auth: { status: true },
      api: { status: true, statusPage: '' },
    };
    for (let i = 1; i <= attempts; i++) {
      status = await this.implementation.status();
      // return on first success
      if (Object.values(status).every(s => s.status === true)) {
        return status;
      } else {
        await new Promise(resolve => setTimeout(resolve, i * 1000));
      }
    }
    return status;
  }

  currentUser() {
    if (this.user) {
      return this.user;
    }
    const stored = this.authStore!.retrieve();
    if (stored && stored.backendName === this.backendName) {
      return Promise.resolve(this.implementation.restoreUser(stored)).then(user => {
        this.user = { ...user, backendName: this.backendName };
        // return confirmed/rehydrated user object instead of stored
        this.authStore!.store(this.user as User);
        return this.user;
      });
    }
    return Promise.resolve(null);
  }

  updateUserCredentials = (updatedCredentials: Credentials) => {
    const storedUser = this.authStore!.retrieve();
    if (storedUser && storedUser.backendName === this.backendName) {
      this.user = { ...storedUser, ...updatedCredentials };
      this.authStore!.store(this.user as User);
      return this.user;
    }
  };

  authComponent() {
    return this.implementation.authComponent();
  }

  authenticate(credentials: Credentials) {
    return this.implementation.authenticate(credentials).then(user => {
      this.user = { ...user, backendName: this.backendName };
      if (this.authStore) {
        this.authStore.store(this.user as User);
      }
      return this.user;
    });
  }

  async logout() {
    try {
      await this.implementation.logout();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      console.warn('Error during logout', e.message);
    } finally {
      this.user = null;
      if (this.authStore) {
        this.authStore.logout();
      }
    }
  }

  getToken = () => this.implementation.getToken();

  async entryExist(
    collection: CollectionWithDefaults,
    path: string,
    slug: string,
    useWorkflow: boolean,
  ) {
    const unpublishedEntry =
      useWorkflow &&
      (await this.implementation
        .unpublishedEntry({ collection: collection.name, slug })
        .catch(error => {
          if (error.name === EDITORIAL_WORKFLOW_ERROR && error.notUnderEditorialWorkflow) {
            return Promise.resolve(false);
          }
          return Promise.reject(error);
        }));

    if (unpublishedEntry) {
      return unpublishedEntry;
    }

    const publishedEntry = await this.implementation
      .getEntry(path)
      .then(({ data }) => data)
      .catch(() => {
        return Promise.resolve(false);
      });

    return publishedEntry;
  }

  async generateUniqueSlug(
    collection: CollectionWithDefaults,
    entry: Entry,
    config: ConfigWithDefaults,
    usedSlugs: string[],
    customPath: string | undefined,
  ) {
    const slugConfig = config.slug;
    let slug: string;
    if (customPath) {
      slug = slugFromCustomPath(collection, customPath);
    } else {
      const collectionFields = getFields(collection, entry.slug);
      slug = slugFormatter(collection, entry.data, slugConfig, collectionFields);
    }
    let i = 1;
    let uniqueSlug = slug;

    // Check for duplicate slug in loaded entries store first before repo
    while (
      usedSlugs.includes(uniqueSlug) ||
      (await this.entryExist(
        collection,
        selectEntryPath(collection, uniqueSlug) as string,
        uniqueSlug,
        getUseWorkflow(config),
      ))
    ) {
      uniqueSlug = `${slug}${sanitizeChar(' ', slugConfig)}${i++}`;
    }
    return uniqueSlug;
  }

  processEntries<EF extends BaseField>(
    loadedEntries: ImplementationEntry[],
    collection: CollectionWithDefaults<EF>,
    config: ConfigWithDefaults<EF>,
  ): Entry[] {
    const entries = loadedEntries.map(loadedEntry =>
      createEntry(
        collection.name,
        selectEntrySlug(collection, loadedEntry.file.path),
        loadedEntry.file.path,
        {
          raw: loadedEntry.data || '',
          label: loadedEntry.file.label,
          author: loadedEntry.file.author,
          updatedOn: loadedEntry.file.updatedOn,
        },
      ),
    );
    const formattedEntries = entries.map(this.entryWithFormat(collection, config));
    // If this collection has a "filter" property, filter entries accordingly
    const collectionFilter = collection.filter;
    const filteredEntries = collectionFilter
      ? this.filterEntries({ entries: formattedEntries }, collectionFilter)
      : formattedEntries;

    if (hasI18n(collection)) {
      const extension = selectFolderEntryExtension(collection);
      const groupedEntries = groupEntries(collection, extension, filteredEntries);
      return groupedEntries;
    }

    return filteredEntries;
  }

  async listEntries(collection: CollectionWithDefaults, config: ConfigWithDefaults) {
    const extension = selectFolderEntryExtension(collection);
    let listMethod: () => Promise<ImplementationEntry[]>;
    if ('folder' in collection) {
      listMethod = () => {
        const depth = collectionDepth(collection);
        return this.implementation.entriesByFolder(collection.folder as string, extension, depth);
      };
    } else {
      const files = collection.files.map(collectionFile => ({
        path: collectionFile!.file,
        label: collectionFile!.label,
      }));
      listMethod = () => this.implementation.entriesByFiles(files);
    }
    const loadedEntries = await listMethod();
    /*
          Wrap cursors so we can tell which collection the cursor is
          from. This is done to prevent traverseCursor from requiring a
          `collection` argument.
        */
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const cursor = Cursor.create(loadedEntries[CURSOR_COMPATIBILITY_SYMBOL]).wrapData({
      cursorType: 'collectionEntries',
      collection,
    });
    return {
      entries: this.processEntries(loadedEntries, collection, config),
      pagination: cursor.meta?.page,
      cursor,
    };
  }

  backendPromise: Record<string, { expires: number; data?: Entry[]; promise?: Promise<Entry[]> }> =
    {};

  async listAllEntriesExecutor<EF extends BaseField>(
    collection: CollectionWithDefaults<EF>,
    config: ConfigWithDefaults<EF>,
  ): Promise<Entry[]> {
    if ('folder' in collection && collection.folder && this.implementation.allEntriesByFolder) {
      const depth = collectionDepth(collection);
      const extension = selectFolderEntryExtension(collection);
      return this.implementation
        .allEntriesByFolder(
          collection.folder as string,
          extension,
          depth,
          collectionRegex(collection),
        )
        .then(entries => this.processEntries(entries, collection, config));
    }

    const response = await this.listEntries(
      collection as CollectionWithDefaults,
      config as ConfigWithDefaults,
    );
    const { entries } = response;
    let { cursor } = response;
    while (cursor && cursor.actions?.has('next')) {
      const { entries: newEntries, cursor: newCursor } = await this.traverseCursor(
        cursor,
        'next',
        config as ConfigWithDefaults,
      );
      entries.push(...newEntries);
      cursor = newCursor;
    }
    return entries;
  }

  // The same as listEntries, except that if a cursor with the "next"
  // action available is returned, it calls "next" on the cursor and
  // repeats the process. Once there is no available "next" action, it
  // returns all the collected entries. Used to retrieve all entries
  // for local searches and queries.
  async listAllEntries<EF extends BaseField>(
    collection: CollectionWithDefaults<EF>,
    config: ConfigWithDefaults<EF>,
  ): Promise<Entry[]> {
    const now = new Date().getTime();
    if (collection.name in this.backendPromise) {
      const cachedRequest = this.backendPromise[collection.name];
      if (cachedRequest && cachedRequest.expires >= now) {
        if (cachedRequest.data) {
          return Promise.resolve(cachedRequest.data);
        }

        if (cachedRequest.promise) {
          return cachedRequest.promise;
        }
      }

      delete this.backendPromise[collection.name];
    }

    const p = new Promise<Entry[]>(resolve => {
      this.listAllEntriesExecutor(collection, config).then(entries => {
        const responseNow = new Date().getTime();
        this.backendPromise[collection.name] = {
          expires: responseNow + LIST_ALL_ENTRIES_CACHE_TIME,
          data: entries,
        };
        resolve(entries);
      });
    });

    this.backendPromise[collection.name] = {
      expires: now + LIST_ALL_ENTRIES_CACHE_TIME,
      promise: p,
    };

    return p;
  }

  printError(error: Error) {
    return `\n\n${error.stack}`;
  }

  async search(
    collections: CollectionWithDefaults[],
    searchTerm: string,
    config: ConfigWithDefaults,
  ): Promise<SearchResponse> {
    // Perform a local search by requesting all entries. For each
    // collection, load it, search, and call onCollectionResults with
    // its results.
    const errors: Error[] = [];
    const collectionEntriesRequests = collections
      .map(async collection => {
        const summary = collection.summary ?? '';
        const summaryFields = extractTemplateVars(summary);

        // TODO: pass search fields in as an argument
        let searchFields: (string | null | undefined)[] = [];

        if ('files' in collection) {
          collection.files.forEach(f => {
            const topLevelFields = f!.fields.map(f => f!.name);
            searchFields = [...searchFields, ...topLevelFields];
          });
        } else {
          searchFields = [
            selectInferredField(collection, 'title'),
            selectInferredField(collection, 'shortTitle'),
            selectInferredField(collection, 'author'),
            ...summaryFields.map(elem => {
              if (dateParsers[elem]) {
                return selectInferredField(collection, 'date');
              }
              return elem;
            }),
          ];
        }
        const filteredSearchFields = searchFields.filter(Boolean) as string[];
        const collectionEntries = await this.listAllEntries(collection, config);
        return fuzzy.filter(searchTerm, collectionEntries, {
          extract: extractSearchFields(uniq(filteredSearchFields)),
        });
      })
      .map(p =>
        p.catch(err => {
          errors.push(err);
          return [] as fuzzy.FilterResult<Entry>[];
        }),
      );

    const entries = await Promise.all(collectionEntriesRequests).then(arrays => flatten(arrays));

    if (errors.length > 0) {
      throw new Error(
        `Errors occurred while searching entries locally!${errors.map(this.printError)}`,
      );
    }

    const hits = entries
      .filter(({ score }: fuzzy.FilterResult<Entry>) => score > 3)
      .sort(sortByScore)
      .map((f: fuzzy.FilterResult<Entry>) => f.original);
    return { entries: hits, pagination: 1 };
  }

  async query<EF extends BaseField>(
    collection: CollectionWithDefaults<EF>,
    config: ConfigWithDefaults<EF>,
    searchFields: string[],
    searchTerm: string,
    file?: string,
    limit?: number,
  ): Promise<SearchQueryResponse> {
    const entries = await this.listAllEntries(
      collection as CollectionWithDefaults,
      config as ConfigWithDefaults,
    );
    if (file) {
      let hits = fileSearch(
        entries.find(e => e.slug === file),
        searchFields,
        searchTerm,
      );
      if (limit !== undefined && limit > 0) {
        hits = hits.slice(0, limit);
      }

      return { query: searchTerm, hits };
    }

    const expandedEntries = expandSearchEntries(entries, searchFields);

    let hits = fuzzy
      .filter(searchTerm, expandedEntries, {
        extract: entry => {
          return getEntryField(entry.field, entry);
        },
      })
      .sort(sortByScore)
      .map(f => f.original);

    if (limit !== undefined && limit > 0) {
      hits = hits.slice(0, limit);
    }

    const merged = mergeExpandedEntries(hits);
    return { query: searchTerm, hits: merged };
  }

  traverseCursor(
    cursor: Cursor,
    action: string,
    config: ConfigWithDefaults,
  ): Promise<{ entries: Entry[]; cursor: Cursor }> {
    const [data, unwrappedCursor] = cursor.unwrapData();
    // TODO: stop assuming all cursors are for collections
    const collection = data.collection as CollectionWithDefaults;
    return this.implementation.traverseCursor!(unwrappedCursor, action).then(
      async ({ entries, cursor: newCursor }) => ({
        entries: this.processEntries(entries, collection, config),
        cursor: Cursor.create(newCursor).wrapData({
          cursorType: 'collectionEntries',
          collection,
        }),
      }),
    );
  }

  async getLocalDraftBackup(
    collection: CollectionWithDefaults,
    config: ConfigWithDefaults,
    slug: string,
  ): Promise<{ entry: Entry | null }> {
    const key = getEntryBackupKey(collection.name, slug);
    const backup = await localForage.getItem<BackupEntry>(key);
    if (!backup || !backup.raw.trim()) {
      return { entry: null };
    }
    const { raw, path } = backup;
    let { mediaFiles = [] } = backup;

    mediaFiles = mediaFiles.map(file => {
      // de-serialize the file object
      if (file.file) {
        return { ...file, url: URL.createObjectURL(file.file) };
      }
      return file;
    });

    const label = selectFileEntryLabel(collection, slug);

    const formatRawData = (raw: string) => {
      return this.entryWithFormat(
        collection,
        config,
      )(
        createEntry(collection.name, slug, path, {
          raw,
          label,
          mediaFiles,
        }),
      );
    };

    const entry: Entry = formatRawData(raw);
    if (hasI18n(collection) && backup.i18n) {
      const i18n = formatI18nBackup(backup.i18n, formatRawData);
      entry.i18n = i18n;
    }

    return { entry };
  }

  async persistLocalDraftBackup(
    entry: Entry,
    collection: CollectionWithDefaults,
    config: ConfigWithDefaults,
  ) {
    try {
      await this.backupSync.acquire();
      const key = getEntryBackupKey(collection.name, entry.slug);
      const raw = this.entryToRaw(collection, entry, config);

      if (!raw.trim()) {
        return;
      }

      const mediaFiles = await Promise.all<MediaFile>(
        entry.mediaFiles.map(async (file: MediaFile) => {
          // make sure to serialize the file
          if (file.url?.startsWith('blob:')) {
            const blob = await fetch(file.url as string).then(res => res.blob());
            return { ...file, file: blobToFileObj(file.name, blob) };
          }
          return file;
        }),
      );

      let i18n;
      if (hasI18n(collection)) {
        i18n = getI18nBackup(collection, entry, entry =>
          this.entryToRaw(collection, entry, config),
        );
      }

      await localForage.setItem<BackupEntry>(key, {
        raw,
        path: entry.path,
        mediaFiles,
        ...(i18n && { i18n }),
      });
      const result = await localForage.setItem(getEntryBackupKey(), raw);
      return result;
    } catch (e) {
      console.warn('[StaticCMS] persistLocalDraftBackup', e);
    } finally {
      this.backupSync.release();
    }
  }

  async deleteLocalDraftBackup(collection: CollectionWithDefaults, slug: string) {
    try {
      await this.backupSync.acquire();
      await localForage.removeItem(getEntryBackupKey(collection.name, slug));
      // delete new entry backup if not deleted
      slug && (await localForage.removeItem(getEntryBackupKey(collection.name)));
      const result = await this.deleteAnonymousBackup();
      return result;
    } catch (e) {
      console.warn('[StaticCMS] deleteLocalDraftBackup', e);
    } finally {
      this.backupSync.release();
    }
  }

  // Unnamed backup for use in the global error boundary, should always be
  // deleted on cms load.
  deleteAnonymousBackup() {
    return localForage.removeItem(getEntryBackupKey());
  }

  async getEntry<EF extends BaseField>(
    state: RootState<EF>,
    collection: CollectionWithDefaults<EF>,
    config: ConfigWithDefaults<EF>,
    slug: string,
  ) {
    const path = selectEntryPath(collection, slug) as string;
    const label = selectFileEntryLabel(collection, slug);
    const extension = selectFolderEntryExtension(collection);

    const getEntryValue = async (path: string) => {
      const loadedEntry = await this.implementation.getEntry(path);
      let entry = createEntry(collection.name, slug, loadedEntry.file.path, {
        raw: loadedEntry.data,
        label,
        mediaFiles: [],
      });

      entry = this.entryWithFormat(collection, config)(entry);
      entry = await this.processEntry(state, collection, entry);

      return entry;
    };

    let entryValue: Entry;
    if (hasI18n(collection)) {
      entryValue = await getI18nEntry(collection, extension, path, slug, getEntryValue);
    } else {
      entryValue = await getEntryValue(path);
    }

    return entryValue;
  }

  getMedia(folder?: string | undefined, folderSupport?: boolean, mediaPath?: string | undefined) {
    return this.implementation.getMedia(folder, folderSupport, mediaPath);
  }

  getMediaFile(path: string) {
    return this.implementation.getMediaFile(path);
  }

  getMediaDisplayURL(displayURL: DisplayURL) {
    if (this.implementation.getMediaDisplayURL) {
      return this.implementation.getMediaDisplayURL(displayURL);
    }
    const err = new Error(
      'getMediaDisplayURL is not implemented by the current backend, but the backend returned a displayURL which was not a string!',
    ) as Error & { displayURL: DisplayURL };
    err.displayURL = displayURL;
    return Promise.reject(err);
  }

  entryWithFormat<EF extends BaseField>(
    collection: CollectionWithDefaults<EF>,
    config: ConfigWithDefaults<EF>,
  ) {
    return (entry: Entry): Entry => {
      const format = resolveFormat(collection, entry);
      if (entry && entry.raw !== undefined) {
        const data =
          (format &&
            attempt(format.fromFile.bind(format, entry.raw, config as ConfigWithDefaults))) ||
          {};
        if (isError(data)) {
          console.error(data);
        }

        return Object.assign(entry, { data: isError(data) ? {} : data });
      }

      return entry;
    };
  }

  async processEntry<EF extends BaseField>(
    state: RootState<EF>,
    collection: CollectionWithDefaults<EF>,
    entry: Entry,
  ) {
    const configState = state.config;
    if (!configState.config) {
      throw new Error('Config not loaded');
    }

    const mediaFolders = selectMediaFolders(configState.config, collection, entry);
    if (mediaFolders.length > 0) {
      const files = await Promise.all(
        mediaFolders.map(folder => {
          const mediaPath = selectMediaFilePublicPath(
            configState.config!,
            collection,
            '',
            entry,
            undefined,
          );
          return this.implementation.getMedia(
            folder,
            collection.media_library?.folder_support ?? false,
            mediaPath,
          );
        }),
      );
      entry.mediaFiles = entry.mediaFiles.concat(...files);
    } else {
      entry.mediaFiles = entry.mediaFiles.concat(state.mediaLibrary.files || []);
    }

    return entry;
  }

  async persistEntry({
    config,
    rootSlug,
    collection,
    entryDraft: draft,
    assetProxies,
    usedSlugs,
    unpublished = false,
    status,
  }: PersistArgs) {
    const modifiedData = await this.invokePreSaveEvent(draft.entry, collection);
    const entryDraft = modifiedData
      ? {
          ...draft,
          entry: {
            ...draft.entry,
            data: modifiedData,
          },
        }
      : draft;

    const newEntry = entryDraft.entry.newRecord ?? false;

    const useWorkflow = getUseWorkflow(config);

    const customPath = selectCustomPath(draft.entry, collection, rootSlug, config.slug);

    let dataFile: DataFile;
    if (newEntry) {
      if (!selectAllowNewEntries(collection)) {
        throw new Error('Not allowed to create new entries in this collection');
      }
      const slug = await this.generateUniqueSlug(
        collection,
        entryDraft.entry,
        config,
        usedSlugs,
        customPath,
      );
      const path = customPath || (selectEntryPath(collection, slug) ?? '');

      entryDraft.entry.path = path;
      entryDraft.entry.data = updateAssetFields(entryDraft.entry.data, path) as ObjectValue;
      updateAssetProxies(assetProxies, path);

      dataFile = {
        path,
        slug,
        raw: this.entryToRaw(collection, entryDraft.entry, config),
      };
    } else {
      const slug = entryDraft.entry.slug;
      dataFile = {
        path: entryDraft.entry.path,
        // for workflow entries we refresh the slug on publish
        slug: customPath && !useWorkflow ? slugFromCustomPath(collection, customPath) : slug,
        raw: this.entryToRaw(collection, entryDraft.entry, config),
        newPath: customPath,
      };
    }

    const { slug, path, newPath } = dataFile;

    let dataFiles = [dataFile];
    if (hasI18n(collection)) {
      const extension = selectFolderEntryExtension(collection);
      dataFiles = getI18nFiles(
        collection,
        extension,
        entryDraft.entry,
        (draftData: Entry) => this.entryToRaw(collection, draftData, config),
        path,
        slug,
        newPath,
      );
    }

    const user = (await this.currentUser()) as User;
    const commitMessage = commitMessageFormatter(
      newEntry ? 'create' : 'update',
      config,
      {
        collection,
        slug,
        path,
        authorLogin: user.login,
        authorName: user.name,
        data: entryDraft.entry.data,
      },
      user.useOpenAuthoring,
    );

    const collectionName = collection.name;

    const opts = {
      newEntry,
      commitMessage,
      collectionName,
      useWorkflow,
      unpublished,
      status,
    };

    if (!useWorkflow) {
      await this.invokePrePublishEvent(entryDraft.entry, collection);
    }

    await this.implementation.persistEntry(
      {
        dataFiles,
        assets: assetProxies,
      },
      opts,
    );

    await this.invokePostSaveEvent(entryDraft.entry, collection);

    if (!useWorkflow) {
      await this.invokePostPublishEvent(entryDraft.entry, collection);
    }

    return slug;
  }

  async getEventData(entry: Entry): Promise<EventData> {
    const { login, name = '' } = (await this.currentUser()) as User;
    return { entry, author: { login, name } };
  }

  async invokePrePublishEvent(entry: Entry, collection: CollectionWithDefaults) {
    const eventData = await this.getEventData(entry);
    return await invokeEvent({ name: 'prePublish', collection: collection.name, data: eventData });
  }

  async invokePostPublishEvent(entry: Entry, collection: CollectionWithDefaults) {
    const eventData = await this.getEventData(entry);
    return await invokeEvent({ name: 'postPublish', collection: collection.name, data: eventData });
  }

  async invokePreSaveEvent(entry: Entry, collection: CollectionWithDefaults): Promise<EntryData> {
    const eventData = await this.getEventData(entry);
    return await invokeEvent({ name: 'preSave', collection: collection.name, data: eventData });
  }

  async invokePostSaveEvent(entry: Entry, collection: CollectionWithDefaults): Promise<void> {
    const eventData = await this.getEventData(entry);
    await invokeEvent({ name: 'postSave', collection: collection.name, data: eventData });
  }

  async persistMedia(config: ConfigWithDefaults, file: AssetProxy) {
    const user = (await this.currentUser()) as User;
    const options = {
      commitMessage: commitMessageFormatter(
        'uploadMedia',
        config,
        {
          path: file.path,
          authorLogin: user.login,
          authorName: user.name,
        },
        user.useOpenAuthoring,
      ),
    };
    return this.implementation.persistMedia(file, options);
  }

  async deleteEntry<EF extends BaseField>(
    state: RootState<EF>,
    collection: CollectionWithDefaults<EF>,
    slug: string,
  ) {
    const configState = state.config;
    if (!configState.config) {
      throw new Error('Config not loaded');
    }

    const path = selectEntryPath(collection, slug) as string;
    const extension = selectFolderEntryExtension(collection) as string;

    if (!selectAllowDeletion(collection)) {
      throw new Error('Not allowed to delete entries in this collection');
    }

    const user = (await this.currentUser()) as User;
    const commitMessage = commitMessageFormatter(
      'delete',
      configState.config,
      {
        collection,
        slug,
        path,
        authorLogin: user.login,
        authorName: user.name,
      },
      user.useOpenAuthoring,
    );

    let paths = [path];
    if (hasI18n(collection)) {
      paths = getFilePaths(collection, extension, path, slug);
    }
    await this.implementation.deleteFiles(paths, commitMessage);
  }

  async deleteMedia(config: ConfigWithDefaults, path: string) {
    const user = (await this.currentUser()) as User;
    const commitMessage = commitMessageFormatter(
      'deleteMedia',
      config,
      {
        path,
        authorLogin: user.login,
        authorName: user.name,
      },
      user.useOpenAuthoring,
    );
    return this.implementation.deleteFiles([path], commitMessage);
  }

  entryToRaw(collection: CollectionWithDefaults, entry: Entry, config: ConfigWithDefaults): string {
    const format = resolveFormat(collection, entry);
    const fieldsOrder = this.fieldsOrder(collection, entry);
    const fieldsComments = selectFieldsComments(collection, entry);
    return format ? format.toFile(entry.data ?? {}, config, fieldsOrder, fieldsComments) : '';
  }

  fieldsOrder(collection: CollectionWithDefaults, entry: Entry) {
    if ('fields' in collection) {
      return collection.fields?.map(f => f!.name) ?? [];
    }

    const files = collection.files ?? [];
    const file: CollectionFile | null = files.filter(f => f!.name === entry.slug)?.[0] ?? null;

    if (file == null) {
      throw new Error(`No file found for ${entry.slug} in ${collection.name}`);
    }
    return file.fields.map(f => f.name);
  }

  filterEntries(collection: { entries: Entry[] }, filterRule: FilterRule | FilterRule[]) {
    return filterEntries(collection.entries, filterRule, undefined);
  }

  /**
   * Editorial Workflows
   */
  async processUnpublishedEntry(
    collection: CollectionWithDefaults,
    config: ConfigWithDefaults,
    entryData: UnpublishedEntry,
    withMediaFiles: boolean,
  ) {
    const { slug, openAuthoring } = entryData;
    let extension: string;
    if ('files' in collection) {
      const file = collection.files.find(f => f?.name === slug);
      extension = file ? extname(file.file) : formatExtensions['json'];
    } else {
      extension = selectFolderEntryExtension(collection);
    }

    const mediaFiles: MediaFile[] = [];
    if (withMediaFiles) {
      const nonDataFiles = entryData.diffs.filter(d => !d.path.endsWith(extension));
      const files = await Promise.all(
        nonDataFiles.map(f =>
          this.implementation!.unpublishedEntryMediaFile(collection.name, slug, f.path, f.id),
        ),
      );
      mediaFiles.push(...files.map(f => ({ ...f, draft: true })));
    }

    const dataFiles = entryData.diffs.filter(d => d.path.endsWith(extension));
    dataFiles.sort((a, b) => a.path.length - b.path.length);

    const formatData = (data: string, path: string, newFile: boolean) => {
      const entry = createEntry(collection.name, slug, path, {
        raw: data,
        isModification: !newFile,
        label: collection && selectFileEntryLabel(collection, slug),
        mediaFiles,
        updatedOn: entryData.updatedAt,
        author: entryData.pullRequestAuthor,
        status: workflowStatusFromString(entryData.status),
        meta: { path: prepareMetaPath(path, collection) },
        openAuthoring,
      });

      return this.entryWithFormat(collection, config)(entry);
    };

    const readAndFormatDataFile = async (dataFile: UnpublishedEntryDiff) => {
      const data = await this.implementation.unpublishedEntryDataFile(
        collection.name,
        entryData.slug,
        dataFile.path,
        dataFile.id,
      );

      return formatData(data, dataFile.path, dataFile.newFile);
    };

    // if the unpublished entry has no diffs, return the original
    if (dataFiles.length <= 0) {
      const loadedEntry = await this.implementation.getEntry(
        selectEntryPath(collection, slug) as string,
      );
      return formatData(loadedEntry.data, loadedEntry.file.path, false);
    } else if (hasI18n(collection)) {
      // we need to read all locales files and not just the changes
      const path = selectEntryPath(collection, slug) as string;
      const i18nFiles = getI18nDataFiles(collection, extension, path, slug, dataFiles);
      let entries = await Promise.all(
        i18nFiles.map(dataFile => readAndFormatDataFile(dataFile).catch(() => null)),
      );
      entries = entries.filter(Boolean);
      const grouped = await groupEntries(collection, extension, entries as Entry[]);
      return grouped[0];
    } else {
      return readAndFormatDataFile(dataFiles[0]);
    }
  }

  async unpublishedEntries(collections: CollectionsWithDefaults, config: ConfigWithDefaults) {
    const ids = await this.implementation.unpublishedEntries();
    const entries = (
      await Promise.all(
        ids.map(async id => {
          const entryData = await this.implementation.unpublishedEntry({ id });
          const collectionName = entryData.collection;
          const collection = Object.values(collections).find(c => c.name === collectionName);
          if (!collection) {
            console.warn(`Missing collection '${collectionName}' for unpublished entry '${id}'`);
            return null;
          }

          return this.processUnpublishedEntry(collection, config, entryData, false);
        }),
      )
    ).filter(Boolean) as Entry[];

    return { pagination: 0, entries };
  }

  async unpublishedEntry(
    state: RootState,
    collection: CollectionWithDefaults,
    config: ConfigWithDefaults,
    slug: string,
  ) {
    const entryData = await this.implementation.unpublishedEntry({
      collection: collection.name,
      slug,
    });

    let entry = await this.processUnpublishedEntry(collection, config, entryData, true);
    entry = await this.processEntry(state, collection, entry);
    return entry;
  }

  persistUnpublishedEntry(args: PersistArgs) {
    return this.persistEntry({ ...args, unpublished: true });
  }

  updateUnpublishedEntryStatus(collection: string, slug: string, newStatus: WorkflowStatus) {
    return this.implementation.updateUnpublishedEntryStatus(collection, slug, newStatus);
  }

  deleteUnpublishedEntry(collection: string, slug: string) {
    return this.implementation.deleteUnpublishedEntry(collection, slug);
  }

  async publishUnpublishedEntry(collection: CollectionWithDefaults, entry: Entry) {
    await this.invokePrePublishEvent(entry, collection);
    await this.implementation.publishUnpublishedEntry(collection.name, entry.slug);
    await this.invokePostPublishEvent(entry, collection);
  }
}

export function resolveBackend<EF extends BaseField>(config?: ConfigWithDefaults<EF>) {
  if (!config?.backend.name) {
    throw new Error('No backend defined in configuration');
  }

  const { name } = config.backend;
  const authStore = new LocalStorageAuthStore();

  const backend = getBackend<EF>(name);
  if (!backend) {
    throw new Error(`Backend not found: ${name}`);
  } else {
    return new Backend<EF, BackendClass>(backend, { backendName: name, authStore, config });
  }
}

export const currentBackend = (function () {
  let backend: Backend;

  return <EF extends BaseField = UnknownField>(config: ConfigWithDefaults<EF>) => {
    if (backend) {
      return backend;
    }

    return (backend = resolveBackend(config) as unknown as Backend);
  };
})();
