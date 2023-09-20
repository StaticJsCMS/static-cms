import trim from 'lodash/trim';
import { basename, dirname, extname, join } from 'path';

import { sanitizeSlug } from '../urlHelper';
import { stringTemplate } from '../widgets';
import { selectEntryCollectionTitle, selectFolderEntryExtension } from './collection.util';
import { isEmpty, isNotEmpty } from './string.util';

import type { BaseField, Collection, Entry, Slug } from '@staticcms/core/interface';

const { addFileTemplateFields } = stringTemplate;

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

export function selectCustomPath(
  entry: Entry,
  collection: Collection,
  rootSlug: string | undefined,
  slugConfig: Slug | undefined,
): string | undefined {
  if (!('nested' in collection) || !collection.nested?.path) {
    return undefined;
  }

  const indexFile = collection.nested.path.index_file;
  const extension = selectFolderEntryExtension(collection);

  const slug = entry.meta?.path ?? getNestedSlug(collection, entry, rootSlug, slugConfig);

  const customPath = join(collection.folder, slug, `${indexFile}.${extension}`);
  return customPath;
}

export function customPathFromSlug(collection: Collection, slug: string): string {
  if (!('nested' in collection) || !collection.nested) {
    return '';
  }

  if (collection.nested.path) {
    if ('nested' in collection && collection.nested?.path) {
      return slug.replace(new RegExp(`/${collection.nested.path.index_file}$`, 'g'), '');
    }
  }

  return slug;
}

export function slugFromCustomPath(collection: Collection, customPath: string): string {
  if (!('folder' in collection)) {
    return '';
  }

  const folderPath = collection.folder;
  const entryPath = customPath.toLowerCase().replace(folderPath.toLowerCase(), '');
  const slug = join(dirname(trim(entryPath, '/')), basename(entryPath, extname(customPath)));
  return slug;
}

export function getNestedSlug(
  collection: Collection,
  entry: Entry,
  slug: string | undefined,
  slugConfig: Slug | undefined,
) {
  if ('nested' in collection && collection.nested?.path) {
    if (isNotEmpty(entry.slug)) {
      return entry.slug.replace(new RegExp(`/${collection.nested.path.index_file}$`, 'g'), '');
    } else if (slug) {
      let summarySlug = selectEntryCollectionTitle(collection, entry);
      if (isEmpty(summarySlug)) {
        summarySlug = `new-${collection.label_singular ?? collection.label}`;
      }

      return `${customPathFromSlug(collection, slug)}/${sanitizeSlug(
        summarySlug.toLowerCase(),
        slugConfig,
      )}`;
    }
  }

  return '';
}

export function isNodeEditable(collection: Collection, node: SingleTreeNodeData | TreeNodeData): boolean {
  return !node.isDir && (!collection.extension || node.path.endsWith(collection.extension));
}

export function isNodeIndexFile(collection: Collection, node: SingleTreeNodeData | TreeNodeData | Entry): boolean {
  const index_file = 'nested' in collection ? collection.nested?.path?.index_file : undefined;
  return !!(
    index_file && node && 'slug' in node
    && (!('children' in node) || !node.isDir)
    && node.path.endsWith(`/${index_file}.${collection.extension}`)
  );
}

export function getTreeNodeIndexFile(collection: Collection, node: SingleTreeNodeData | TreeNodeData | Entry): (TreeNodeData & Entry) | undefined {
  if (node && 'children' in node) {
    return node.children.find(c => isNodeIndexFile(collection, c)) as TreeNodeData & Entry;
  }
}

export function getTreeData<EF extends BaseField>(
  collection: Collection<EF>,
  entries: Entry[],
): TreeNodeData[] {
  const collectionFolder = 'folder' in collection ? collection.folder : '';
  const rootFolder = '/';
  const entriesObj = entries.map(e => ({ ...e, path: e.path.slice(collectionFolder.length) }));

  const dirs = entriesObj.reduce((acc, entry) => {
    let dir: string | undefined = dirname(entry.path);
    while (dir && !acc[dir] && dir !== rootFolder) {
      const parts: string[] = dir.split('/');
      acc[dir] = parts.pop();
      dir = parts.length ? parts.join('/') : undefined;
    }
    return acc;
  }, {} as Record<string, string | undefined>);

  if ('nested' in collection && collection.nested?.summary) {
    collection = {
      ...collection,
      summary: collection.nested.summary,
    };
  } else {
    collection = {
      ...collection,
    };
    delete collection.summary;
  }

  const flatData = [
    {
      title: collection.label,
      path: rootFolder,
      isDir: true,
      isRoot: true,
    },
    ...Object.entries(dirs).map(([key, value]) => ({
      title: value,
      path: key,
      isDir: true,
      isRoot: false,
    })),
    ...entriesObj.map((e, index) => {
      let entry = entries[index];
      entry = {
        ...entry,
        data: addFileTemplateFields(entry.path, entry.data as Record<string, string>),
      };
      const title = selectEntryCollectionTitle(collection, entry);
      return {
        ...e,
        title,
        isDir: false,
        isRoot: false,
      };
    }),
  ];

  const parentsToChildren = flatData.reduce((acc, node) => {
    const parent = node.path === rootFolder ? '' : dirname(node.path);
    if (acc[parent]) {
      acc[parent].push(node);
    } else {
      acc[parent] = [node];
    }
    return acc;
  }, {} as Record<string, BaseTreeNodeData[]>);

  function reducer(acc: TreeNodeData[], value: BaseTreeNodeData) {
    const node = value;
    let children: TreeNodeData[] = [];
    if (parentsToChildren[node.path]) {
      children = parentsToChildren[node.path].reduce(reducer, []);
    }

    acc.push({ ...node, children });
    return acc;
  }

  const treeData = parentsToChildren[''].reduce(reducer, []);

  return treeData;
}
