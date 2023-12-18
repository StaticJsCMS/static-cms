import type { Collection } from '@staticcms/core/interface';
interface EntryCallbackProps {
    hasLivePreview: boolean;
    collection: Collection;
    slug: string | undefined;
    callback: () => void;
}
export default function useEntryCallback({ hasLivePreview, slug, collection, callback, }: EntryCallbackProps): void;
export {};
