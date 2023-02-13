import React from 'react';

import type { NumberField, WidgetPreviewProps } from '@staticcms/core/interface';
import type { FC } from 'react';

const NumberPreview: FC<WidgetPreviewProps<string | number, NumberField>> = ({ value }) => {
  return <div>{value}</div>;
};

export default NumberPreview;
