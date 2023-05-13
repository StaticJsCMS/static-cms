import React from 'react';

import type { MapField, WidgetPreviewProps } from '@staticcms/core/interface';
import type { FC } from 'react';

const MapPreview: FC<WidgetPreviewProps<string, MapField>> = ({ value }) => {
  return <div>{value}</div>;
};

export default MapPreview;
