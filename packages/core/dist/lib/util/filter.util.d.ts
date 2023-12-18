import type { Entry, FieldFilterRule, FilterRule } from '@staticcms/core/interface';
export declare function entryMatchesFieldRule(entry: Entry, filterRule: FieldFilterRule, listItemPath: string | undefined): boolean;
export default function filterEntries(entries: Entry[], filterRule: FilterRule | FilterRule[], listItemPath: string | undefined): Entry<import("@staticcms/core/interface").ObjectValue>[];
