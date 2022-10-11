import * as fuzzy from 'fuzzy';
import attempt from 'lodash/attempt';
import flatten from 'lodash/flatten';
import get from 'lodash/get';
import isError from 'lodash/isError';
import set from 'lodash/set';
import trim from 'lodash/trim';
import uniq from 'lodash/uniq';
import { basename, dirname, extname, join } from 'path';

import { FILES, FOLDER } from './constants/collectionTypes';
import { resolveFormat } from './formats/formats';
import { commitMessageFormatter, slugFormatter } from './lib/formatters';
import {
  formatI18nBackup,
  getFilePaths,
  getI18nBackup,
  getI18nEntry,
  getI18nFiles,
  getI18nFilesDepth,
  groupEntries,
  hasI18n,
} from './lib/i18n';
import { getBackend, invokeEvent } from './lib/registry';
import { sanitizeChar } from './lib/urlHelper';
import {
  asyncLock,
  blobToFileObj,
  Cursor,
  CURSOR_COMPATIBILITY_SYMBOL,
  getPathDepth,
  localForage,
} from './lib/util';
import {
  selectAllowDeletion,
  selectAllowNewEntries,
  selectCustomPath,
  selectEntryPath,
  selectEntrySlug,
  selectFieldsComments,
  selectFileEntryLabel,
  selectFolderEntryExtension,
  selectHasMetaPath,
  selectInferedField,
  selectMediaFolders,
} from './lib/util/collection.util';
import { selectMediaFilePath } from './lib/util/media.util';
import { stringTemplate } from './lib/widgets';
import { selectIntegration } from './reducers/integrations';
import { createEntry } from './valueObjects/Entry';

import type {
  CmsBackendClass,
  CmsBackendInitializer,
  CmsConfig,
  CmsField,
  Collection,
  CollectionFile,
  Credentials,
  DataFile,
  DisplayURL,
  Entry,
  EntryData,
  EntryDraft,
  FilterRule,
  ImplementationEntry,
  SearchQueryResponse,
  SearchResponse,
  User,
} from './interface';
import type { AllowedEvent } from './lib/registry';
import type { AsyncLock } from './lib/util';
import type { RootState } from './store';
import type AssetProxy from './valueObjects/AssetProxy';

const { extractTemplateVars, dateParsers, expandPath } = stringTemplate;

