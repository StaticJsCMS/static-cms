import styled from '@emotion/styled';
import sortBy from 'lodash/sortBy';
import { dirname, sep } from 'path';
import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { transientOptions } from '../../lib';
import { stringTemplate } from '../../lib/widgets';
import { selectEntryCollectionTitle } from '../../reducers/collections';
import { selectEntries } from '../../reducers/entries';
import { colors, components, Icon } from '../../ui';

import type { ComponentType } from 'react';
import type { ConnectedProps } from 'react-redux';
import type { Collection, Entry, State } from '../../interface';

const { addFileTemplateFields } = stringTemplate;

const NodeTitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NodeTitle = styled.div`
  margin-right: 4px;
`;

const Caret = styled.div`
  position: relative;
  top: 2px;
`;

const CaretDown = styled(Caret)`
  ${components.caretDown};
  color: currentColor;
`;

const CaretRight = styled(Caret)`
  ${components.caretRight};
  color: currentColor;
  left: 2px;
`;

interface TreeNavLinkProps {
  $activeClassName: string;
  $depth: number;
}

const TreeNavLink = styled(
  NavLink,
  transientOptions,
)<TreeNavLinkProps>(
  ({ $activeClassName, $depth }) => `
    display: flex;
    font-size: 14px;
    font-weight: 500;
    align-items: center;
    padding: 8px;
    padding-left: ${$depth * 20 + 12}px;
    border-left: 2px solid #fff;

    ${Icon} {
      margin-right: 8px;
      flex-shrink: 0;
    }

    &:hover,
    &:active,
    &.${$activeClassName} {
      color: ${colors.active};
      background-color: ${colors.activeBackground};
      border-left-color: #4863c6;
    }
  `,
);

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

        return (
          <React.Fragment key={node.path}>
            <TreeNavLink
              to={to}
              $activeClassName="sidebar-active"
              onClick={() => onToggle({ node, expanded: !node.expanded })}
              $depth={depth}
              data-testid={node.path}
            >
              <Icon type="write" />
              <NodeTitleContainer>
                <NodeTitle>{title}</NodeTitle>
                {hasChildren && (node.expanded ? <CaretDown /> : <CaretRight />)}
              </NodeTitleContainer>
            </TreeNavLink>
            {node.expanded && (
              <TreeNode
                collection={collection}
                depth={depth + 1}
                treeData={node.children}
                onToggle={onToggle}
              />
            )}
          </React.Fragment>
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
  const collectionFolder = collection.folder ?? '';
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
      let entryMap = entries[index];
      entryMap = {
        ...entryMap,
        data: addFileTemplateFields(entryMap.path, entryMap.data as Record<string, string>),
      };
      const title = selectEntryCollectionTitle(collection, entryMap);
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

const NestedCollection = ({ collection, entries, filterTerm }: NestedCollectionProps) => {
  const [treeData, setTreeData] = useState<TreeNodeData[]>(getTreeData(collection, entries));
  const [selected, setSelected] = useState<TreeNodeData | null>(null);
  const [useFilter, setUseFilter] = useState(true);

  const [prevCollection, setPrevCollection] = useState(collection);
  const [prevEntries, setPrevEntries] = useState(entries);
  const [prevFilterTerm, setPrevFilterTerm] = useState(filterTerm);

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
        if (expanded[node.path] || (useFilter && path.startsWith(node.path))) {
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

interface NestedCollectionOwnProps {
  collection: Collection;
  filterTerm: string;
}

function mapStateToProps(state: State, ownProps: NestedCollectionOwnProps) {
  const { collection } = ownProps;
  const entries = selectEntries(state.entries, collection) ?? [];
  return { ...ownProps, entries };
}

const connector = connect(mapStateToProps, {});
export type NestedCollectionProps = ConnectedProps<typeof connector>;

export default connector(NestedCollection);
