import { Grid as GridIcon } from '@styled-icons/bootstrap/Grid';
import { TableRows as TableRowsIcon } from '@styled-icons/material-rounded/TableRows';
import React from 'react';

import { VIEW_STYLE_GRID, VIEW_STYLE_TABLE } from '@staticcms/core/constants/views';
import { generateClassNames } from '@staticcms/core/lib/util/theming.util';
import IconButton from '../button/IconButton';

import type { ViewStyle } from '@staticcms/core/constants/views';

import './ViewStyleControl.css';

export const classes = generateClassNames('ViewStyleControl', ['root', 'button', 'icon']);

interface ViewStyleControlPros {
  viewStyle: ViewStyle;
  onChangeViewStyle: (viewStyle: ViewStyle) => void;
}

const ViewStyleControl = ({ viewStyle, onChangeViewStyle }: ViewStyleControlPros) => {
  return (
    <div className={classes.root}>
      <IconButton
        color={viewStyle === VIEW_STYLE_TABLE ? 'primary' : 'secondary'}
        variant="text"
        className={classes.button}
        aria-label="table view option"
        onClick={() => onChangeViewStyle(VIEW_STYLE_TABLE)}
      >
        <TableRowsIcon className={classes.icon} />
      </IconButton>
      <IconButton
        color={viewStyle === VIEW_STYLE_GRID ? 'primary' : 'secondary'}
        variant="text"
        className={classes.button}
        aria-label="grid view option"
        onClick={() => onChangeViewStyle(VIEW_STYLE_GRID)}
      >
        <GridIcon className={classes.icon} />
      </IconButton>
    </div>
  );
};

export default ViewStyleControl;
