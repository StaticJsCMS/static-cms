import React from 'react';
import isString from 'lodash/isString';

import { WidgetPreviewContainer } from '../../ui';

import type { CmsFieldCode, CmsWidgetPreviewProps } from '../../interface';

function toValue(value: string | Record<string, string> | undefined | null, field: CmsFieldCode) {
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
}: CmsWidgetPreviewProps<string | Record<string, string>, CmsFieldCode>) => {
  return (
    <WidgetPreviewContainer>
      <pre>
        <code>{toValue(value, field)}</code>
      </pre>
    </WidgetPreviewContainer>
  );
};

export default CodePreview;
