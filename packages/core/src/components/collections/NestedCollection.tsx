import { Article as ArticleIcon } from '@styled-icons/material/Article';
import { ChevronRight as ChevronRightIcon } from '@styled-icons/material/ChevronRight';
import sortBy from 'lodash/sortBy';
import React, { Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';

import useEntries from '@staticcms/core/lib/hooks/useEntries';
import classNames from '@staticcms/core/lib/util/classNames.util';
import { getTreeData } from '@staticcms/core/lib/util/nested.util';
import { generateClassNames } from '@staticcms/core/lib/util/theming.util';
import NavLink from '../navbar/NavLink';

import type { CollectionWithDefaults, Entry } from '@staticcms/core';
import type { TreeNodeData } from '@staticcms/core/lib/util/nested.util';
import type { FC, MouseEvent } from 'react';

import './NestedCollection.css';

export const classes = generateClassNames('NestedCollection', [
  'root',
  'active',
  'expanded',
  'root-node',
  'root-node-icon',
  'link',
  'node',
  'node-icon',
  'node-content',
  'node-children-icon',
  'node-children',
]);

function getNodeTitle(node: TreeNodeData) {
  const title = node.isRoot
    ? node.title
    : node.children.find(c => !c.isDir && c.title)?.title || node.title;
  return title;
}

interface TreeNodeProps {
  collection: CollectionWithDefaults;
  treeData: TreeNodeData[];
  rootIsActive: boolean;
  path: string;
  depth?: number;
  onToggle: ({ node, expanded }: { node: TreeNodeData; expanded: boolean }) => void;
}

const TreeNode: FC<TreeNodeProps> = ({
  collection,
  treeData,
  rootIsActive,
  path,
  depth = 0,
  onToggle,
}) => {
  const collectionName = collection.name;

  const handleClick = useCallback(
    (event: MouseEvent | undefined, node: TreeNodeData, expanded: boolean) => {
      if (!rootIsActive) {
        return;
      }

      event?.stopPropagation();
      event?.preventDefault();

      if (event) {
        onToggle({ node, expanded });
      } else {
        onToggle({ node, expanded: path === node.path ? expanded : true });
      }
    },
    [onToggle, path, rootIsActive],
  );

  const sortedData = sortBy(treeData, getNodeTitle);

  if (depth !== 0 && !rootIsActive) {
    return null;
  }

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

        return (
          <Fragment key={node.path}>
            <div
              className={classNames(
                depth === 0 ? classes['root-node'] : classes.node,
                depth === 0 && rootIsActive && classes.active,
                node.expanded && classes.expanded,
              )}
            >
              <NavLink
                to={to}
                onClick={() => handleClick(undefined, node, !node.expanded)}
                data-testid={node.path}
                className={classes.link}
                icon={
                  <ArticleIcon
                    className={classNames(
                      depth === 0 ? classes['root-node-icon'] : classes['node-icon'],
                    )}
                  />
                }
              >
                <div className={classes['node-content']}>
                  <div>{title}</div>
                  {hasChildren && (
                    <ChevronRightIcon
                      onClick={event => handleClick(event, node, !node.expanded)}
                      className={classes['node-children-icon']}
                    />
                  )}
                </div>
              </NavLink>
              <div className={classes['node-children']}>
                {node.expanded && (
                  <TreeNode
                    rootIsActive={rootIsActive}
                    collection={collection}
                    path={path}
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
  collection: CollectionWithDefaults;
  filterTerm: string;
}

const NestedCollection: FC<NestedCollectionProps> = ({ collection, filterTerm }) => {
  const entries = useEntries(collection);

  const [treeData, setTreeData] = useState<TreeNodeData[]>(getTreeData(collection, entries));
  const [useFilter, setUseFilter] = useState(true);

  const [prevRootIsActive, setPrevRootIsActive] = useState(false);
  const [prevCollection, setPrevCollection] = useState<CollectionWithDefaults | null>(null);
  const [prevEntries, setPrevEntries] = useState<Entry[] | null>(null);
  const [prevPath, setPrevPath] = useState<string | null>(null);

  const { pathname } = useLocation();

  const rootIsActive = useMemo(
    () => pathname.startsWith(`/collections/${collection.name}`),
    [collection.name, pathname],
  );

  const path = useMemo(() => `/${filterTerm}`, [filterTerm]);

  useEffect(() => {
    if (
      rootIsActive !== prevRootIsActive ||
      collection !== prevCollection ||
      entries !== prevEntries ||
      path !== prevPath
    ) {
      const expanded: Record<string, boolean> = {};
      walk(treeData, node => {
        if (!rootIsActive) {
          expanded[node.path] = false;
          return;
        }

        if (node.expanded) {
          expanded[node.path] = true;
        }
      });
      const newTreeData = getTreeData(collection, entries);

      walk(newTreeData, node => {
        if (!rootIsActive) {
          node.expanded = false;
          return;
        }

        if (node.isRoot) {
          node.expanded = true;
          return;
        }

        if (expanded[node.path] || (useFilter && path.startsWith(node.path))) {
          node.expanded = true;
        }
      });

      setTreeData(newTreeData);
    }

    setPrevRootIsActive(rootIsActive);
    setPrevCollection(collection);
    setPrevEntries(entries);
    setPrevPath(path);
  }, [
    collection,
    entries,
    filterTerm,
    path,
    pathname,
    prevCollection,
    prevEntries,
    prevPath,
    prevRootIsActive,
    rootIsActive,
    treeData,
    useFilter,
  ]);

  const onToggle = useCallback(
    ({ node, expanded }: { node: TreeNodeData; expanded: boolean }) => {
      setTreeData(
        updateNode(treeData, node, node => ({
          ...node,
          expanded,
        })),
      );
      setUseFilter(false);
    },
    [treeData],
  );

  return (
    <TreeNode
      collection={collection}
      treeData={treeData}
      onToggle={onToggle}
      rootIsActive={rootIsActive}
      path={path}
    />
  );
};

export default NestedCollection;
