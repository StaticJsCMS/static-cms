import React from 'react';

import { sidebarClasses } from './Sidebar.util';
import SidebarContent from './SidebarContent';

import type { FC } from 'react';

import './Sidebar.css';

const Sidebar: FC = () => {
  return (
    <aside className={sidebarClasses.root} aria-label="Sidebar">
      <SidebarContent />
    </aside>
  );
};

export default Sidebar;
