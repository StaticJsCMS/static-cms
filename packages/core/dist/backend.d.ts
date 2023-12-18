import { Cursor } from './lib/util';
import type { BackendClass, BackendInitializer, BaseField, Collection, Config, Credentials, DisplayURL, Entry, EntryData, EventData, FilterRule, ImplementationEntry, MediaField, ObjectValue, PersistArgs, SearchQueryResponse, SearchResponse, UnknownField, User } from './interface';
import type { AsyncLock } from './lib/util';
import type { RootState } from './store';
import type AssetProxy from './valueObjects/AssetProxy';
export declare class LocalStorageAuthStore {
    storageKey: string;
    retrieve(): any;
    store(userData: unknown): void;
    logout(): void;
}
export declare function getEntryField(field: string, entry: Entry): string;
export declare function extractSearchFields(searchFields: string[]): (entry: Entry) => string;
export declare function expandSearchEntries(entries: Entry[], searchFields: string[]): (Entry & {
    field: string;
})[];
export declare function mergeExpandedEntries(entries: (Entry & {
    field: string;
})[]): Entry[];
interface AuthStore {
    retrieve: () => User;
    store: (user: User) => void;
    logout: () => void;
}
interface BackendOptions<EF extends BaseField> {
    backendName: string;
    config: Config<EF>;
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
export declare class Backend<EF extends BaseField = UnknownField, BC extends BackendClass = BackendClass> {
    implementation: BC;
    backendName: string;
    config: Config<EF>;
    authStore?: AuthStore;
    user?: User | null;
    backupSync: AsyncLock;
    constructor(implementation: BackendInitializer<EF>, { backendName, authStore, config }: BackendOptions<EF>);
    status(): Promise<{
        auth: {
            status: boolean;
        };
        api: {
            status: boolean;
            statusPage: string;
        };
    }>;
    currentUser(): User | Promise<User> | Promise<null>;
    isGitBackend(): boolean;
    updateUserCredentials: (updatedCredentials: Credentials) => User | undefined;
    authComponent(): (props: import("./interface").TranslatedProps<import("./interface").AuthenticationPageProps>) => JSX.Element;
    authenticate(credentials: Credentials): Promise<User>;
    logout(): Promise<void>;
    getToken: () => Promise<string | null>;
    entryExist(path: string): Promise<string | boolean>;
    generateUniqueSlug(collection: Collection, entryData: EntryData, config: Config, usedSlugs: string[], customPath: string | undefined): Promise<string>;
    processEntries<EF extends BaseField>(loadedEntries: ImplementationEntry[], collection: Collection<EF>): Entry[];
    listEntries(collection: Collection): Promise<{
        entries: Entry<ObjectValue>[];
        pagination: unknown;
        cursor: Cursor;
    }>;
    listAllEntries<EF extends BaseField>(collection: Collection<EF>): Promise<Entry<ObjectValue>[]>;
    search(collections: Collection[], searchTerm: string): Promise<SearchResponse>;
    query<EF extends BaseField>(collection: Collection<EF>, searchFields: string[], searchTerm: string, file?: string, limit?: number): Promise<SearchQueryResponse>;
    traverseCursor(cursor: Cursor, action: string): Promise<{
        entries: Entry[];
        cursor: Cursor;
    }>;
    getLocalDraftBackup(collection: Collection, slug: string): Promise<{
        entry: Entry | null;
    }>;
    persistLocalDraftBackup(entry: Entry, collection: Collection): Promise<string | undefined>;
    deleteLocalDraftBackup(collection: Collection, slug: string): Promise<void>;
    deleteAnonymousBackup(): Promise<void>;
    getEntry<EF extends BaseField>(state: RootState<EF>, collection: Collection<EF>, slug: string): Promise<Entry<ObjectValue>>;
    getMedia(folder?: string | undefined, folderSupport?: boolean, mediaPath?: string | undefined): Promise<import("./interface").ImplementationMediaFile[]>;
    getMediaFile(path: string): Promise<import("./interface").ImplementationMediaFile>;
    getMediaDisplayURL(displayURL: DisplayURL): Promise<string>;
    entryWithFormat<EF extends BaseField>(collection: Collection<EF>): (entry: Entry) => Entry;
    processEntry<EF extends BaseField>(state: RootState<EF>, collection: Collection<EF>, entry: Entry): Promise<Entry<ObjectValue>>;
    persistEntry({ config, rootSlug, collection, entryDraft: draft, assetProxies, usedSlugs, status, }: PersistArgs): Promise<string>;
    getEventData(entry: Entry): Promise<EventData>;
    invokePreSaveEvent(entry: Entry, collection: Collection): Promise<EntryData>;
    invokePostSaveEvent(entry: Entry, collection: Collection): Promise<void>;
    persistMedia(config: Config, file: AssetProxy): Promise<import("./interface").ImplementationMediaFile>;
    deleteEntry<EF extends BaseField>(state: RootState<EF>, collection: Collection<EF>, slug: string): Promise<void>;
    deleteMedia(config: Config, path: string): Promise<unknown>;
    entryToRaw(collection: Collection, entry: Entry): string;
    fieldsOrder(collection: Collection, entry: Entry): string[];
    filterEntries(collection: {
        entries: Entry[];
    }, filterRule: FilterRule | FilterRule[]): Entry<ObjectValue>[];
}
export declare function resolveBackend<EF extends BaseField>(config?: Config<EF>): Backend<EF, BackendClass>;
export declare const currentBackend: <EF extends BaseField = UnknownField>(config: Config<EF>) => Backend<UnknownField, BackendClass>;
export {};
