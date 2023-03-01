import React from 'react';

import FontTypeSelect from './FontTypeSelect';

import type { FC } from 'react';

export interface BasicElementToolbarButtonsProps {
  hideFontTypeSelect?: boolean;
  disableFontTypeSelect?: boolean;
  hideCodeBlock?: boolean;
}

const BasicElementToolbarButtons: FC<BasicElementToolbarButtonsProps> = ({
  hideFontTypeSelect = false,
  disableFontTypeSelect = false,
}) => {
  return !hideFontTypeSelect ? <FontTypeSelect disabled={disableFontTypeSelect} /> : null;
};

export default BasicElementToolbarButtons;
