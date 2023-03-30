import React from 'react';

import FontTypeSelect from './FontTypeSelect';

import type { FC } from 'react';

export interface BasicElementToolbarButtonsProps {
  hideFontTypeSelect?: boolean;
  disableFontTypeSelect?: boolean;
  hideCodeBlock?: boolean;
  disabled: boolean;
}

const BasicElementToolbarButtons: FC<BasicElementToolbarButtonsProps> = ({
  hideFontTypeSelect = false,
  disableFontTypeSelect = false,
  disabled,
}) => {
  return !hideFontTypeSelect ? (
    <FontTypeSelect disabled={disableFontTypeSelect || disabled} />
  ) : null;
};

export default BasicElementToolbarButtons;
