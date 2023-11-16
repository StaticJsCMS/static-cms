import React from 'react';

import { generateClassNames } from '@staticcms/core/lib/util/theming.util';

import type { NumberField, WidgetPreviewProps } from '@staticcms/core';
import type { FC } from 'react';

const classes = generateClassNames('WidgetNumberPreview', ['root']);

const NumberPreview: FC<WidgetPreviewProps<string | number, NumberField>> = ({ value }) => {
  return <div className={classes.root}>{value}</div>;
};

export default NumberPreview;
