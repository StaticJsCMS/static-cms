import { FilterList as FilterListIcon } from '@styled-icons/material/FilterList';
import React from 'react';

import type { FC } from 'react';

const MobileCollectionControls: FC = () => {
  return (
    <div className="flex lg:hidden">
      <FilterListIcon className="w-5 h-5" />
    </div>
  );
};

export default MobileCollectionControls;
