import React from 'react';

import type { DateTimeField, WidgetPreviewProps } from '@staticcms/core/interface';
import type { FC } from 'react';

const DatePreview: FC<WidgetPreviewProps<string | Date, DateTimeField>> = ({ value }) => {
  return <div>{value ? value.toString() : null}</div>;
};

export default DatePreview;
