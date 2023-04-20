import React from 'react';

import type { StringOrTextField, WidgetPreviewProps } from '@staticcms/core/interface';
import type { FC } from 'react';

const StringPreview: FC<WidgetPreviewProps<string, StringOrTextField>> = ({ value = '' }) => {
  return <div>{value}</div>;
};

export default StringPreview;
