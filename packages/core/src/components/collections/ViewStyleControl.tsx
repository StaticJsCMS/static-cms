import React from 'react';
import { Grid as GridIcon } from '@styled-icons/bootstrap/Grid';
import { TableRows as TableRowsIcon } from '@styled-icons/material-rounded/TableRows';

import { VIEW_STYLE_GRID, VIEW_STYLE_LIST } from '@staticcms/core/constants/collectionViews';
import IconButton from '../common/button/IconButton';

import type { CollectionViewStyle } from '@staticcms/core/constants/collectionViews';

interface ViewStyleControlPros {
  viewStyle: CollectionViewStyle;
  onChangeViewStyle: (viewStyle: CollectionViewStyle) => void;
}

const ViewStyleControl = ({ viewStyle, onChangeViewStyle }: ViewStyleControlPros) => {
  return (
    <div className="flex items-center gap-1.5 mr-1">
      <IconButton
        variant={viewStyle === VIEW_STYLE_LIST ? 'contained' : 'text'}
        aria-label="list view"
        onClick={() => onChangeViewStyle(VIEW_STYLE_LIST)}
      >
        <TableRowsIcon className="h-5 w-5" />
      </IconButton>
      <IconButton
        variant={viewStyle === VIEW_STYLE_GRID ? 'contained' : 'text'}
        aria-label="grid view"
        onClick={() => onChangeViewStyle(VIEW_STYLE_GRID)}
      >
        <GridIcon className="h-5 w-5" />
      </IconButton>
    </div>
  );
};

export default ViewStyleControl;
