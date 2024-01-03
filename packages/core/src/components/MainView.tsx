import React from 'react';
import TopBarProgress from 'react-topbar-progress-indicator';

import classNames from '../lib/util/classNames.util';
import { generateClassNames } from '../lib/util/theming.util';
import BottomNavigation from './navbar/BottomNavigation';
import Navbar from './navbar/Navbar';
import Sidebar from './navbar/Sidebar';

import type { FC, ReactNode } from 'react';
import type { Breadcrumb, CollectionWithDefaults } from '../interface';

import './MainView.css';

export const classes = generateClassNames('MainView', [
  'root',
  'body',
  'show-left-nav',
  'no-margin',
  'no-scroll',
]);

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
  collection?: CollectionWithDefaults;
}

const MainView: FC<MainViewProps> = ({
  children,
  breadcrumbs,
  showQuickCreate = false,
  showLeftNav = false,
  noMargin = false,
  noScroll = false,
  navbarActions,
  collection,
}) => {
  return (
    <>
      <Navbar
        breadcrumbs={breadcrumbs}
        showQuickCreate={showQuickCreate}
        navbarActions={navbarActions}
      />
      <div className={classes.root}>
        {showLeftNav ? <Sidebar /> : null}
        <div
          id="main-view"
          className={classNames(
            classes.body,
            showLeftNav && classes['show-left-nav'],
            noMargin && classes['no-margin'],
            noScroll && classes['no-scroll'],
            'CMS_Scrollbar_root',
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
