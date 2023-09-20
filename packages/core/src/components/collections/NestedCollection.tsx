import { Article as ArticleIcon } from '@styled-icons/material/Article';
import { ChevronRight as ChevronRightIcon } from '@styled-icons/material/ChevronRight';
import sortBy from 'lodash/sortBy';
import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import useEntries from '@staticcms/core/lib/hooks/useEntries';
import classNames from '@staticcms/core/lib/util/classNames.util';
import {getTreeData, getTreeNodeIndexFile, isNodeEditable, isNodeIndexFile} from '@staticcms/core/lib/util/nested.util';
import NavLink from '../navbar/NavLink';

import type { Collection, Entry } from '@staticcms/core/interface';
import type { TreeNodeData } from '@staticcms/core/lib/util/nested.util';

function getNodeTitle(node: TreeNodeData) {
  const title = node.isRoot
    ? node.title
    : node.children.find(c => !c.isDir && c.title)?.title || node.title || ('slug' in node && node.slug.split('/').slice(-1)[0]);
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

        if (isNodeIndexFile(collection, node)) {
          return null;
        }

        const index = getTreeNodeIndexFile(collection, node);
        if (node === index) {
          return null;
        }

        let to;
        if (index) {
          to = `/collections/${collectionName}/entries/${index.slug}`;
        } else if (isNodeEditable(collection, node) && 'slug' in node) {
          to = `/collections/${collectionName}/entries/${node.slug}`;
        } else if (depth > 0) {
          to = `/collections/${collectionName}/filter${node.path}`;
        } else {
          to = `/collections/${collectionName}`;
        }

        const title = getNodeTitle(node);

        const hasChildren = depth === 0 || node.children.some(c => c.children.some(c => c.isDir));

        return (
          <Fragment key={node.path}>
            <div className={classNames(depth !== 0 && 'ml-8')}>
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
      const expanded: Record<string, boolean> = {};
      walk(treeData, node => {
        if (node.expanded) {
          expanded[node.path] = true;
        }
      });
      const newTreeData = getTreeData(collection, entries);

      const path = `/${filterTerm}`;
      walk(newTreeData, node => {
        if (
          expanded[node.path] ||
          (useFilter &&
            path.startsWith(node.path) &&
            pathname.startsWith(`/collections/${collection.name}`))
        ) {
          node.expanded = true;
        }
      });

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
