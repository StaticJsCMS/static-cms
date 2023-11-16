import React from 'react';

import { generateClassNames } from '@staticcms/core/lib/util/theming.util';

import type { KeyValueField, WidgetPreviewProps } from '@staticcms/core';
import type { FC } from 'react';
import type { Pair } from './types';

const classes = generateClassNames('WidgetKeyValuePreview', ['root']);

const StringPreview: FC<WidgetPreviewProps<Pair[], KeyValueField>> = ({ value }) => {
  return (
    <ul className={classes.root}>
      {(value ?? []).map((pair, index) => (
        <li key={`preview-keyvalue-${index}`}>
          <b>{pair.key ?? ''}</b> - {pair.value ?? ''}
        </li>
      ))}
    </ul>
  );
};

export default StringPreview;
