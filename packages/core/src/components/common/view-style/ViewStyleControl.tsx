import React from 'react';
import { Grid as GridIcon } from '@styled-icons/bootstrap/Grid';
import { TableRows as TableRowsIcon } from '@styled-icons/material-rounded/TableRows';

import { VIEW_STYLE_GRID, VIEW_STYLE_LIST } from '@staticcms/core/constants/views';
import IconButton from '../button/IconButton';

import type { ViewStyle } from '@staticcms/core/constants/views';

interface ViewStyleControlPros {
  viewStyle: ViewStyle;
  onChangeViewStyle: (viewStyle: ViewStyle) => void;
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
