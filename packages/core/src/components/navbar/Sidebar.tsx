import React from 'react';

import classNames from '@staticcms/core/lib/util/classNames.util';
import SidebarContent from './SidebarContent';

import type { FC } from 'react';
import type { TranslateProps } from 'react-polyglot';

const Sidebar: FC<TranslateProps> = () => {
  return (
    <aside
      className={classNames('w-sidebar-expanded', 'h-main hidden md:block')}
      aria-label="Sidebar"
    >
      <SidebarContent />
    </aside>
  );
};

export default Sidebar;
