import React from 'react';

import sidebarClasses from './Sidebar.classes';
import SidebarContent from './SidebarContent';

import type { FC } from 'react';

import './Sidebar.css';

const Sidebar: FC = () => {
  return (
    <aside className={sidebarClasses.root} aria-label="sidebar">
      <SidebarContent />
    </aside>
  );
};

export default Sidebar;
