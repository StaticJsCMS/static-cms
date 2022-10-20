import { styled } from '@mui/material/styles';
import GridViewSharpIcon from '@mui/icons-material/GridViewSharp';
import ReorderSharpIcon from '@mui/icons-material/ReorderSharp';
import IconButton from '@mui/material/IconButton';
import React from 'react';

import { VIEW_STYLE_GRID, VIEW_STYLE_LIST } from '../../constants/collectionViews';

import type { CollectionViewStyle } from '../../constants/collectionViews';

const ViewControlsSection = styled('div')`
  margin-left: 24px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

interface ViewStyleControlPros {
  viewStyle: CollectionViewStyle;
  onChangeViewStyle: (viewStyle: CollectionViewStyle) => void;
}

const ViewStyleControl = ({ viewStyle, onChangeViewStyle }: ViewStyleControlPros) => {
  return (
    <ViewControlsSection>
      <IconButton
        color={viewStyle === VIEW_STYLE_LIST ? 'primary' : 'default'}
        aria-label="list view"
        onClick={() => onChangeViewStyle(VIEW_STYLE_LIST)}
      >
        <ReorderSharpIcon />
      </IconButton>
      <IconButton
        color={viewStyle === VIEW_STYLE_GRID ? 'primary' : 'default'}
        aria-label="grid view"
        onClick={() => onChangeViewStyle(VIEW_STYLE_GRID)}
      >
        <GridViewSharpIcon />
      </IconButton>
    </ViewControlsSection>
  );
};

export default ViewStyleControl;
