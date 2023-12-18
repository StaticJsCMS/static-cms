import type { BaseField, Collection, Entry, MediaField, UnknownField } from '@staticcms/core/interface';
export default function useIsMediaAsset<T extends MediaField, EF extends BaseField = UnknownField>(url: string, collection: Collection<EF>, field: T, entry: Entry, currentFolder?: string): boolean;
