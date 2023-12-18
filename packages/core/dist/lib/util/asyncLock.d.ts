export type AsyncLock = {
    release: () => void;
    acquire: () => Promise<boolean>;
};
export declare function asyncLock(): AsyncLock;
