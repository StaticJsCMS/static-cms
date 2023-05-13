import { Article as ArticleIcon } from '@styled-icons/material/Article';
import React, { useMemo } from 'react';

import { getIcon as getRegistryIcon } from '@staticcms/core/lib/registry';

import type { ReactNode } from 'react';

export function getIcon(iconName: string | undefined): ReactNode {
  let icon: ReactNode = <ArticleIcon className="h-6 w-6" />;
  if (iconName) {
    const StoredIcon = getRegistryIcon(iconName);
    if (StoredIcon) {
      icon = <StoredIcon />;
    }
  }

  return <div className="h-6 w-6 flex">{icon}</div>;
}

export default function useIcon(iconName: string | undefined) {
  return useMemo(() => getIcon(iconName), [iconName]);
}
