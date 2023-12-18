import type { Breadcrumb, Collection } from '@staticcms/core/interface';
import type { t } from 'react-polyglot';
interface EntryDetails {
    isNewEntry: boolean;
    summary: string;
    t: t;
}
export default function useBreadcrumbs(collection: Collection, filterTerm: string | undefined | null, entryDetails?: EntryDetails): Breadcrumb[];
export {};
