import type { BaseField, Collection, Entry, Slug } from '@staticcms/core/interface';
interface BaseTreeNodeData {
    title: string | undefined;
    path: string;
    isDir: boolean;
    isRoot: boolean;
    expanded?: boolean;
}
export type SingleTreeNodeData = BaseTreeNodeData | (Entry & BaseTreeNodeData);
export type TreeNodeData = SingleTreeNodeData & {
    children: TreeNodeData[];
};
export declare function selectCustomPath(entry: Entry, collection: Collection, rootSlug: string | undefined, slugConfig: Slug | undefined): string | undefined;
export declare function customPathFromSlug(collection: Collection, slug: string): string;
export declare function slugFromCustomPath(collection: Collection, customPath: string): string;
export declare function getNestedSlug(collection: Collection, entry: Entry, slug: string | undefined, slugConfig: Slug | undefined): string;
export declare function getTreeData<EF extends BaseField>(collection: Collection<EF>, entries: Entry[]): TreeNodeData[];
export {};
