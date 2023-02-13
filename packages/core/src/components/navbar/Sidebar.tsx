import React, { useMemo } from 'react';

import { getIcon } from '@staticcms/core/lib/hooks/useIcon';
import { getAdditionalLinks } from '@staticcms/core/lib/registry';
import { selectCollections } from '@staticcms/core/reducers/selectors/collections';
import { useAppSelector } from '@staticcms/core/store/hooks';
import classNames from '../../lib/util/classNames.util';
import NavLink from './NavLink';

const Sidebar = () => {
  const collections = useAppSelector(selectCollections);
  const collectionLinks = useMemo(
    () =>
      Object.values(collections)
        .filter(collection => collection.hide !== true)
        .map(collection => {
          const collectionName = collection.name;
          const icon = getIcon(collection.icon);

          // TODO
          // if ('nested' in collection) {
          //   return (
          //     <li key={`nested-${collectionName}`}>
          //       <NestedCollection
          //         collection={collection}
          //         filterTerm={filterTerm}
          //         data-testid={collectionName}
          //       />
          //     </li>
          //   );
          // }

          return (
            <NavLink key={collectionName} to={`/collections/${collectionName}`} icon={icon}>
              {collection.label}
            </NavLink>
          );
        }),
    [collections],
  );

  const additionalLinks = useMemo(() => getAdditionalLinks(), []);
  const links = useMemo(
    () =>
      Object.values(additionalLinks).map(
        ({ id, title, data, options: { icon: iconName } = {} }) => {
          const icon = getIcon(iconName);

          return typeof data === 'string' ? (
            <NavLink key={title} href={data} icon={icon}>
              {title}
            </NavLink>
          ) : (
            <NavLink key={title} to={`/page/${id}`} icon={icon}>
              {title}
            </NavLink>
          );
        },
      ),
    [additionalLinks],
  );

  return (
    // <div className="w-"
    <aside
      className={classNames(
        'w-sidebar-expanded',
        'h-full sm:fixed sm:z-10 sm:shadow-sidebar lg:block lg:z-auto lg:shadow-none',
      )}
      aria-label="Sidebar"
    >
      <div className="px-3 py-4 h-full w-full overflow-y-auto bg-white dark:bg-slate-800">
        <ul className="space-y-2">
          {collectionLinks}
          {links}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
