import { Article as ArticleIcon } from '@styled-icons/material/Article';
import { ChevronRight as ChevronRightIcon } from '@styled-icons/material/ChevronRight';
import sortBy from 'lodash/sortBy';
import { dirname, sep } from 'path';
import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import useEntries from '@staticcms/core/lib/hooks/useEntries';
import classNames from '@staticcms/core/lib/util/classNames.util';
import { selectEntryCollectionTitle } from '@staticcms/core/lib/util/collection.util';
import { stringTemplate } from '@staticcms/core/lib/widgets';
import NavLink from '../navbar/NavLink';

import type { Collection, Entry } from '@staticcms/core/interface';

const { addFileTemplateFields } = stringTemplate;

const NESTED_NAV_LINK_MARGIN = 32;

interface BaseTreeNodeData {
  title: string | undefined;
  path: string;
  isDir: boolean;
  isRoot: boolean;
  expanded?: boolean;
}

type SingleTreeNodeData = BaseTreeNodeData | (Entry & BaseTreeNodeData);

type TreeNodeData = SingleTreeNodeData & {
  children: TreeNodeData[];
};

function getNodeTitle(node: TreeNodeData) {
  const title = node.isRoot
    ? node.title
    : node.children.find(c => !c.isDir && c.title)?.title || node.title;
  return title;
}

interface TreeNodeProps {
  collection: Collection;
  treeData: TreeNodeData[];
  depth?: number;
  onToggle: ({ node, expanded }: { node: TreeNodeData; expanded: boolean }) => void;
}

const TreeNode = ({ collection, treeData, depth = 0, onToggle }: TreeNodeProps) => {
  const collectionName = collection.name;

  const sortedData = sortBy(treeData, getNodeTitle);
  return (
    <>
      {sortedData.map(node => {
        const leaf = node.children.length <= 1 && !node.children[0]?.isDir && depth > 0;
        if (leaf) {
          return null;
        }
        let to = `/collections/${collectionName}`;
        if (depth > 0) {
          to = `${to}/filter${node.path}`;
        }
        const title = getNodeTitle(node);

        const hasChildren = depth === 0 || node.children.some(c => c.children.some(c => c.isDir));

        console.log(node.path, node.expanded, node.children, hasChildren);
        return (
          <Fragment key={node.path}>
            <div style={{ marginLeft: `${NESTED_NAV_LINK_MARGIN * depth}px` }}>
              <NavLink
                to={to}
                onClick={() => onToggle({ node, expanded: !node.expanded })}
                data-testid={node.path}
                icon={<ArticleIcon className={classNames(depth === 0 ? 'h-6 w-6' : 'h-5 w-5')} />}
              >
                <div className="flex w-full gap-2 items-center justify-between">
                  <div>{title}</div>
                  {hasChildren && (
                    <ChevronRightIcon
                      className={classNames(
                        node.expanded && 'rotate-90 transform',
                        `
                          transition-transform
                          h-5
                          w-5
                          group-focus-within/active-list:text-blue-500
                          group-hover/active-list:text-blue-500
                        `,
                      )}
                    />
                  )}
                </div>
              </NavLink>
              <div className="mt-2 space-y-1.5">
                {node.expanded && (
                  <TreeNode
                    collection={collection}
                    depth={depth + 1}
                    treeData={node.children}
                    onToggle={onToggle}
                  />
                )}
              </div>
            </div>
          </Fragment>
        );
      })}
    </>
  );
};

export function walk(treeData: TreeNodeData[], callback: (node: TreeNodeData) => void) {
  function traverse(children: TreeNodeData[]) {
    for (const child of children) {
      callback(child);
      traverse(child.children);
    }
  }

  return traverse(treeData);
}

