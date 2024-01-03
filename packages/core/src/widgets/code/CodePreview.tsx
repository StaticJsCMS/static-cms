import isString from 'lodash/isString';
import React from 'react';

import { generateClassNames } from '@staticcms/core/lib/util/theming.util';

import type { CodeField, WidgetPreviewProps } from '@staticcms/core';
import type { FC } from 'react';

const classes = generateClassNames('WidgetCodePreview', ['root']);

function toValue(value: string | Record<string, string> | undefined | null, field: CodeField) {
  if (isString(value)) {
    return value;
  }

  if (value) {
    return value[field.keys?.code ?? 'code'] ?? '';
  }

  return '';
}

const CodePreview: FC<WidgetPreviewProps<string | Record<string, string>, CodeField>> = ({
  value,
  field,
}) => {
  return (
    <pre className={classes.root}>
      <code>{toValue(value, field)}</code>
    </pre>
  );
};

export default CodePreview;
