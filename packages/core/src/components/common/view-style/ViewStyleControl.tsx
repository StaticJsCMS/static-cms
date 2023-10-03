import { Grid as GridIcon } from '@styled-icons/bootstrap/Grid';
import { TableRows as TableRowsIcon } from '@styled-icons/material-rounded/TableRows';
import React from 'react';

import { VIEW_STYLE_GRID, VIEW_STYLE_TABLE } from '@staticcms/core/constants/views';
import { generateClassNames } from '@staticcms/core/lib/util/theming.util';
import IconButton from '../button/IconButton';

import type { ViewStyle } from '@staticcms/core/constants/views';
import type { FC } from 'react';

import './ViewStyleControl.css';

export const classes = generateClassNames('ViewStyleControl', ['root', 'button', 'icon']);

interface ViewStyleControlPros {
  viewStyle: ViewStyle;
  onChangeViewStyle: (viewStyle: ViewStyle) => void;
}

const ViewStyleControl: FC<ViewStyleControlPros> = ({ viewStyle, onChangeViewStyle }) => {
  return (
    <div className={classes.root}>
      <IconButton
        icon={TableRowsIcon}
        color={viewStyle === VIEW_STYLE_TABLE ? 'primary' : 'secondary'}
        variant="text"
        rootClassName={classes.button}
        aria-label="table view option"
        onClick={() => onChangeViewStyle(VIEW_STYLE_TABLE)}
      />
      <IconButton
        icon={GridIcon}
        color={viewStyle === VIEW_STYLE_GRID ? 'primary' : 'secondary'}
        variant="text"
        rootClassName={classes.button}
        aria-label="grid view option"
        onClick={() => onChangeViewStyle(VIEW_STYLE_GRID)}
      />
    </div>
  );
};

export default ViewStyleControl;
