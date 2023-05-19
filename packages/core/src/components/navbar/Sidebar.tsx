import React from 'react';

import classNames from '@staticcms/core/lib/util/classNames.util';
import SidebarContent from './SidebarContent';

import type { FC } from 'react';

const Sidebar: FC = () => {
  return (
    <aside
      className={classNames('w-sidebar-expanded', 'h-main-mobile md:h-main hidden md:block')}
      aria-label="Sidebar"
    >
      <SidebarContent />
    </aside>
  );
};

export default Sidebar;
