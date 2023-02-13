import { DocumentTextIcon } from '@heroicons/react/24/outline';
import React, { useMemo } from 'react';

import { getIcon as getRegistryIcon } from '@staticcms/core/lib/registry';

import type { ReactNode } from 'react';

export function getIcon(iconName: string | undefined): ReactNode {
  let icon: ReactNode = <DocumentTextIcon className="h-6 w-6" />;
  if (iconName) {
    const StoredIcon = getRegistryIcon(iconName);
    if (StoredIcon) {
      icon = <StoredIcon />;
    }
  }

  return <div className="h-6 w-6">{icon}</div>;
}

export default function useIcon(iconName: string | undefined) {
  return useMemo(() => getIcon(iconName), [iconName]);
}
