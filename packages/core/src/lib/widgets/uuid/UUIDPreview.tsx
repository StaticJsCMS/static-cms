import React from 'react';

import type { UUIDField, WidgetPreviewProps } from '@staticcms/core/interface';
import type { FC } from 'react';

const StringPreview: FC<WidgetPreviewProps<string, UUIDField>> = ({ value = '' }) => {
  return <div>{value}</div>;
};

export default StringPreview;
