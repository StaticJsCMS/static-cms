import React from 'react';
import isString from 'lodash/isString';

import WidgetPreviewContainer from '../../components/UI/WidgetPreviewContainer';

import type { CodeField, WidgetPreviewProps } from '../../interface';

function toValue(value: string | Record<string, string> | undefined | null, field: CodeField) {
  if (isString(value)) {
    return value;
  }

  if (value) {
    return value[field.keys?.code ?? 'code'] ?? '';
  }

  return '';
}

const CodePreview = ({
  value,
  field,
}: WidgetPreviewProps<string | Record<string, string>, CodeField>) => {
  return (
    <WidgetPreviewContainer>
      <pre>
        <code>{toValue(value, field)}</code>
      </pre>
    </WidgetPreviewContainer>
  );
};

export default CodePreview;
