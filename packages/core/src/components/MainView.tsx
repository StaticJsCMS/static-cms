import React from 'react';
import TopBarProgress from 'react-topbar-progress-indicator';

import classNames from '../lib/util/classNames.util';
import BottomNavigation from './navbar/BottomNavigation';
import Navbar from './navbar/Navbar';
import Sidebar from './navbar/Sidebar';

import type { ReactNode } from 'react';
import type { Breadcrumb, Collection } from '../interface';

TopBarProgress.config({
  barColors: {
    0: '#000',
    '1.0': '#000',
  },
  shadowBlur: 0,
  barThickness: 2,
});

interface MainViewProps {
  breadcrumbs?: Breadcrumb[];
  showQuickCreate?: boolean;
  navbarActions?: ReactNode;
  showLeftNav?: boolean;
  noMargin?: boolean;
  noScroll?: boolean;
  children: ReactNode;
  collection?: Collection;
}

const MainView = ({
  children,
  breadcrumbs,
  showQuickCreate = false,
  showLeftNav = false,
  noMargin = false,
  noScroll = false,
  navbarActions,
  collection,
}: MainViewProps) => {
  return (
    <>
      <Navbar
        breadcrumbs={breadcrumbs}
        showQuickCreate={showQuickCreate}
        navbarActions={navbarActions}
      />
      <div className="flex bg-slate-50 dark:bg-slate-900">
        {showLeftNav ? <Sidebar /> : null}
        <div
          id="main-view"
          className={classNames(
            showLeftNav ? ' w-full left-0 md:w-main' : 'w-full',
            !noMargin && 'px-5 py-4',
            noScroll ? 'overflow-hidden' : 'overflow-y-auto',
            `
              h-main-mobile
              md:h-main
              relative
              styled-scrollbars
            `,
          )}
        >
          {children}
        </div>
      </div>
      <BottomNavigation collection={collection} />
    </>
  );
};

export default MainView;