function updateAssetProxies(
  assetProxies: AssetProxy[],
  config: CmsConfig,
  collection: Collection,
  entryDraft: EntryDraft,
  path: string,
) {
  assetProxies.map(asset => {
    // update media files path based on entry path
    const oldPath = asset.path;
    entryDraft.entry.path = path;
    const newPath = selectMediaFilePath(config, collection, entryDraft.entry, oldPath, asset.field);
    asset.path = newPath;
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

function getEntryBackupKey(collectionName?: string, slug?: string) {
  const baseKey = 'backup';
  if (!collectionName) {
    return baseKey;
  }
  const suffix = slug ? `.${slug}` : '';
  return `${baseKey}.${collectionName}${suffix}`;
}

function getEntryField(field: string, entry: Entry): string {
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

export function expandSearchEntries(entries: Entry[], searchFields: string[]) {
  // expand the entries for the purpose of the search
  const expandedEntries = entries.reduce((acc, e) => {
    const expandedFields = searchFields.reduce((acc, f) => {
      const fields = expandPath({ data: e.data, path: f });
      acc.push(...fields);
      return acc;
    }, [] as string[]);

    for (let i = 0; i < expandedFields.length; i++) {
      acc.push({ ...e, field: expandedFields[i] });
    }

    return acc;
  }, [] as (Entry & { field: string })[]);

  return expandedEntries;
}

export function mergeExpandedEntries(entries: (Entry & { field: string })[]) {
  // merge the search results by slug and only keep data that matched the search
  const fields = entries.map(f => f.field);
  const arrayPaths: Record<string, Set<string>> = {};

  const merged = entries.reduce((acc, e) => {
    if (!acc[e.slug]) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { field, ...rest } = e;
      acc[e.slug] = rest;
      arrayPaths[e.slug] = new Set();
    }

    const nestedFields = e.field.split('.');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let value = acc[e.slug].data as any;
    for (let i = 0; i < nestedFields.length; i++) {
      value = value[nestedFields[i]];
      if (Array.isArray(value)) {
        const path = nestedFields.slice(0, i + 1).join('.');
        arrayPaths[e.slug] = arrayPaths[e.slug].add(path);
      }
    }

    return acc;
  }, {} as Record<string, Entry>);

  // this keeps the search score sorting order designated by the order in entries
  // and filters non matching items
  Object.keys(merged).forEach(slug => {
    const data = merged[slug].data ?? {};
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

      set(data, path, filtered);
    }
  });

  return Object.values(merged);
}

function sortByScore(a: fuzzy.FilterResult<Entry>, b: fuzzy.FilterResult<Entry>) {
  if (a.score > b.score) return -1;
  if (a.score < b.score) return 1;
  return 0;
}

export function slugFromCustomPath(collection: Collection, customPath: string) {
  const folderPath = collection.folder ?? '';
  const entryPath = customPath.toLowerCase().replace(folderPath.toLowerCase(), '');
  const slug = join(dirname(trim(entryPath, '/')), basename(entryPath, extname(customPath)));
  return slug;
}

interface AuthStore {
  retrieve: () => User;
  store: (user: User) => void;
  logout: () => void;
}

interface BackendOptions {
  backendName: string;
  config: CmsConfig;
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
  field?: CmsField;
  queryOrder?: unknown;
  isViewableImage?: boolean;
  type?: string;
}

interface BackupEntry {
  raw: string;
  path: string;
  mediaFiles: MediaFile[];
  i18n?: Record<string, { raw: string }>;
}

interface PersistArgs {
  config: CmsConfig;
  collection: Collection;
  entryDraft: EntryDraft;
  assetProxies: AssetProxy[];
  usedSlugs: string[];
  status?: string;
}

function prepareMetaPath(path: string, collection: Collection) {
  if (!selectHasMetaPath(collection)) {
    return path;
  }
  const dir = dirname(path);
  return dir.slice(collection.folder!.length + 1) || '/';
}

function collectionDepth(collection: Collection) {
  let depth;
  depth = collection.nested?.depth || getPathDepth(collection.path ?? '');

  if (hasI18n(collection)) {
    depth = getI18nFilesDepth(collection, depth);
  }

  return depth;
}

export class Backend {
  implementation: CmsBackendClass;
  backendName: string;
  config: CmsConfig;
  authStore?: AuthStore;
  user?: User | null;
  backupSync: AsyncLock;

  constructor(
    implementation: CmsBackendInitializer,
    { backendName, authStore, config }: BackendOptions,
  ) {
    // We can't reliably run this on exit, so we do cleanup on load.
    this.deleteAnonymousBackup();
    this.config = config;
    this.implementation = implementation.init(this.config, {
      updateUserCredentials: this.updateUserCredentials,
    });
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

  isGitBackend() {
    return this.implementation.isGitBackend?.() || false;
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

  async entryExist(path: string) {
    const publishedEntry = await this.implementation
      .getEntry(path)
      .then(({ data }) => data)
      .catch(() => {
        return Promise.resolve(false);
      });

    return publishedEntry;
  }

  async generateUniqueSlug(
    collection: Collection,
    entryData: EntryData,
    config: CmsConfig,
    usedSlugs: string[],
    customPath: string | undefined,
  ) {
    const slugConfig = config.slug;
    let slug: string;
    if (customPath) {
      slug = slugFromCustomPath(collection, customPath);
    } else {
      slug = slugFormatter(collection, entryData, slugConfig);
    }
    let i = 1;
    let uniqueSlug = slug;

    // Check for duplicate slug in loaded entities store first before repo
    while (
      usedSlugs.includes(uniqueSlug) ||
      (await this.entryExist(selectEntryPath(collection, uniqueSlug) as string))
    ) {
      uniqueSlug = `${slug}${sanitizeChar(' ', slugConfig)}${i++}`;
    }
    return uniqueSlug;
  }

  processEntries(loadedEntries: ImplementationEntry[], collection: Collection): Entry[] {
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
          meta: { path: prepareMetaPath(loadedEntry.file.path, collection) },
        },
      ),
    );
    const formattedEntries = entries.map(this.entryWithFormat(collection));
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

  async listEntries(collection: Collection) {
    const extension = selectFolderEntryExtension(collection);
    let listMethod: () => Promise<ImplementationEntry[]>;
    const collectionType = collection.type;
    if (collectionType === FOLDER) {
      listMethod = () => {
        const depth = collectionDepth(collection);
        return this.implementation.entriesByFolder(collection.folder as string, extension, depth);
      };
    } else if (collectionType === FILES) {
      const files = collection.files!.map(collectionFile => ({
        path: collectionFile!.file,
        label: collectionFile!.label,
      }));
      listMethod = () => this.implementation.entriesByFiles(files);
    } else {
      throw new Error(`Unknown collection type: ${collectionType}`);
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
      entries: this.processEntries(loadedEntries, collection),
      pagination: cursor.meta?.page,
      cursor,
    };
  }

  // The same as listEntries, except that if a cursor with the "next"
  // action available is returned, it calls "next" on the cursor and
  // repeats the process. Once there is no available "next" action, it
  // returns all the collected entries. Used to retrieve all entries
  // for local searches and queries.
  async listAllEntries(collection: Collection) {
    if (collection.folder && this.implementation.allEntriesByFolder) {
      const depth = collectionDepth(collection);
      const extension = selectFolderEntryExtension(collection);
      return this.implementation
        .allEntriesByFolder(collection.folder as string, extension, depth)
        .then(entries => this.processEntries(entries, collection));
    }

    const response = await this.listEntries(collection);
    const { entries } = response;
    let { cursor } = response;
    while (cursor && cursor.actions?.has('next')) {
      const { entries: newEntries, cursor: newCursor } = await this.traverseCursor(cursor, 'next');
      entries.push(...newEntries);
      cursor = newCursor;
    }
    return entries;
  }

  async search(collections: Collection[], searchTerm: string): Promise<SearchResponse> {
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

        if (collection.type === FILES) {
          collection.files?.forEach(f => {
            const topLevelFields = f!.fields.map(f => f!.name);
            searchFields = [...searchFields, ...topLevelFields];
          });
        } else {
          searchFields = [
            selectInferedField(collection, 'title'),
            selectInferedField(collection, 'shortTitle'),
            selectInferedField(collection, 'author'),
            ...summaryFields.map(elem => {
              if (dateParsers[elem]) {
                return selectInferedField(collection, 'date');
              }
              return elem;
            }),
          ];
        }
        const filteredSearchFields = searchFields.filter(Boolean) as string[];
        const collectionEntries = await this.listAllEntries(collection);
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
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      throw new Error({ message: 'Errors ocurred while searching entries locally!', errors });
    }

    const hits = entries
      .filter(({ score }: fuzzy.FilterResult<Entry>) => score > 5)
      .sort(sortByScore)
      .map((f: fuzzy.FilterResult<Entry>) => f.original);
    return { entries: hits, pagination: 1 };
  }

  async query(
    collection: Collection,
    searchFields: string[],
    searchTerm: string,
    file?: string,
    limit?: number,
  ): Promise<SearchQueryResponse> {
    let entries = await this.listAllEntries(collection);
    if (file) {
      entries = entries.filter(e => e.slug === file);
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

  traverseCursor(cursor: Cursor, action: string): Promise<{ entries: Entry[]; cursor: Cursor }> {
    const [data, unwrappedCursor] = cursor.unwrapData();
    // TODO: stop assuming all cursors are for collections
    const collection = data.collection as Collection;
    return this.implementation.traverseCursor!(unwrappedCursor, action).then(
      async ({ entries, cursor: newCursor }) => ({
        entries: this.processEntries(entries, collection),
        cursor: Cursor.create(newCursor).wrapData({
          cursorType: 'collectionEntries',
          collection,
        }),
      }),
    );
  }

  async getLocalDraftBackup(
    collection: Collection,
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
      return this.entryWithFormat(collection)(
        createEntry(collection.name, slug, path, {
          raw,
          label,
          mediaFiles,
          meta: { path: prepareMetaPath(path, collection) },
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

  async persistLocalDraftBackup(entry: Entry, collection: Collection) {
    try {
      await this.backupSync.acquire();
      const key = getEntryBackupKey(collection.name, entry.slug);
      const raw = this.entryToRaw(collection, entry);

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
        i18n = getI18nBackup(collection, entry, entry => this.entryToRaw(collection, entry));
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
      console.warn('persistLocalDraftBackup', e);
    } finally {
      this.backupSync.release();
    }
  }

  async deleteLocalDraftBackup(collection: Collection, slug: string) {
    try {
      await this.backupSync.acquire();
      await localForage.removeItem(getEntryBackupKey(collection.name, slug));
      // delete new entry backup if not deleted
      slug && (await localForage.removeItem(getEntryBackupKey(collection.name)));
      const result = await this.deleteAnonymousBackup();
      return result;
    } catch (e) {
      console.warn('deleteLocalDraftBackup', e);
    } finally {
      this.backupSync.release();
    }
  }

  // Unnamed backup for use in the global error boundary, should always be
  // deleted on cms load.
  deleteAnonymousBackup() {
    return localForage.removeItem(getEntryBackupKey());
  }

  async getEntry(state: RootState, collection: Collection, slug: string) {
    const path = selectEntryPath(collection, slug) as string;
    const label = selectFileEntryLabel(collection, slug);
    const extension = selectFolderEntryExtension(collection);

    const getEntryValue = async (path: string) => {
      const loadedEntry = await this.implementation.getEntry(path);
      let entry = createEntry(collection.name, slug, loadedEntry.file.path, {
        raw: loadedEntry.data,
        label,
        mediaFiles: [],
        meta: { path: prepareMetaPath(loadedEntry.file.path, collection) },
      });

      entry = this.entryWithFormat(collection)(entry);
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

  getMedia() {
    return this.implementation.getMedia();
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

  entryWithFormat(collection: Collection) {
    return (entry: Entry): Entry => {
      const format = resolveFormat(collection, entry);
      if (entry && entry.raw !== undefined) {
        const data = (format && attempt(format.fromFile.bind(format, entry.raw))) || {};
        if (isError(data)) console.error(data);
        return Object.assign(entry, { data: isError(data) ? {} : data });
      }
      return format.fromFile(entry);
    };
  }

  async processEntry(state: RootState, collection: Collection, entry: Entry) {
    const configState = state.config;
    if (!configState.config) {
      throw new Error('Config not loaded');
    }

    const integration = selectIntegration(state.integrations, null, 'assetStore');
    const mediaFolders = selectMediaFolders(configState.config, collection, entry);
    if (mediaFolders.length > 0 && !integration) {
      const files = await Promise.all(
        mediaFolders.map(folder => this.implementation.getMedia(folder)),
      );
      entry.mediaFiles = entry.mediaFiles.concat(...files);
    } else {
      entry.mediaFiles = entry.mediaFiles.concat(state.mediaLibrary.files || []);
    }

    return entry;
  }

  async persistEntry({
    config,
    collection,
    entryDraft: draft,
    assetProxies,
    usedSlugs,
    status,
  }: PersistArgs) {
    const modifiedData = await this.invokePreSaveEvent(draft.entry);
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

    const customPath = selectCustomPath(collection, entryDraft) ?? '';

    let dataFile: DataFile;
    if (newEntry) {
      if (!selectAllowNewEntries(collection)) {
        throw new Error('Not allowed to create new entries in this collection');
      }
      const slug = await this.generateUniqueSlug(
        collection,
        entryDraft.entry.data,
        config,
        usedSlugs,
        customPath,
      );
      const path = customPath || (selectEntryPath(collection, slug) as string);
      dataFile = {
        path,
        slug,
        raw: this.entryToRaw(collection, entryDraft.entry),
      };

      updateAssetProxies(assetProxies, config, collection, entryDraft, path);
    } else {
      const slug = entryDraft.entry.slug;
      dataFile = {
        path: entryDraft.entry.path,
        slug: customPath ? slugFromCustomPath(collection, customPath) : slug,
        raw: this.entryToRaw(collection, entryDraft.entry),
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
        (draftData: Entry) => this.entryToRaw(collection, draftData),
        path,
        slug,
        newPath,
      );
    }

    const user = (await this.currentUser()) as User;
    const commitMessage = commitMessageFormatter(newEntry ? 'create' : 'update', config, {
      collection,
      slug,
      path,
      authorLogin: user.login,
      authorName: user.name,
    });

    const collectionName = collection.name;

    const updatedOptions = { status };
    const opts = {
      newEntry,
      commitMessage,
      collectionName,
      ...updatedOptions,
    };

    await this.invokePrePublishEvent(entryDraft.entry);

    await this.implementation.persistEntry(
      {
        dataFiles,
        assets: assetProxies,
      },
      opts,
    );

    await this.invokePostSaveEvent(entryDraft.entry);
    await this.invokePostPublishEvent(entryDraft.entry);

    return slug;
  }

  async invokeEventWithEntry(event: AllowedEvent, entry: Entry) {
    const { login, name = '' } = (await this.currentUser()) as User;
    return await invokeEvent({ name: event, data: { entry, author: { login, name } } });
  }

  async invokePrePublishEvent(entry: Entry) {
    await this.invokeEventWithEntry('prePublish', entry);
  }

  async invokePostPublishEvent(entry: Entry) {
    await this.invokeEventWithEntry('postPublish', entry);
  }

  async invokePreSaveEvent(entry: Entry) {
    return await this.invokeEventWithEntry('preSave', entry);
  }

  async invokePostSaveEvent(entry: Entry) {
    await this.invokeEventWithEntry('postSave', entry);
  }

  async persistMedia(config: CmsConfig, file: AssetProxy) {
    const user = (await this.currentUser()) as User;
    const options = {
      commitMessage: commitMessageFormatter('uploadMedia', config, {
        path: file.path,
        authorLogin: user.login,
        authorName: user.name,
      }),
    };
    return this.implementation.persistMedia(file, options);
  }

  async deleteEntry(state: RootState, collection: Collection, slug: string) {
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
    const commitMessage = commitMessageFormatter('delete', configState.config, {
      collection,
      slug,
      path,
      authorLogin: user.login,
      authorName: user.name,
    });

    let paths = [path];
    if (hasI18n(collection)) {
      paths = getFilePaths(collection, extension, path, slug);
    }
    await this.implementation.deleteFiles(paths, commitMessage);
  }

  async deleteMedia(config: CmsConfig, path: string) {
    const user = (await this.currentUser()) as User;
    const commitMessage = commitMessageFormatter('deleteMedia', config, {
      path,
      authorLogin: user.login,
      authorName: user.name,
    });
    return this.implementation.deleteFiles([path], commitMessage);
  }

  entryToRaw(collection: Collection, entry: Entry): string {
    const format = resolveFormat(collection, entry);
    const fieldsOrder = this.fieldsOrder(collection, entry);
    const fieldsComments = selectFieldsComments(collection, entry);
    return format && format.toFile(entry.data, fieldsOrder, fieldsComments);
  }

  fieldsOrder(collection: Collection, entry: Entry) {
    const fields = collection.fields;
    if (fields) {
      return collection.fields.map(f => f!.name);
    }

    const files = collection.files;
    const file: CollectionFile | null =
      (files ?? []).filter(f => f!.name === entry.slug)?.[0] ?? null;

    if (file == null) {
      throw new Error(`No file found for ${entry.slug} in ${collection.name}`);
    }
    return file.fields.map(f => f.name);
  }

  filterEntries(collection: { entries: Entry[] }, filterRule: FilterRule) {
    return collection.entries.filter(entry => {
      const fieldValue = entry.data?.[filterRule.field] as string[];
      if (Array.isArray(fieldValue)) {
        return fieldValue.includes(filterRule.value);
      }
      return fieldValue === filterRule.value;
    });
  }
}

export function resolveBackend(config?: CmsConfig) {
  if (!config?.backend.name) {
    throw new Error('No backend defined in configuration');
  }

  const { name } = config.backend;
  const authStore = new LocalStorageAuthStore();

  const backend = getBackend(name);
  if (!backend) {
    throw new Error(`Backend not found: ${name}`);
  } else {
    return new Backend(backend, { backendName: name, authStore, config });
  }
}

export const currentBackend = (function () {
  let backend: Backend;

  return (config: CmsConfig) => {
    if (backend) {
      return backend;
    }

    return (backend = resolveBackend(config));
  };
})();
