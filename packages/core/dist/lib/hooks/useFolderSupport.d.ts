import type { Collection, CollectionFile, Config, MediaField } from '@staticcms/core/interface';
interface UseFolderSupportProps {
    config?: Config;
    collection?: Collection;
    collectionFile?: CollectionFile;
    field?: MediaField;
}
export declare function getFolderSupport({ config, collection, collectionFile, field, }: UseFolderSupportProps): boolean;
export default function useFolderSupport(props: UseFolderSupportProps): boolean;
export {};
