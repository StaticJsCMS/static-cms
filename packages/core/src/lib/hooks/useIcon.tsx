import { Article as ArticleIcon } from '@styled-icons/material/Article';
import React, { useMemo } from 'react';

import { getIcon as getRegistryIcon } from '@staticcms/core/lib/registry';
import classNames from '../util/classNames.util';
import { generateClassNames } from '../util/theming.util';

import type { ReactNode } from 'react';

import './useIcon.css';

const classes = generateClassNames('Icon', ['root', 'icon']);

export function getIcon(iconName: string | undefined): ReactNode {
  let icon: ReactNode = <ArticleIcon className={classes.icon} />;
  if (iconName) {
    const StoredIcon = getRegistryIcon(iconName);
    if (StoredIcon) {
      icon = <StoredIcon />;
    }
  }

  return <div className={classNames(classes.root, 'cms-icon')}>{icon}</div>;
}

export default function useIcon(iconName: string | undefined) {
  return useMemo(() => getIcon(iconName), [iconName]);
}
