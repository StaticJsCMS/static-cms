import ArticleIcon from '@mui/icons-material/Article';
import sortBy from 'lodash/sortBy';
import { dirname, sep } from 'path';
import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { selectEntryCollectionTitle } from '@staticcms/core/lib/util/collection.util';
import { stringTemplate } from '@staticcms/core/lib/widgets';
import { selectEntries } from '@staticcms/core/reducers/selectors/entries';
import NavLink from '../navbar/NavLink';

import type { Collection, Entry } from '@staticcms/core/interface';
import type { RootState } from '@staticcms/core/store';
import type { ConnectedProps } from 'react-redux';

const { addFileTemplateFields } = stringTemplate;

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
          <Fragment key={node.path}>
            <NavLink
              to={to}
              onClick={() => onToggle({ node, expanded: !node.expanded })}
              data-testid={node.path}
            >
              {/* TODO $activeClassName="sidebar-active" */}
              {/* TODO $depth={depth} */}
              <ArticleIcon />
              <div>
                <div>{title}</div>
                {hasChildren && (node.expanded ? <div /> : <div />)}
              </div>
            </NavLink>
            {node.expanded && (
              <TreeNode
                collection={collection}
                depth={depth + 1}
                treeData={node.children}
                onToggle={onToggle}
              />
            )}
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

function mapStateToProps(state: RootState, ownProps: NestedCollectionOwnProps) {
  const { collection } = ownProps;
  const entries = selectEntries(state, collection) ?? [];
  return { ...ownProps, entries };
}

const connector = connect(mapStateToProps, {});
export type NestedCollectionProps = ConnectedProps<typeof connector>;

export default connector(NestedCollection);
