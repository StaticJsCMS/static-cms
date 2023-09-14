import React from 'react';

import { generateClassNames } from '@staticcms/core/lib/util/theming.util';

import type { ReactNode } from 'react';

import './MenuGroup.css';

export const classes = generateClassNames('MenuGroup', ['root']);

export interface MenuGroupProps {
  children: ReactNode | ReactNode[];
}

const MenuGroup = ({ children }: MenuGroupProps) => {
  return <div className={classes.root}>{children}</div>;
};

export default MenuGroup;
