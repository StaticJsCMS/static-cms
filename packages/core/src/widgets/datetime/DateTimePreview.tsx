import React from 'react';

import { generateClassNames } from '@staticcms/core/lib/util/theming.util';

import type { DateTimeField, WidgetPreviewProps } from '@staticcms/core/interface';
import type { FC } from 'react';

const classes = generateClassNames('WidgetDatePreview', ['root']);

const DatePreview: FC<WidgetPreviewProps<string | Date, DateTimeField>> = ({ value }) => {
  return <div className={classes.root}>{value ? value.toString() : null}</div>;
};

export default DatePreview;
