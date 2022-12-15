import isString from 'lodash/isString';
import React from 'react';

import WidgetPreviewContainer from '@staticcms/core/components/UI/WidgetPreviewContainer';

import type { CodeField, WidgetPreviewProps } from '@staticcms/core/interface';
import type { FC } from 'react';

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
    <WidgetPreviewContainer>
      <pre>
        <code>{toValue(value, field)}</code>
      </pre>
    </WidgetPreviewContainer>
  );
};

export default CodePreview;
