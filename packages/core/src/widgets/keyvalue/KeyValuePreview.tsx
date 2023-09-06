import React from 'react';

import type { KeyValueField, WidgetPreviewProps } from '@staticcms/core/interface';
import type { FC } from 'react';
import type { Pair } from './types';

const StringPreview: FC<WidgetPreviewProps<Pair[], KeyValueField>> = ({ value }) => {
  return (
    <ul>
      {(value ?? []).map((pair, index) => (
        <li key={`preview-keyvalue-${index}`}>
          <b>{pair.key ?? ''}</b> - {pair.value ?? ''}
        </li>
      ))}
    </ul>
  );
};

export default StringPreview;