export function getTreeData(collection: Collection, entries: Entry[]): TreeNodeData[] {
  const collectionFolder = 'folder' in collection ? collection.folder : '';
  const rootFolder = '/';
  const entriesObj = entries.map(e => ({ ...e, path: e.path.slice(collectionFolder.length) }));

  const dirs = entriesObj.reduce((acc, entry) => {
    let dir: string | undefined = dirname(entry.path);
    while (dir && !acc[dir] && dir !== rootFolder) {
      const parts: string[] = dir.split(sep);
      acc[dir] = parts.pop();
      dir = parts.length ? parts.join(sep) : undefined;
    }
    return acc;
  }, {} as Record<string, string | undefined>);
  console.log('dirs', dirs);

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
    console.log('parentsToChildren', parentsToChildren);
    if (parentsToChildren[node.path]) {
      children = parentsToChildren[node.path].reduce(reducer, []);
    }

    acc.push({ ...node, children });
    return acc;
  }

  const treeData = parentsToChildren[''].reduce(reducer, []);

  return treeData;
}

export function updateNode(
  treeData: TreeNodeData[],
  node: TreeNodeData,
  callback: (node: TreeNodeData) => TreeNodeData,
) {
  let stop = false;

  function updater(nodes: TreeNodeData[]) {
    if (stop) {
      return nodes;
    }
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].path === node.path) {
        nodes[i] = callback(node);
        stop = true;
        return nodes;
      }
    }
    nodes.forEach(node => updater(node.children));
    return nodes;
  }

  return updater([...treeData]);
}

export interface NestedCollectionProps {
  collection: Collection;
  filterTerm: string;
}

const NestedCollection = ({ collection, filterTerm }: NestedCollectionProps) => {
  const entries = useEntries(collection);

  const [treeData, setTreeData] = useState<TreeNodeData[]>(getTreeData(collection, entries));
  const [selected, setSelected] = useState<TreeNodeData | null>(null);
  const [useFilter, setUseFilter] = useState(true);

  const [prevCollection, setPrevCollection] = useState<Collection | null>(null);
  const [prevEntries, setPrevEntries] = useState<Entry[] | null>(null);
  const [prevFilterTerm, setPrevFilterTerm] = useState<string | null>(null);

  const { pathname } = useLocation();

  useEffect(() => {
    if (collection !== prevCollection || entries !== prevEntries || filterTerm !== prevFilterTerm) {
      console.log('filterTerm', filterTerm);
      const expanded: Record<string, boolean> = {};
      walk(treeData, node => {
        if (node.expanded) {
          expanded[node.path] = true;
        }
      });
      const newTreeData = getTreeData(collection, entries);

      const path = `/${filterTerm}`;
      walk(newTreeData, node => {
        console.log(
          'filter check',
          useFilter,
          path,
          node,
          path.startsWith(node.path),
          pathname,
          collection.name,
          pathname.startsWith(`/collections/${collection.name}`),
        );
        if (
          expanded[node.path] ||
          (useFilter &&
            path.startsWith(node.path) &&
            pathname.startsWith(`/collections/${collection.name}`))
        ) {
          node.expanded = true;
        }
      });
      console.log('newTreeData', newTreeData);

      setTreeData(newTreeData);
    }

    setPrevCollection(collection);
    setPrevEntries(entries);
    setPrevFilterTerm(filterTerm);
  }, [
    collection,
    entries,
    filterTerm,
    pathname,
    prevCollection,
    prevEntries,
    prevFilterTerm,
    treeData,
    useFilter,
  ]);

  const onToggle = useCallback(
    ({ node, expanded }: { node: TreeNodeData; expanded: boolean }) => {
      if (!selected || selected.path === node.path || expanded) {
        setTreeData(
          updateNode(treeData, node, node => ({
            ...node,
            expanded,
          })),
        );
        setSelected(node);
        setUseFilter(false);
      } else {
        // don't collapse non selected nodes when clicked
        setSelected(node);
        setUseFilter(false);
      }
    },
    [selected, treeData],
  );

  return <TreeNode collection={collection} treeData={treeData} onToggle={onToggle} />;
};

export default NestedCollection;
